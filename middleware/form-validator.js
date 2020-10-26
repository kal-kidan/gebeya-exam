const {check} = require('express-validator')
const validateUser = [
  check('firstName').isAlpha().withMessage("please enter valid name"),
  check('lastName').isAlpha().withMessage("please enter valid name"),
  check('email').isEmail().withMessage("please enter valid email"),
  check('password').isLength({min: 6}).withMessage("please enter valid password"),
  check('phoneNumber').isLength({min: 9}).withMessage("please enter valid phone number"),
  check('role').isAlpha().withMessage("please enter valid role")
]

module.exports = {
    validateUser
}