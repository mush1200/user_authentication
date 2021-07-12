const mongoose = require('mongoose')
const Schema = mongoose.Schema
const userSchema = new Schema({
  firstName: {
    type: String,
    require: true,
    trim: true
  },
  email: {
    type: String,
    require: true,
    trim: true
  },
  password: {
    type: String,
    require: true,
    trim: true
  }
})

module.exports = mongoose.model('User', userSchema)