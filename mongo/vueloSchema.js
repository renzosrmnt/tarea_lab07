const mongoose = require('mongoose');

const vueloSchema = new mongoose.Schema({
    origin_lat: {
        type: Number,
        required: true,
    },
    origin_lng: {
        type: Number,
        required: true,
    },
    destiny_lat: {
        type: Number,
        required: true,
    },
    destiny_lng: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    origin_name: {
        type: String,
        required: true,
        maxlength: 50
    },
    destiny_name: {
        type: String,
        required: true,
        maxlength: 50
    },
    aero_line: {
        type: String,
        required: true,
        maxlength: 50
    }
});

const Vuelo = mongoose.model('Vuelo', vueloSchema);

module.exports = Vuelo;
