const mongoose = require('mongoose');
const customerSchema = new mongoose.Schema({
    dni: {
      type: String,
      required: true,
      unique: true,
      maxlength: 8
    },
    full_name: { 
      type: String, 
      required: true, 
      maxlength: 50 
    },
    credit_card: { 
      type: String, 
      maxlength: 20 
    },
    total_flights: { 
      type: Number 
    },
    total_lodgings: {
      type: Number 
    },
    total_tours: { 
      type: Number 
    },
    phone_number: { 
      type: String, 
      maxlength: 12 
    }
  });
  
const Customer = mongoose.model('Customer', customerSchema);
module.exports = Customer;