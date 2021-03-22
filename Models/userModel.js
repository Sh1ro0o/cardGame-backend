const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    'username' : String,
    'password' : String,
    'email' : String
});

userSchema.pre('save', (next) => {
    next();
  });

let User = mongoose.model('user', userSchema);
module.exports = User;