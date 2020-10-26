require('dotenv').config('./../.env')
const User = require('./../models/user.model')
const jwt  = require('jsonwebtoken')
const ApiError = require('./../error/ApiError')
const AUTHKEY = process.env.AUTHKEY
const auth = async (req, res, next)=>{ 
    try {
        const token = req.header('Authorization').replace("Bearer ",'')
        const decodedToken = jwt.verify(token, AUTHKEY)
        const {_id} = decodedToken
        const user = await User.findOne({_id})
        if(!user){
            return next(ApiError.unAuthorizedError("you are not authorized please authenticate first"))
        }
        req.user = user
        req.token = token
        next()

    } catch (error) {
        return next(ApiError.unAuthorizedError("you are not authorized please authenticate first"))
    }
    

}

module.exports = auth