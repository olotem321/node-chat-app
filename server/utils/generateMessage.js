const moment = require('moment');

var generateMessage = function(from, text){
  var result = {from, text, createAt:  moment().valueOf()}
  return result;
}

var generateLocationMessage = function(from, latitude, longitude){
  var result = {
    from,
    url: `https://www.google.com/maps?q=${latitude},${longitude}`,
    createAt:  moment().valueOf()
  }
  return result
}

module.exports = {
  generateMessage,
  generateLocationMessage
}
