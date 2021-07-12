const express = require('express')
const router = express.Router()
const User = require('../../models/user')

//設置路由
router.get('/', (req, res) => {
  res.render('index')
})

router.post('/login', (req, res) => {
  const msg = 'Username 或Password 錯誤'
  User.find({
    email: req.body.email, password: req.body.password
  })
    .lean()
    .then(function (user) {
      if (user.length === 1) {
        res.render('welcome', { firstName: user[0].firstName })
      } else {
        res.render('index', { email: req.body.email, password: req.body.password, msg: msg })
      }
    })
    .catch(error => console.log(error))
})

module.exports = router