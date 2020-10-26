const express = require('express')
const router = express.Router()
const job = require('./v1/job.router')
const auth = require('./v1/auth.router')
router.use('/auth', auth)
router.use('/job', job)
module.exports = router