const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const versionOneRouter = require('./routes/v1.router')
const errorHandler = require('./middleware/error-handler')
const auth = require('./middleware/auth.middleware')
const unless = require('express-unless');


//authenitcation
auth.unless = unless;
app.use(auth.unless({ path:['/v1/auth/signin', '/v1/auth/signup', '/api-docs'] }))

//route 
app.use('/v1', versionOneRouter)
//error handler
app.use(errorHandler)

//documentation
const expressSwagger = require('express-swagger-generator')(app)

let options = {
    swaggerDefinition: {
        info: {
            description: 'Job Portal',
            title: 'Job Portal',
            version: '1.0.0',
        },
        host: `localhost:${process.env.PORT}`,
        basePath: '/',
        produces: [
            "application/json"
        ],
        schemes: ['http', 'https'],
		securityDefinitions: {
            JWT: {
                type: 'apiKey',
                in: 'header',
                name: 'Authorization',
                description: "",
            }
        }
    },
    basedir: __dirname,  
    files: ['./routes/v1/*.js']  
};
expressSwagger(options)


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// security 
const mongoSanitize = require('express-mongo-sanitize')
const helmet = require('helmet')
const xxsClean = require('xss-clean')
const hpp = require('hpp')

const rateLimiter = require('express-rate-limit')
const limiter = rateLimiter(
    {
        windowMs:10*60*60,
        max:10
    }
)

app.use(helmet())
app.use(xxsClean())
app.use(limiter)
app.use(hpp())
app.use(mongoSanitize())


// Capture All 404 errors
app.use(function (req,res,next){
	res.status(404).send('Unable to find the requested resource!');
});

const port = process.env.PORT || 3333
app.listen(port, ()=>{
    console.log(`the server is listening on port ${port}`);
})

module.exports = {app}