const express = require('express')
const JobController = require('./../../controllers/JobController')
const validator = require('./../../middleware/form-validator')
const router = express.Router()
/**
 * @typedef Job
 * @property {string} title.required user first name
 * @property {string} category.required user last name
 * @property {string} detail.required unique user email
 */
/**
 * 
/**
 * Create a new job 
 * 
 * @route POST /v1/job
 * @group Job 
 * @param {User.model} user.body.required - the new user
 * @returns {object} 200 - success message with job object
 * @returns {Error}  400 - invalid inputs
 */
  

router.post('/' ,validator.validateJob, JobController.addJob )
 
/**
 * @route GET /v1/job/{_id}
 * @group Job
 * @param {string} id.path.required
 * @security JWT
 * @returns {Object} 200 - returns job object
 * @returns {Error} 404 - job not found
 * 
 */
router.get('/:_id',JobController.getJobDetail )

/**
 * @route GET /v1/job/list
 * @group Job
 * @param {string} limit.query.required
 * @param {string} page.query.required
 * @security JWT
 * @returns {Object} 200 - returns job object
 * @returns {Error} 404 - job not found
 * 
 */
router.get('/list',JobController.getJobList )
module.exports = router