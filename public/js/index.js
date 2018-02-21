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
    li.text(`${message.from}: ${message.text}`);

    $('#messages').append(li);
});

// create new message and send to server
// socket.emit('createMessage',{
//   user: 'Tay',
//   content: 'this is a message from Tay'
// },function(status) {
//   if(status){
//     console.log('Success:');
//   } else {
//     console.log('Failed:');
//   }
// });


$('#message-form').on('submit', function (e){
  e.preventDefault();

  socket.emit('createMessage', {
    from: 'User',
    text: $('[name=message]').val()
  }, function(){

  });
});
