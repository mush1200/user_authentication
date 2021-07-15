const express = require('express')
const exhbs = require('express-handlebars')
const app = express()
const port = 3000
//載入資料庫User model
const User = require('./models/user')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')  //新增
//引入mongoose
require('./config/mongoose')
//引入路由器
const routes = require('./routes/login')

//載入模板引擎
app.engine('handlebars',  exhbs({ defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({ extended: true} ))
app.use(cookieParser('123456789'))  //新增
app.use(routes)    //新增

//監聽器
app.listen(port, () => {
  console.log(`The Express server is running on http://localhost:${port}.`)
})