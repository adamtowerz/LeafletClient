// app/models/user.js
// load the things we need
var mongoose = require('mongoose')

// define the schema for our user model
var userSchema = mongoose.Schema({
  google         : {
    id           : { type: String, required: true, unique: true },
    token        : { type: String, required: true, unique: true },
    name         : { type: String, required: true },
    email        : { type: String, required: true },
    img          : { type: String, required: true }
  }
})

// create the model for users and expose it to our app
var User = mongoose.model('User', userSchema, 'users')

module.exports = User
