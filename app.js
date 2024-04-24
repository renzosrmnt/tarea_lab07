const express = require('express');
const mongoose = require('mongoose');
const Hotel = require('./mongo/hotelSchema');
const path = require('path');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public'))); // Corregido para que utilice path.join

mongoose.connect('mongodb://0.0.0.0:27017/Hoteleria', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB connected!');
}).catch((error) => {
    console.error('MongoDB connection error:', error);
});

// Ruta para mostrar la lista de hoteles
app.get('/hoteles', async (req, res) => {
    try {
        const hotels = await Hotel.find();
        res.render('hotels', { hotels: hotels }); // Renderiza la vista 'hotels' con la lista de hoteles
    } catch (error) {
        console.error('Error al obtener hoteles:', error);
        res.status(500).send('Ocurrió un error al obtener los hoteles.');
    }
});

// Ruta para eliminar un hotel
app.post('/eliminar-hotel', async (req, res) => {
    try {
        const hotelId = req.body.hotelId;
        await Hotel.findByIdAndDelete(hotelId); // Utilizando findByIdAndDelete() para eliminar el hotel
        res.redirect('/hoteles');
    } catch (error) {
        console.error('Error al eliminar hotel:', error);
        res.status(500).send('Ocurrió un error al eliminar el hotel.');
    }
});

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/users', (req, res) => {
    res.render('usuarios');
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
        res.redirect('/hoteles');
    } catch (error) {
        console.error('Error creando hotel:', error);
        res.status(500).send('Ocurrió un error al crear el hotel.');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});