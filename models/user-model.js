const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstname: String,
    lastname: String,
    googleid: String,
    profilepicture: String,
    lastlogintime: String,
    newlogintime: String
});

const User = mongoose.model('user', userSchema);

module.exports = User;