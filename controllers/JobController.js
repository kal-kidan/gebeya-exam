const User = require('./../models/user.model')
const { validationResult} = require('express-validator')
const ApiError = require('./../error/ApiError')
const Job = require('./../models/job.model')
const addJob = async (req, res, next)=>{
    try {
        const job = await Job.create(req.body)
        if(!job) 
        return next(ApiError.badRequest(errors))
        return res.json({status: true, msg: "you have successfuly added a job"})  
          
       } catch (error) {
        return next(ApiError.internalServerError(error.message))
       }
}


module.exports = {
    addJob
}