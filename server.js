/* Core Node.js modules */
var express     = require('express');
var app         = express();

/* Third-party NPM libraries */
var bodyParser  = require('body-parser'); // for parsing
var morgan      = require('morgan'); // for logging
var mongoose    = require('mongoose'); // for MongoDB 
var jwt    = require('jsonwebtoken'); // for tokens

/* Application files */
var config = require('./config'); // conn string, secret, ...
var User   = require('./models/User'); // mongoose/mongodb User model
    

/* Configuration */
mongoose.connect(config.database); // connect to database
mongoose.connection.on('error', function() {
  console.info('Error: Could not connect to MongoDB. Did you forget to run `mongod`?'.red);
});

var port = process.env.PORT || 3000; // use conventional Express port of 3000 or other if set

/* Begin Express middleware */
app.set('secretVariableToUse', config.secret); // set secret variable to use later

// Parser to get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));
/* End Express middleware */

/* NOTE: The order of the sections below is important, keep 1,2,3, and 4 below in order*/

/* 1. Begin non-API routes */
// Base route http://localhost:3000
app.get('/', function(req, res) {
    res.send('Hello! This is a base non-secure non-API route');
});

// User setup route http://localhost:3000/usersetup
app.get('/usersetup', function(req, res) {

  // create a user
  var user = new User({ 
    userName: 'Test User', 
    userPassword: 'testPassword',
    isAdmin: true 
  });

  // save the sample user
  user.save(function(err) {
    if (err) throw err;

    console.log('User saved successfully');
    res.json({ success: true });
  });
});
/* 1. End non-API routes */

// Get an instance of the router for api routes
var apiRoutes = express.Router(); 

/* 2. Begin non-secure middleware API routes */
// Route to authenticate a user (POST http://localhost:3000/api/authenticate)
apiRoutes.post('/authenticate', function(req, res) {

  // find the user
  User.findOne({
    userName: req.body.userName
  }, function(err, user) {

    if (err) throw err;

    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {

      // check if password matches
      if (user.userPassword != req.body.userPassword) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {

        // if user is found and password is right
        // create a token
        var token = jwt.sign(user, app.get('secretVariableToUse'), {
          expiresInMinutes: 1440 // expires in 24 hours
        });

        // return the information including token as JSON
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token
        });
      }   
    }
  });
});
/* 2. End non-secure middleware API routes */


/* 3. Begin - route middleware to authenticate and check token */
// route middleware to verify a token
apiRoutes.use(function(req, res, next) {

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, app.get('secretVariableToUse'), function(err, decoded) {      
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;    
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({ 
        success: false, 
        message: 'No token provided.' 
    });
    
  }
});
/* 3. End - route middleware to authenticate and check token */

/* BEGIN - BELOW HERE WILL NNED AUTHENTICATION */
/* 4. Begin secure API routes */
// route to show a random message (GET http://localhost:3000/api/)
apiRoutes.get('/', function(req, res) {
  res.json({ message: 'Welcome to the coolest API on earth!' });
});

// route to return all users (GET http://localhost:3000/api/users)
apiRoutes.get('/users', function(req, res) {
  User.find({}, function(err, users) {
    res.json(users);
  });
});   

// apply the routes to our application with the prefix /api
app.use('/api', apiRoutes);
/* 4. End secure API routes */
/* END - BELOW HERE WILL NNED AUTHENTICATION */

/* Begin - start the server */
app.listen(port);
console.log('Server started on port:' + port);
/* End - start the server */