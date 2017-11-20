var express = require('express');
var router = express.Router();

var Reservation = require('../models/Reservations')

router.get('/', function(req, res, next) {
  Reservation.getTableBooking(function(err, reservations) {
    if(err){
      console.log(err);
    }
    res.json(reservations)
  })
});


router.get('/:id', function(req, res, next) {
  Reservation.getTableBookingById(req.params.id, function(err, reservation) {
    if(err){ console.log(err);}
    res.json(reservation)
  })
});


router.get('/restaurant/:restaurant_id', function(req, res, next) {
  Reservation.getRestaurantById(req.params.restaurant_id, function(err, restaurantId) {
    if(err){
      console.log(err);
    }
    res.json(restaurantId)
    console.log("Heyy", restaurantId);
  })
});

// Submit Data to Database
router.post('/restaurants/r/book/', function(req, res, next) {
  // Get Form Values from reservation
  var name = req.body.name;
  var contact = req.body.contact;
  var email = req.body.email;
  var restaurant_id = req.body.restaurant_id;
  var restaurant_name = req.body.restaurant_name;
  var country = req.body.country;
  var people = req.body.people;
  var date = req.body.date;
  var time = req.body.time;
  
  // Create Reservation Object
  var newTableBooking = new Reservation({
    name: name,
    contact: contact,
    email: email,
    restaurant_id: restaurant_id,
    restaurant_name: restaurant_name,
    country: country,
    people: people,
    date: date,
    time: time
  });
  
  // Save in Database
  Reservation.createBooking(newTableBooking, function(err, reserved) {
    if(err){
      console.log(err);
    }
    
    res.location('/reservations');
    res.redirect('/reservations');
    
  });
})


// Update the reservation
router.put('/', function(req, res, next) {
  var id = req.body.id;
  var data = {
      people: req.body.people,
      date: req.body.date,
      time: req.body.time,
      name: req.body.name,
      contact: req.body.contact,
      email: req.body.email,
  };
  Reservation.updateTableBooking(id, data, function() {
    if(err){
      console.log(err);
    }
    
    res.location('/reservations');
    res.redirect('/reservations');
    
  });
});


// Delete Reservation Table
router.delete('/:id', function(req, res, next) {
  var id = req.params.id;
  
  // removing Reservation
  Reservation.removeReservation(id, function(err, reservationTable) {
    // catch if there is an error
    if(err){
      console.log(err);
    }
    
    res.location('/reservations');
    res.redirect('/reservations');
  
  });
});


module.exports = router;
