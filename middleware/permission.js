const {userPermissions} = require('./../lib/permission')
const {adminPermisions} = require('./../lib/permission')
const ApiError = require('./../error/ApiError')
 
exports.hasPermission = (permission) =>(req, res,next)=> {
   try {
    if (req.user.role === "user") {
        if(!userPermissions.includes(permission)){
            next(ApiError.unAuthorizedError('You dont have the right privilege '))
        }
        next();
    }
    else if(req.user.role === "admin"){
        if(!adminPermisions.includes(permission)){
            next(ApiError.unAuthorizedError('You dont have the right privilege '))
        }
        next();
    }
  
   } catch (error) {
    next(ApiError.internalServerError(error.message))
   }
}

