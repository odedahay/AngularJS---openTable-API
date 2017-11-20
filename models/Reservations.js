var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TableBookSchema = new Schema({
  people: {
    type: Number, 
    index: true,
    default: 0
  },
  date: {
    type: String,
    required: true
  },
  time: {
    type:String,
    index: true,
    required: true,
  },
  name: {
    type:String,
    index: true,
    required: true,
  },
  contact: {
    type:String,
    required: true,
  },
  email: {
    type:String,
    unique: true,
    required: true,
  },
  restaurant_id: {
    type:String,
  },
  restaurant_name: {
    type:String,
  },
  country: {
    type:String,
  }
});

// Get All Booking
var Reservation = module.exports = mongoose.model('reservations', TableBookSchema);

module.exports.getTableBooking = function(callback) {
  Reservation.find(callback);
}

// Get Booking By ID
module.exports.getTableBookingById = function(id, callback) {
  Reservation.findById(id, callback);
}

// Get Restaurant By ID
module.exports.getRestaurantById = function(restaurant_id, callback) {
  var query = {restaurant_id: restaurant_id};
  Reservation.find(query, callback);
}

// Get Booking Users
module.exports.getBookingUser = function(user){
  var query = {user:user};
  Reservation.find(query, callback);
}

// Reserved a confirm Booking Table 
module.exports.createBooking = function(newBooking, callback) {
    newBooking.save(callback);
}

// Update Booked Table
module.exports.updateTableBooking = function(id, data, callback) {
  var people = data.people;
  var date = data.date;
  var time = data.time;
  var name = data.name;
  var contact = data.contact;
  var email = data.email;
  
  var query = { _id: id};
  
  Reservation.findById(id, function(err, reservation) {
    if(!reservation){
      return next(new Error('Could not load article'));
    }else {
      reservation.people  = people;
      reservation.date    = date;
      reservation.time    = time;
      reservation.name    = name;
      reservation.contact = contact;
      reservation.email   = email;
      
      // Save data
      reservation.save(callback);
    }
  });
}

// Delete Reservations
module.exports.removeReservation = function(id, callback) {
  Reservation.find({_id: id}).remove(callback);
}












