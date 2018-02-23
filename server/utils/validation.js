var isRealString = (str) => {
  return typeof str === 'string' && str.trim().length > 0;
};


var getNameOfchatRoom = (arrayRoom, room) => {
  var res = arrayRoom.filter((eachRoom) => {
    return eachRoom.code === room;
  })[0];

  return res.name;
}

module.exports = {isRealString,getNameOfchatRoom}
