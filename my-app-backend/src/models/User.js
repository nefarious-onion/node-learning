const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    firstname: String,
    lastname: String,
    username: String,
    password: String,
    phone: String
})

module.exports = mongoose.Model('User', UserSchema);