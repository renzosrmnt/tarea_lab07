const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
    customer: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    }
});

const Tour = mongoose.model('Tour', tourSchema);
module.exports = Tour;