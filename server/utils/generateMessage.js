var generateMessage = function(from, text){
  var result = {from, text, createAt: new Date().getTime()}
  return result;
}

var generateLocationMessage = function(from, latitude, longitude){
  var result = {
    from,
    url: `https://www.google.com/maps?q=${latitude},${longitude}`,
    createAt: new Date().getTime()
  }
  return result
}

module.exports = {
  generateMessage,
  generateLocationMessage
}
