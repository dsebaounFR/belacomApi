var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  User = require('./api/models/belacomModel'), //created model loading here
  bodyParser = require('body-parser');


// mongoose instance connection url connection
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://admin:admin@ds161336.mlab.com:61336/belacomdb');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./api/routes/belacomRoutes'); //importing route
routes(app); //register the route

app.listen(port);

console.log('belacom RESTful API server started on: ' + port);
