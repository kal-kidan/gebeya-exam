require('dotenv').config('./../.env')
const User = require('./../models/user.model')
const jwt  = require('jsonwebtoken')
const AUTHKEY = process.env.AUTHKEY
const authenticate = async (req, res, next)=>{ 
    try {
        const token = req.header('Authorization').replace("Bearer ",'')
        const decodedToken = jwt.verify(token, AUTHKEY)
        const {_id} = decodedToken
        const user = await User.findOne({_id})
        if(!user){
           return res.status(401).json(
                {
                    error: true,
                    message: "authentication failed "
                }
            )
        }
        req.user = user
        req.token = token
        next()

    } catch (error) {
        return res.status(401).json(
            {
                error: true,
                message: "authentication failed "
            }
        )
    }
    

}

module.exports = {authenticate}