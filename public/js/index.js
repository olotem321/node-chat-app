var socket = io();

//When connect to the server
socket.on('connect', function() {
  console.log('Connected to server');
});

// disconnect event : fire when connection drop

socket.on('disconnect', function() {
  console.log('Disconnect to server');
});

// newEmail event: receive new email from server

socket.on('newEmail', function(email) {
    console.log(email);
});

// createEmail event and send to server
socket.emit('createEmail', {
  from: 'ds@example.com',
  text: 'Hey, this is my email',
  createAt: 123
});

// Get new message from server
socket.on('newMessage', function(message) {
    console.log('Get new message from server');
    console.log(message);
});

// create new message and send to server
socket.emit('createMessage',{
  user: 'Tay',
  content: 'this is a message from Tay'
});
