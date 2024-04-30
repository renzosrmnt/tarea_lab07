const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  id: { type: String, required: true },
  id_customer: { type: String, required: true, maxlength: 12 }
});

const Tour = mongoose.model('Tour', tourSchema);
module.exports = Tour;