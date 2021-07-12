const express = require('express')
const exhbs = require('express-handlebars')
const app = express()
const port = 3000
//載入資料庫User model
const User = require('./models/user')
const bodyParser = require('body-parser')

//載入mongoose
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/user-data', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

//連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
//連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

//載入模板引擎
app.engine('handlebars',  exhbs({ defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({ extended: true} ))
//設置路由
app.get('/', (req, res) => {
  res.render('index')
})

app.post('/login', (req, res) => {
  const msg = 'Username 或Password 錯誤'
  User.find({ email: req.body.email, password: req.body.password
  })
    .lean()
    .then(function (user) {
      if (user.length === 1) {
        res.render('welcome', {firstName: user[0].firstName})
      } else {
        res.render('index', {email: req.body.email, password: req.body.password, msg: msg})
      }
    })
    .catch(error => console.log(error))
})

//監聽器
app.listen(port, () => {
  console.log(`The Express server is running on http://localhost:${port}.`)
})