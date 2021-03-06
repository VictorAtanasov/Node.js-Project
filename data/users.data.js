const BaseData = require('./base/base.data');
const User = require('../models/user.model');


class UsersData extends BaseData {
    constructor(db) {
        super(db, User, User);
    }

    findByUsername(username) {
        return this
            .filterBy({ username: new RegExp(username, 'i') })
            .then(([user]) => user);
    }

    checkPassword(username, password) {
        return this.findByUsername(username)
            // .then((user) => {
            //     // if(!user){
            //     //     throw 'Invalid user'
            //     // }
            //     // if (user.password !== password) {
            //     //     throw 'Invalid pass'
            //     // }
            //     // return true
            //     //console.log(user, password)
            //     return password
            // })   
    }
}

module.exports = UsersData;