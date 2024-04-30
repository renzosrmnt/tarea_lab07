const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  price: { type: Number, required: true },
  tour_id: { type: Number, required: true },
  fly_id: { type: Number, required: true },
  customer_id: { type: String, required: true, maxlength: 12 },
  departure_date: { type: Date, required: true },
  arrival_date: { type: Date, required: true },
  date_purchase: { type: Date, required: true }
});

const Ticket = mongoose.model('Ticket', ticketSchema);
module.exports = Ticket;