const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const {generateMessage, generateLocationMessage} = require('./utils/generateMessage.js');
const {isRealString,getNameOfchatRoom} = require('./utils/validation');
const {Users} = require('./utils/users');

const port = process.env.PORT || 3000;

var app = express();

var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));

var currentUser = 0;

io.on('connection', (socket) => {
  currentUser++;
  console.log('new user connected!');
  console.log('Current user: ',currentUser);

  var friendNo = users.getUserList('volvo').length;
  var fanNo = users.getUserList('saab').length;
  var moneyNo = users.getUserList('opel').length;
  var etcNo = users.getUserList('audi').length;

  var fullChatRoom = [
    {
      name: 'หาเพื่อน',
      code:'volvo',
      number: friendNo
    },
    {
      name: 'หาแฟน',
      code:'saab',
      number: fanNo
    },
    {
      name: 'หาเงิน',
      code:'opel',
      number: moneyNo
    },
    {
      name: 'เรื่อยๆ',
      code:'audi',
      number: etcNo
    }
  ];

  socket.emit('updateUserNumber', fullChatRoom);

  var chatRoom = ['volvo','saab','opel','audi'];



// when user join the chat Room
  socket.on('join', (params, callback) => {
    if(!isRealString(params.name) || !isRealString(params.room)){
      return callback('ต้องใส่ชื่อและเลือกห้องนะครับ');
    }

    if(users.alreadyExist(params.name, params.room)){
      return callback('ชื่อนี้มีคนใช้แล้ว');
    }

    if(chatRoom.indexOf(params.room) > -1){
    }else{
      return callback('ห้องแชทไม่ถูกต้อง');
    }

    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);

    io.to(params.room).emit('updateUserList', users.getUserList(params.room));
    socket.emit('newMessage',generateMessage('Admin', `ยินดีต้องรับสู่ห้องแชท ${getNameOfchatRoom(fullChatRoom, params.room)} `));
    socket.emit('setRoomName', getNameOfchatRoom(fullChatRoom, params.room));
    socket.broadcast.to(params.room).emit('newMessage',generateMessage('Admin', `${params.name} is joined with us.`));
    // io.emit - send to everyone in the Room
    //io.to('room1').emit
    // socket.broadcast.emit  - send to everyone in the room except ourself
    //socket.broadcast.to('room1').emit
    // socket.emit - send only to ourself

    callback();
  });

// get new Message from client
  socket.on('createMessage', (message, callback) => {
    console.log('Get new message from client');
    console.log(message);

    var user = users.getUser(socket.id);


    io.to(user.room).emit('newMessage',generateMessage(user.name, message));

    callback(false);

  });

// Get lcoation from client

  socket.on('createLocationMessage', (message) => {
    var user = users.getUser(socket.id);
    io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, message.latitude,message.longitude));
  });


  socket.on('disconnect', () => {
    currentUser--;
    console.log('User disconnect');
    console.log('Current user: ',currentUser);
    var user = users.removeUser(socket.id);

    if(user){
      console.log('delete user!', user);
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} is left the chat room`));
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
    }

  });

});



server.listen(port, () => {
  console.log(`Start on port ${port}`);
});
