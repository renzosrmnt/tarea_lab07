const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 50
    },
    address: {
        type: String,
        required: true,
        maxlength: 50
    },
    rating: {
        type: Number,
        min: 1,
        max: 5
    },
    price: {
        type: Number,
        required: true
    }
});

const Hotel = mongoose.model('Hotel', hotelSchema);

module.exports = Hotel;
