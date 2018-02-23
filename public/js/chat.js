var socket = io();

function scrollToBottom() {
  var messages = $('#messages');
  var newMessage = messages.children('li:last-child');

  var clientHeight = messages.prop('clientHeight');
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();

  if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
    messages.scrollTop(scrollHeight);
  }
}

//When connect to the server
socket.on('connect', function() {
  console.log('Connected to server');
  var params = $.deparam(window.location.search);
  socket.emit('join',params, function(err){
    if(err){
      // there is error
      alert(err);
      window.location.href = '/';
    }else {
      // there is no error
      console.log('No error');
    }
  });
});

socket.on('setRoomName', function(name) {
  var template = $('#chatRoomName').html();
  var html = Mustache.render(template, {
    name
  });

  $('.chatRoom').append(html);
});

// disconnect event : fire when connection drop

socket.on('disconnect', function() {
  console.log('Disconnect to server');
});

// update user list
socket.on('updateUserList', function(users) {
  var ol = $('<ol></ol>');

  users.forEach(function(user){
    ol.append($('<li></li>').text(user))
  });

  jQuery('#users').html(ol);
});



// Get new message from server
socket.on('newMessage', function(message) {
    var formatedTime = moment(message.createAt).format('hh:mm a');

    var template = $('#message-template').html();
    var html = Mustache.render(template, {
      text: message.text,
      from: message.from,
      formatedTime: formatedTime
    });

    $('#messages').append(html);
    scrollToBottom();
});

socket.on('newLocationMessage', function(message){

  var template = $('#location-message-template').html();
  var formatedTime = moment(message.createAt).format('hh:mm a');
  var html = Mustache.render(template, {
    from: message.from,
    formatedTime: formatedTime,
    url: message.url
  })
  $('#messages').append(html);
});




$('#message-form').on('submit', function (e){
  e.preventDefault();

  var messageTextbox = $('[name=message]');

  socket.emit('createMessage', messageTextbox.val() , function(){
      messageTextbox.val('');
  });
});

var locationBtn = $('#send-location');

locationBtn.on('click', function(){
  if(!navigator.geolocation){
    return alert('Browser does not support location');
  }

  locationBtn.attr('disabled', 'disabled').text('Sending location....');

  navigator.geolocation.getCurrentPosition(function(position){
    locationBtn.removeAttr('disabled').text('Send location');
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function() {
    alert('Unable to fetch location');
    locationBtn.removeAttr('disabled').text('Send location');
  });


});
