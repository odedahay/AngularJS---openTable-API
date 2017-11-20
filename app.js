var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// DataBase config location
var config = require('./config/database');

// MAP Global Promise - get rid of warning
mongoose.Promise = global.Promise;

// Connect to DB
mongoose.connect(config.database, {
  useMongoClient:true
})
  .then(function(){ console.log('MongoDB Connected') })
  .catch(function(err){ console.log(err) });

// load Booking Model
// require('./models/Reservations');

// var TableBooking = mongoose.model('Booking');

// var datastore = require('@google-cloud/storage')();
// Creates a client
// var datastore = require('@google-cloud/datastore')({
//   projectId: 'nodeapp-186415',
//   keyFilename: '/path/to/keyfile.json'
// });

// Load routes
var routes = require('./routes/index');
var reservation = require('./routes/reservation');

var app =  express();

// view engine setup - for AngularJs 
app.use(express.static(__dirname + '/app'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));
// app.use(bodyParser.json({type: 'application/vdn.api+json' }));

// Use Routes
app.use('/', routes);
app.use('/reservations', reservation);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.get('/', function(req, res) {
  res.json('Hello this my Node App in Google Clouds');
   // res.status(200).send('Hello this my Node App in Google Clouds');
 });
 
 var server =  app.listen(process.env.PORT || '8080', function() {
   console.log('App listening on port %s', server.address().port);
 });
 
 module.exports = app;