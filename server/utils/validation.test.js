const expect = require('expect');

//import isRealString
const {isRealString} = require('./validation');

//isReal String
describe('isRealString', () => {

  it('should reject non-string value', () => {
    expect(isRealString(2342)).toBe(false);
  });

  it('should reject string that only space' ,() => {
    expect(isRealString('     ')).toBe(false);
  });

  it('should reject string that only space' ,() => {

      expect(isRealString('    dsf ')).toBe(true);

  });

});
  // should reject non-string values

  //should reject string that only space

  //should allow string with non-space characters
