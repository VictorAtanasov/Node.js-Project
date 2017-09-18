const BaseData = require('./base/base.data');
const Item = require('../models/item.model');
const validator = {
    isValid() {
        return true
    }
}

class PostsData extends BaseData{
    constructor(db) {
        super(db, { name: 'Post' }, validator);
    }    
}

module.exports = PostsData