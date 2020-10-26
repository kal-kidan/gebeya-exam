const mongoose = require('./../lib/db-connect');
const User = require('./user.model');
 
const jobSchema = mongoose.Schema(
    {
        
        category:{
            type: String,
            required: true
          },
        title:{
            type: String,
            required: true
          },
        detail: {
            type: String,
            required: true
        }
       
    } ,
    {
        timestamps: true
    }
    
    
)

 
const Job = mongoose.model('Job',jobSchema);

module.exports = Job;
 