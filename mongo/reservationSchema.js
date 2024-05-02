const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  date_reservation: { type: Date, required: true },
  tour: { type: mongoose.Schema.Types.ObjectId, ref: 'Tour', required: true },
  hotel: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel', required: true },
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
  date_start: { type: Date },
  date_end: { type: Date, null: true },
  total_days: { type: Number },
  price: { type: Number, required: true }
});

const Reservation = mongoose.model('Reservation', reservationSchema);
module.exports = Reservation;