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
    console.log('Get new message from server');
    console.log(message);

    var li = $('<li></li>');
    var formatedTime = moment(message.createAt).format('hh:mm a');

    li.text(`${message.from} ${formatedTime}: ${message.text}`);

    $('#messages').append(li);
});

socket.on('newLocationMessage', function(message){
  var formatedTime = moment(message.createAt).format('hh:mm a');
  var li = $('<li></li>');
  var a = $('<a target="_blank">My current location</a>')
  li.text(`${message.from} ${formatedTime}: `);
  a.attr('href', message.url);
  li.append(a);
  $('#messages').append(li);
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
