const express = require('express')
const JobController = require('./../../controllers/JobController')
const validator = require('./../../middleware/form-validator')
const {hasPermission} = require('./../../middleware/permission')
const router = express.Router()
/**
 * @typedef Job
 * @property {string} title.required job title
 * @property {string} category.required job category
 * @property {string} detail.required job detail
 */
/**
 * 
/**
 * Create a new job 
 * 
 * @route POST /v1/job
 * @group job 
 * @param {Job.model} Job.body.required - the new user
 * @returns {object} 200 - success message with job object
 * @returns {Error}  400 - invalid inputs
 */
  

router.post('/' , hasPermission('addJob'),validator.validateJob, JobController.addJob )
 
/**
 * @route GET /v1/job/{_id}
 * @group job
 * @param {string} _id.path.required
 * @security JWT
 * @returns {Object} 200 - returns job object
 * @returns {Error} 404 - job not found
 * 
 */
router.get('/:_id',hasPermission('getJobDetail'),JobController.getJobDetail )

/**
 * @route GET /v1/job/jobs/list
 * @group job
 * @param {string} limit.query.required
 * @param {string} page.query.required
 * @security JWT
 * @returns {Object} 200 - returns job object
 * @returns {Error} 404 - job not found
 * 
 */
router.get('/jobs/list',hasPermission('getJobList'),JobController.getJobList )
module.exports = router