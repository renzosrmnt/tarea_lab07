const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  price: { type: Number, required: true },
  tour: { type: mongoose.Schema.Types.ObjectId, ref: 'Tour', required: true }, 
  vuelo: { type: mongoose.Schema.Types.ObjectId, ref: 'Vuelo', required: true }, 
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
  departure_date: { type: Date, required: true },
  arrival_date: { type: Date, required: true },
  date_purchase: { type: Date, required: true }
});

const Ticket = mongoose.model('Ticket', ticketSchema);
module.exports = Ticket;
