var socket = io();

//When connect to the server
socket.on('connect', function() {
  console.log('Connected to server');

});

// disconnect event : fire when connection drop

socket.on('disconnect', function() {
  console.log('Disconnect to server');
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

  socket.emit('createMessage', {
    from: 'User',
    text: messageTextbox.val()
  }, function(){
      messageTextbox.val('')
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
