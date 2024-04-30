const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  date_reservation: { type: Date, required: true },
  tour_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Tour', required: true },
  hotel_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel', null: true },
  customer_id: { type: String, required: true, maxlength: 12 },
  date_start: { type: Date },
  date_end: { type: Date, null: true },
  total_days: { type: Number },
  price: { type: Number, required: true }
});

const Reservation = mongoose.model('Reservation', reservationSchema);
module.exports = Reservation;