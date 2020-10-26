const express = require('express')
const router = express.Router()
const job = require('./v1/job.router')
const auth = require('./v1/auth.router')
const authorize = require('./../middleware/auth.middleware')
const unless = require('express-unless');
//authenitcation
authorize.unless = unless;
router.use(authorize.unless({ path:['/v1/auth/signin', '/v1/auth/signup', '/api-docs', 'api-docs'] }))
router.use('/auth', auth)
router.use('/job', job)

module.exports = router