var generateMessage = function(from, text){
  var result = {from, text, createAt: new Date().getTime()}
  return result;
}

module.exports = {
  generateMessage
}
