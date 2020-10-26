const User = require('./../models/user.model')
const { validationResult} = require('express-validator')
const ApiError = require('./../error/ApiError')
const signUp = async (req, res, next)=>{
    let errors = validationResult(req)
    if(!errors.isEmpty()){
        return next(ApiError.badRequest(errors))
    }
    try {
        let user = new User (req.body)
        user = await user.save()
        let token = await user.getAuthToken()
        res.json({user, token})
      } catch (error) {
          res.json({
              error: true,
              message: error.message
          })
        }
}

const signIn = async (req, res, next)=>{
    const {email} = req.body
    const {password} = req.body
    const user = await User.findByCredentials(email, password)
    if(!user){
        return next(ApiError.unAuthorizedError({error: true, message: "incorrect username or password"}))
    }
    const token = await user.getAuthToken()
    return res.json({status: true, user, token})
}

module.exports = {
    signIn,
    signUp
}