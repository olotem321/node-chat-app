var socket = io();

socket.on('updateUserNumber', function(number){
    var selectOpt = $('<select name="room"></select>');
    console.log('Test number');
    // console.log(number);
  number.forEach(function(num){
    selectOpt.append($(`<option value="${num.code}">${num.name} (${num.number})</option>`));
  });
  // console.log(selectOpt.html());
  $('#selectOption').html(selectOpt);

});
