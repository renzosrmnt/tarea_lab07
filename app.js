const express = require('express');
const mongoose = require('mongoose');
const Hotel = require('./mongo/hotelSchema');

const app = express();
const path = require('path');

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(__dirname + '/public'));

mongoose.connect('mongodb://0.0.0.0:27017/Hoteleria', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB connected!');
}).catch((error) => {
    console.error('MongoDB connection error:', error);
});

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/crear-hotel', async (req, res) => {
    try {
        const { name, address, rating, price } = req.body;
        const newHotel = new Hotel({
            name,
            address,
            rating: parseInt(rating),
            price: parseFloat(price)
        });
        await newHotel.save();
        res.send('Hotel creado exitosamente.');
    } catch (error) {
        console.error('Error creando hotel:', error);
        res.status(500).send('Ocurrió un error al crear el hotel.');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
