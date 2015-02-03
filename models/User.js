var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bCrypt = require('bcrypt-nodejs');

var userSchema = new Schema({
    firstname: String,
    lastname: String,
    email: String,
    password: String
});


userSchema.methods.validPassword = function (password) {
  return bCrypt.compareSync(password, this.password);
}
module.exports = mongoose.model('User',  userSchema);