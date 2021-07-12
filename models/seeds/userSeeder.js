const mongoose = require('mongoose')
const User = require('../user')
mongoose.connect('mongodb://localhost/user-data', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
//載入user.json檔案
const data = require('../../user.json')
const userData = data.users
//連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
//連線成功
db.once('open', () => {
  console.log('mongodb connected!')
  userData.forEach( (user) => 
    User.create({
      firstName: user.firstName,
      email: user.email,
      password: user.password
    })
  )
  console.log('Success to set the Seeder!')
})