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

const getJobDetail = async (req, res, next)=>{
    try {
      let {_id} = req.params
      if(userId!== req.user._id)
       return res.json({error: true, msg: "you have not the right privilege"})
       const jobDetail = await Job.findById(_id)
       if(!jobDetail) return next(ApiError.notFoundError(`job with an id of ${_id} is not found`))
       else return res.json(jobDetail)
    } catch (error) {
        return next(ApiError.internalServerError(error.message))
    }
  }
  const getJobList = async (req, res, next)=>{
    const limit = parseInt(req.query.limit)  
    const page = parseInt(req.query.page)
    if( !(limit > 0 && page > 0) ) {  
        return next(ApiError.badRequest("invalid input"))
    }
    try { 
        Job.paginate({}, { page, limit }, function(err, result) {
          return  res.json(result)
        });
    } catch (errors) {
        return next(ApiError.internalServerError(error.message))
    }
     
  }

module.exports = {
    addJob,
    getJobDetail,
    getJobList
}