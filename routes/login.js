const express = require('express')
const router = express.Router()
const User = require('../models/user')

//設置路由
router.get('/', (req, res) => {
  const { email, password } = req.signedCookies

  if (email === "" || password === "") {
    res.render('login')
  }
  User.find({ email, password })
    .lean()
    .then(user => {
      if (user.length === 1) {
        res.render('welcome', { firstName: user[0].firstName })
      } else {
        res.render('login')
      }
    })
    .catch(error => console.log(error))
})

router.post('/login', (req, res) => {
  const msg = 'Username 或Password 錯誤'
  const { email, password } = req.body
  User.find({ email, password })
    .lean()
    .then((user) => {
      if (user.length === 1) {
        res.cookie('email', email, { path: '/', signed: true, maxAge: 60000 })
        res.cookie('password', password, {path: '/', signed: true, maxAge: 60000 })
        res.redirect('/')
      } else {
        res.render('login', { email: email, msg: msg })
      }
    })
    .catch(error => console.log(error))
})

module.exports = router