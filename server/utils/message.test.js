const expect = require('expect');

const {generateMessage,generateLocationMessage} = require('./generateMessage');

describe('Generate Message', () => {
  it('should generate correct message object', () => {

    var from = 'Jack';
    var text = 'Say hai';

    var messageObj = generateMessage(from, text);

    expect(messageObj.createAt).toBeA('number');
    expect(messageObj).toInclude({from, text});

  })
});

describe('GengerLocationMessage', () =>{
  it('should gengerate correct location object', () => {
    var from = 'Tim';
    var lat = 1;
    var long = 1;

    var locationMessage = generateLocationMessage(from, lat, long);

    expect(locationMessage.createAt).toBeA('number');
    expect(locationMessage).toInclude({
      from,
      url: `https://www.google.com/maps?q=${lat},${long}`
    });
  });
});
