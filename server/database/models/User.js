const bookshelf = require('../bookshelf');
// const bookshelf = require('../../bookshelf');

require('./Contact');
class User extends bookshelf.Model {
  get tableName() {
    return 'users';
  }
  get hasTimestamps() {
    return true;
  }

  Contacts() {
    return this.hasMany('Contact');
  }
}

module.exports = bookshelf.model('User', User);
