const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');

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

// get new Message from client
  socket.on('createMessage', (message) => {
    console.log('Get new message from client');
    console.log(message);

    io.emit('newMessage',{
      from: message.from,
      text: message.text,
      createAt: new Date().Time()
    });

  });

  //send message to client
  // socket.emit('newMessage',{
  //   user: 'Somitme',
  //   content: 'Tay is so cool'
  // });

  socket.on('disconnect', () => {
    currentUser--;
    console.log('User disconnect');
    console.log('Current user: ',currentUser);
  });

});



server.listen(port, () => {
  console.log(`Start on port ${port}`);
});
