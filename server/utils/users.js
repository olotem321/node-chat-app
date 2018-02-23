class Users {
  constructor() {
    this.users = [];
  }

  addUser (id, name, room){
    var user = {id, name, room};
    this.users.push(user);
    return user;
  }

  removeUser(id){
    var res = this.getUser(id);

    if(res){
      this.users = this.users.filter((user) => {
        return user.id !== res.id;
      });
    }

    return res;

  }

  getUser(id){
    return this.users.filter((user) => {
      return user.id === id;
    })[0];
  }

  getUserList(room){
    var users = this.users.filter((user) => {
      return user.room === room;
    });

    var namesArray = users.map((user) => {
      return user.name;
    });

    return namesArray;
  }

  alreadyExist(name, room){

    var usersInRoom = this.users.filter((user) => {
      return user.room === room;
    });

    var res = usersInRoom.filter((user) => {
      return user.name === name;
    });

    if(res.length === 0){
      return false;
    } else {
      return true;
    }

  }


}


module.exports = {
  Users
}
