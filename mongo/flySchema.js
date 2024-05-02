const mongoose = require('mongoose');

const flySchema = new mongoose.Schema({
  id: { type: String, required: true },
  origin_lat: { type: Number, required: true },
  origin_lng: { type: Number, required: true },
  destiny_lng: { type: Number, required: true },
  destiny_lat: { type: Number, required: true },
  price: { type: Number, required: true },
  origin_name: { type: String, maxlength: 20 },
  destiny_name: { type: String, maxlength: 20 },
  aero_line: { type: String, maxlength: 20 }
});

const Fly = mongoose.model('Fly', flySchema);
module.exports = Fly;