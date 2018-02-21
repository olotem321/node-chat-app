const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const {generateMessage, generateLocationMessage} = require('./utils/generateMessage.js');

const port = process.env.PORT || 3000;

var app = express();

var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

var currentUser = 0;

io.on('connection', (socket) => {
  currentUser++;
  console.log('new user connected!');
  console.log('Current user: ',currentUser);

  socket.emit('newMessage',generateMessage('Admin', 'Welcome boy to the chat app'));

  socket.broadcast.emit('newMessage',generateMessage('Admin', 'New friend is joined with us.'));

// get new Message from client
  socket.on('createMessage', (message, callback) => {
    console.log('Get new message from client');
    console.log(message);


    io.emit('newMessage',message);

    callback(false);

  });

// Get lcoation from client

  socket.on('createLocationMessage', (message) => {
    io.emit('newLocationMessage', generateLocationMessage('User', message.latitude,message.longitude));
  });


  socket.on('disconnect', () => {
    currentUser--;
    console.log('User disconnect');
    console.log('Current user: ',currentUser);
  });

});



server.listen(port, () => {
  console.log(`Start on port ${port}`);
});
