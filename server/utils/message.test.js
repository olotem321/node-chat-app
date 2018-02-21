const expect = require('expect');

const {generateMessage} = require('./generateMessage');

describe('Generate Message', () => {
  it('should generate correct message object', () => {

    var from = 'Jack';
    var text = 'Say hai';

    var messageObj = generateMessage(from, text);

    expect(messageObj.createAt).toBeA('number');
    expect(messageObj).toInclude({from, text});

  })
});
