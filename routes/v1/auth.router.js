const express = require('express')
const AuthController = require('./../../controllers/AuthController')
const validator = require('./../../middleware/form-validator')
const router = express.Router()
/**
 * @typedef User
 * @property {string} firstName.required user first name
 * @property {string} lastName.required user last name
 * @property {string} email.required unique user email
 * @property {string} phoneNumber.required unique user phone number
 * @property {string} password.required  user password
 * @property {string} role.required user role such as admin
 */
/**
 * 
/**
 * Create a new user 
 * 
 * @route POST /v1/auth/signup/
 * @group Auth 
 * @param {User.model} user.body.required - the new user
 * @returns {object} 200 - User object
 * @returns {Error}  default - Unexpected error
 */
  

router.post('/signup' ,validator.validateUser, AuthController.signUp )
/**
 * @typedef Credential
 * @property {string} email.required
 * @property {string} password.required
 */
/**
 * @route POST /v1/auth/signin
 * @group Auth
 * @param {Credential.model} user.body.required
 * @returns {Object} 200 - user object
 * @returns {Error} 401 - un authorized
 */
router.post('/signin',AuthController.signIn )
module.exports = router