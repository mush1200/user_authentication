const express = require('express')
const exhbs = require('express-handlebars')
const app = express()
const port = 3000

//載入模板引擎
app.engine('handlebars',  exhbs({ defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

//設置路由
app.get('/', (req, res) => {
  res.render('index')
})

//監聽器
app.listen(port, () => {
  console.log(`The Express server is running on http://localhost:${port}.`)
})