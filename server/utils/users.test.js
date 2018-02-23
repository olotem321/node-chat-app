const expect = require('expect');
const {Users} = require('./users');

describe('Users', () => {
    var users = new Users();

  beforeEach(() => {
    users.users = [{
      id: '1',
      name: 'John',
      room: 'Kroom'
    },
    {
      id: '2',
      name: 'Kim',
      room: 'Mroom'
    },
    {
      id: '3',
      name: 'Jane',
      room: 'Mroom'
    }]
  });

  it('should add new user', () =>{
    var users = new Users();
    var user = {
      id : '123',
      name: 'Kkil',
      room: 'Kroom'
    };

    var resUser = users.addUser(user.id, user.name, user.room);

    expect(users.users).toEqual([user]);
  });

  it('should return names for Mroom', () => {
    var res = users.getUserList('Mroom');
    expect(res).toEqual(['Kim','Jane']);
  });

  it('should return names for Kroom', () => {
    var res = users.getUserList('Kroom');
    expect(res).toEqual(['John']);
  });

  it('shoudl remove a user', () => {
      var userId = '1';
      var user = users.removeUser(userId);

      expect(user.id).toBe(userId);
      expect(users.users.length).toBe(2);
  });

  it('shoudl not remove a user', () => {
    var userId = '99';
    var user = users.removeUser(userId);

    expect(user).toNotExist();
    expect(users.users.length).toBe(3);
  });

  it('shoudl find a user', () => {
      var res  = users.getUser('1');
      expect(res.id).toBe('1');
  });

  it('shoudl not find a user', () => {
    var res  = users.getUser('4');
    expect(res).toNotExist();
  });

  it('should get true if name arleady exist', () => {
    var res = users.alreadyExist('John');

    expect(res).toBe(true);
  });

  it('should get false if name not exist', () => {
    var res = users.alreadyExist('JJboi');

    expect(res).toBe(false);
  });
});
