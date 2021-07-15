const User = require('../user')
//引入mongoose
const db = require('../../config/mongoose')

//載入user.json檔案
const data = require('../../user.json')
const userData = data.users
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