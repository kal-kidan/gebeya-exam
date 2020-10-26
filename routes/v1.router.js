const express = require('express')
const router = express.Router()
const user = require('./v1/user.router')
const auth = require('./v1/auth.router')
// router.use('/user', user)
router.use('/auth', auth)
module.exports = router