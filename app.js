const express = require('express');
const mongoose = require('mongoose');
const Hotel = require('./mongo/hotelSchema');
const Vuelo = require('./mongo/vueloSchema');
const Customer = require('./mongo/customerSchema');
const Reservation = require('./mongo/reservationSchema');
const Ticket = require('./mongo/ticketSchema');
const Tour = require('./mongo/tourSchema');
const path = require('path');
 

const app = express();

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

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

app.get('/nuevo-hotel', (req, res) => {
    res.render('nuevoHotel');
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
// Ruta para cargar los datos de un hotel en el formulario de edición
app.get('/editar-hotel/:hotelId', async (req, res) => {
    try {
        const hotelId = req.params.hotelId;
        const hotel = await Hotel.findById(hotelId); // Busca el hotel por su ID en MongoDB

        if (!hotel) {
            return res.status(404).send('Hotel no encontrado');
        }

        // Renderiza la vista 'editarHotel' y pasa los datos del hotel como contexto
        res.render('editarHotel', { hotel: hotel });
    } catch (error) {
        console.error('Error al cargar hotel para editar:', error);
        res.status(500).send('Ocurrió un error al cargar el hotel para editar.');
    }
});
// Ruta para actualizar un hotel
app.post('/actualizar-hotel', async (req, res) => {
    try {
        const { hotelId, name, address, rating, price } = req.body;

        // Validar que se proporcionó el ID del hotel
        if (!hotelId) {
            return res.status(400).send('ID del hotel no proporcionado');
        }

        // Buscar el hotel por su ID y actualizar los campos
        const updatedHotel = await Hotel.findByIdAndUpdate(hotelId, {
            name,
            address,
            rating: parseInt(rating),
            price: parseFloat(price)
        }, { new: true }); // Usar { new: true } para obtener el hotel actualizado

        if (!updatedHotel) {
            return res.status(404).send('Hotel no encontrado');
        }

        // Redireccionar a la lista de hoteles después de la actualización
        res.redirect('/hoteles');
    } catch (error) {
        console.error('Error al actualizar hotel:', error);
        res.status(500).send('Ocurrió un error al actualizar el hotel.');
    }
});


//VUELOS =================================================================================
app.get('/vuelos', async (req, res) => {
    try {
        const vuelos = await Vuelo.find();
        res.render('vuelos', { vuelos: vuelos }); 
    } catch (error) {
        console.error('Error al obtener vuelos:', error);
        res.status(500).send('Ocurrió un error al obtener los vuelos.');
    }
});

app.get('/nuevo-vuelo', (req, res) => {
    res.render('nuevoVuelo');
});

app.post('/crear-vuelo', async (req, res) => {
    try {
        const { origin_lat, origin_lng, destiny_lat, destiny_lng, price, origin_name, destiny_name, aero_line } = req.body;
        const newVuelo = new Vuelo({
            origin_lat: parseFloat(origin_lat),
            origin_lng: parseFloat(origin_lng),
            destiny_lat: parseFloat(destiny_lat),
            destiny_lng: parseFloat(destiny_lng),
            price: parseFloat(price),
            origin_name,
            destiny_name,
            aero_line
        });
        await newVuelo.save();
        res.redirect('/vuelos');
    } catch (error) {
        console.error('Error creando vuelo:', error);
        res.status(500).send('Ocurrió un error al crear el vuelo.');
    }
});

app.post('/eliminar-vuelo', async (req, res) => {
    try {
        const vueloId = req.body.vueloId;
        await Vuelo.findByIdAndDelete(vueloId); // Utilizando findByIdAndDelete() para eliminar el hotel
        res.redirect('/vuelos');
    } catch (error) {
        console.error('Error al eliminar vuelo:', error);
        res.status(500).send('Ocurrió un error al eliminar el vuelo.');
    }
});

// Ruta para cargar los datos de un hotel en el formulario de edición
app.get('/editar-vuelo/:vueloId', async (req, res) => {
    try {
        const vueloId = req.params.vueloId;
        const vuelo = await Vuelo.findById(vueloId);

        if (!vuelo) {
            return res.status(404).send('vuelo no encontrado');
        }

        res.render('editarVuelo', { vuelo: vuelo });
    } catch (error) {
        console.error('Error al cargar vuelo para editar:', error);
        res.status(500).send('Ocurrió un error al cargar el vuelo para editar.');
    }
});

// Ruta para actualizar un hotel
app.post('/actualizar-vuelo', async (req, res) => {
    try {
        const { vueloId, origin_lat, origin_lng, destiny_lat, destiny_lng, price, origin_name, destiny_name, aero_line } = req.body;

        // Validar que se proporcionó el ID del hotel
        if (!vueloId) {
            return res.status(400).send('ID del vuelo no proporcionado');
        }

        const updatedVuelo = await Vuelo.findByIdAndUpdate(vueloId, {
            origin_lat: parseFloat(origin_lat),
            origin_lng: parseFloat(origin_lng),
            destiny_lat: parseFloat(destiny_lat),
            destiny_lng: parseFloat(destiny_lng),
            price: parseFloat(price),
            origin_name,
            destiny_name,
            aero_line
        }, { new: true });

        if (!updatedVuelo) {
            return res.status(404).send('Vuelo no encontrado');
        }

        // Redireccionar a la lista de hoteles después de la actualización
        res.redirect('/vuelos');
    } catch (error) {
        console.error('Error al actualizar vuelo:', error);
        res.status(500).send('Ocurrió un error al actualizar el vuelo.');
    }
});


//TOURS ================================================================================================
app.get('/', async (req, res) => {
    try {
        // Obtén todos los tours y sus clientes asociados
        const tours = await Tour.find().populate('customer');

        res.render('index', { tours : tours }); // Renderiza la vista con la lista de tours y clientes
    } catch (error) {
        console.error('Error al obtener la lista de tours:', error);
        res.status(500).send('Ocurrió un error al obtener la lista de tours');
    }
});

// Ruta para renderizar el formulario
app.get('/nuevo-tour', async (req, res) => {
    try {
        // Obtén todos los clientes de la base de datos
        const customers = await Customer.find();

        res.render('nuevoTour', { customers: customers }); // Renderiza el formulario con la lista de clientes
    } catch (error) {
        console.error('Error al obtener clientes:', error);
        res.status(500).send('Ocurrió un error al obtener clientes');
    }
});

// Ruta para procesar el formulario y crear un nuevo Tour
app.post('/crear-tour', async (req, res) => {
    try {
        const { customerId } = req.body; // Obtén el customerId del formulario

        // Crea un nuevo documento Tour con el customerId proporcionado
        const newTour = new Tour({
            customer: customerId // customerId debe ser un ObjectId válido de un Customer existente
        });

        // Guarda el nuevo Tour en la base de datos
        await newTour.save();
        res.redirect('/');
    } catch (error) {
        console.error('Error al crear el Tour:', error);
        res.status(500).send('Ocurrió un error al crear el Tour');
    }
});

// Ruta para cargar los datos de un tour en el formulario de edición
app.get('/editar-tour/:tourId', async (req, res) => {
    try {
        const tourId = req.params.tourId;
        const tour = await Tour.findById(tourId).populate('customer'); // Busca el tour por su ID y popula el cliente asociado

        if (!tour) {
            return res.status(404).send('Tour no encontrado');
        }

        // Obtener la lista de clientes para mostrar en el select
        const customers = await Customer.find(); // Asume que Customer es el modelo de Mongoose para clientes

        // Renderiza la vista 'editarTour' y pasa los datos del tour y la lista de clientes como contexto
        res.render('editarTour', { tour: tour, customers: customers });
    } catch (error) {
        console.error('Error al cargar tour para editar:', error);
        res.status(500).send('Ocurrió un error al cargar el tour para editar.');
    }
});

// Ruta para actualizar un tour
app.post('/actualizar-tour', async (req, res) => {
    try {
      const { tourId, customerId } = req.body;
  
      // Validar que se proporcionó el ID del tour
      if (!tourId) {
        return res.status(400).send('ID del tour no proporcionado');
      }
  
      // Actualizar el tour con el nuevo cliente asociado
      const updatedTour = await Tour.findByIdAndUpdate(tourId, {
        customer: customerId
      }, { new: true }).populate('customer'); // Popula el cliente asociado después de la actualización
  
      if (!updatedTour) {
        return res.status(404).send('Tour no encontrado');
      }
  
      // Redireccionar a la lista de tours después de la actualización
      res.redirect('/');
    } catch (error) {
      console.error('Error al actualizar tour:', error);
      res.status(500).send('Ocurrió un error al actualizar el tour.');
    }
});


// Ruta para eliminar un tour
app.post('/eliminar-tour', async (req, res) => {
    try {
        const tourId = req.body.tourId; // Obtén el tourId del cuerpo de la solicitud

        // Validar que se proporcionó el ID del tour
        if (!tourId) {
            return res.status(400).send('ID del tour no proporcionado');
        }

        // Buscar y eliminar el tour por su ID
        const deletedTour = await Tour.findByIdAndDelete(tourId);

        if (!deletedTour) {
            return res.status(404).send('Tour no encontrado');
        }

        // Redireccionar a la lista de tours después de la eliminación
        res.redirect('/'); // Puedes redirigir a la página principal o a la lista de tours
    } catch (error) {
        console.error('Error al eliminar tour:', error);
        res.status(500).send('Ocurrió un error al eliminar el tour.');
    }
});


// CLIENTE =============================================================================================
app.get('/nuevo-cliente', (req, res) => {
    res.render('nuevoUser');
});

app.post('/crear-cliente', async (req, res) => {
    try {
        const { dni, full_name, credit_card, phone_number } = req.body;
        const newCustomer = new Customer({
            dni,
            full_name,
            credit_card,
            phone_number
        });
        await newCustomer.save();
        res.redirect('/clientes');
    } catch (error) {
        console.error('Error creando cliente:', error);
        res.status(500).send('Ocurrió un error al crear el cliente.');
    }
});

app.get('/clientes', async (req, res) => {
    try {
        const customers = await Customer.find(); // Obtiene todos los clientes de la base de datos
        res.render('clientes', { customers: customers }); // Renderiza la vista 'clientes' con la lista de clientes
    } catch (error) {
        console.error('Error al obtener clientes:', error);
        res.status(500).send('Ocurrió un error al obtener los clientes.');
    }
});

// Ruta para cargar los datos de un cliente en el formulario de edición
app.get('/editar-cliente/:customerId', async (req, res) => {
    try {
        const customerId = req.params.customerId;
        const customer = await Customer.findById(customerId); // Busca el cliente por su ID en MongoDB

        if (!customer) {
            return res.status(404).send('Cliente no encontrado');
        }

        // Renderiza la vista 'editarCliente' y pasa los datos del cliente como contexto
        res.render('editarCliente', { customer: customer });
    } catch (error) {
        console.error('Error al cargar cliente para editar:', error);
        res.status(500).send('Ocurrió un error al cargar el cliente para editar.');
    }
});

// Ruta para actualizar un cliente
app.post('/actualizar-cliente', async (req, res) => {
    try {
        const { customerId, dni, full_name, credit_card, phone_number } = req.body;

        // Validar que se proporcionó el ID del cliente
        if (!customerId) {
            return res.status(400).send('ID del cliente no proporcionado');
        }

        // Buscar el cliente por su ID y actualizar los campos
        const updatedCustomer = await Customer.findByIdAndUpdate(customerId, {
            dni,
            full_name,
            credit_card,
            phone_number
        }, { new: true }); // Usar { new: true } para obtener el cliente actualizado

        if (!updatedCustomer) {
            return res.status(404).send('Cliente no encontrado');
        }

        // Redireccionar a la lista de clientes después de la actualización
        res.redirect('/clientes');
    } catch (error) {
        console.error('Error al actualizar cliente:', error);
        res.status(500).send('Ocurrió un error al actualizar el cliente.');
    }
});

// Ruta para eliminar un cliente
app.post('/eliminar-cliente', async (req, res) => {
    try {
        const customerId = req.body.customerId;
        await Customer.findByIdAndDelete(customerId); // Utilizando findByIdAndDelete() para eliminar el cliente
        res.redirect('/clientes');
    } catch (error) {
        console.error('Error al eliminar cliente:', error);
        res.status(500).send('Ocurrió un error al eliminar el cliente.');
    }
});

// BOLETOS
// Ruta para listar los tickets (boletos)
app.get('/boletos', async (req, res) => {
    try {
        // Obtener todos los tickets con sus referencias pobladas
        const tickets = await Ticket.find({})
            .populate('tour', 'id') // Poblar el campo 'tour' y mostrar solo el ID
            .populate('vuelo', 'origin_name destiny_name') // Poblar el campo 'vuelo' y mostrar los nombres de origen y destino
            .populate('customer', 'dni'); // Poblar el campo 'customer' y mostrar el DNI

            tickets.forEach(ticket => {
                ticket.departureDateFormatted = ticket.departure_date.toISOString().split('T')[0];
                ticket.arrivalDateFormatted = ticket.arrival_date.toISOString().split('T')[0];
                ticket.purchaseDateFormatted = ticket.date_purchase.toISOString().split('T')[0];
            });
        
        // Renderizar la vista 'boletos' y pasar los datos de los tickets como contexto
        res.render('boletos', { tickets: tickets });
    } catch (error) {
        console.error('Error al cargar los boletos:', error);
        res.status(500).send('Ocurrió un error al cargar los boletos.');
    }
});

app.get('/nuevo-boleto', async (req, res) => {
    try {
        const tours = await Tour.find(); // Obtener todos los tours
        const customers = await Customer.find(); // Obtener todos los clientes
        const vuelos = await Vuelo.find(); // Obtener todos los vuelos

        res.render('nuevoBoleto', { tours, customers, vuelos });
    } catch (error) {
        console.error('Error al obtener datos para agregar boleto:', error);
        res.status(500).send('Ocurrió un error al cargar la página de agregar boleto.');
    }
});

app.post('/crear-boleto', async (req, res) => {
    try {
        const { tourId, customerId, vueloId, price, departureDate, arrivalDate, datePurchase } = req.body;

        // Validar que se proporcionaron todos los campos necesarios
        if (!tourId || !customerId || !vueloId || !price || !departureDate || !arrivalDate || !datePurchase) {
            return res.status(400).send('Todos los campos son obligatorios');
        }

        // Crear un nuevo boleto en la base de datos
        const newTicket = new Ticket({
            tour: tourId,
            customer: customerId,
            vuelo: vueloId,
            price: price,
            departure_date: new Date(departureDate),
            arrival_date: new Date(arrivalDate),
            date_purchase: new Date(datePurchase)
        });

        // Guardar el nuevo boleto en la base de datos
        await newTicket.save();

        // Redireccionar a una página de confirmación o a la lista de boletos
        res.redirect('/boletos');
    } catch (error) {
        console.error('Error al agregar un boleto:', error);
        res.status(500).send('Ocurrió un error al agregar un boleto.');
    }
});

// Ruta para eliminar un boleto (ticket)
app.post('/eliminar-boleto', async (req, res) => {
    try {
        const tickerId = req.body.tickerId; // Obtén el ticketId del cuerpo de la solicitud

        // Validar que se proporcionó el ID del boleto
        if (!ticketId) {
            return res.status(400).send('ID del boleto no proporcionado');
        }

        // Buscar y eliminar el boleto por su ID
        const deletedTicket = await Ticket.findByIdAndDelete(ticketId);

        if (!deletedTicket) {
            return res.status(404).send('Boleto no encontrado');
        }

        // Redireccionar a la lista de boletos después de la eliminación
        res.redirect('/boletos'); // Redirige a la página de boletos después de eliminar el boleto
    } catch (error) {
        console.error('Error al eliminar boleto:', error);
        res.status(500).send('Ocurrió un error al eliminar el boleto.');
    }
});

// Ruta para cargar el formulario de edición de un boleto
app.get('/editar-boleto/:ticketId', async (req, res) => {
    try {
        const ticketId = req.params.ticketId;
        const ticket = await Ticket.findById(ticketId)
            .populate('tour', 'id')
            .populate('vuelo', 'origin_name destiny_name')
            .populate('customer', 'dni full_name');

        if (!ticket) {
            return res.status(404).send('Boleto no encontrado');
        }

        // Obtener la lista de tours, vuelos y clientes para mostrar en los selects
        const tours = await Tour.find({}, 'id'); // Asume que Tour es el modelo de Mongoose para tours
        const vuelos = await Vuelo.find({}, 'id origin_name destiny_name'); // Asume que Vuelo es el modelo de Mongoose para vuelos
        const customers = await Customer.find({}, 'dni full_name'); // Asume que Customer es el modelo de Mongoose para clientes

        // Renderizar la vista 'editarBoleto' y pasar los datos del boleto y las listas como contexto
        res.render('editarBoleto', { ticket: ticket, tours: tours, vuelos: vuelos, customers: customers });
    } catch (error) {
        console.error('Error al cargar boleto para editar:', error);
        res.status(500).send('Ocurrió un error al cargar el boleto para editar.');
    }
});

// Ruta para actualizar un boleto
app.post('/actualizar-boleto', async (req, res) => {
    try {
        const { ticketId, tourId, vueloId, customerId, price, departureDate, arrivalDate, datePurchase } = req.body;

        // Validar que se proporcionó el ID del boleto
        if (!ticketId) {
            return res.status(400).send('ID del boleto no proporcionado');
        }

        // Actualizar el boleto con los nuevos datos
        const updatedTicket = await Ticket.findByIdAndUpdate(ticketId, {
            tour: tourId,
            vuelo: vueloId,
            customer: customerId,
            price: price,
            departure_date: departureDate,
            arrival_date: arrivalDate,
            date_purchase: datePurchase
        }, { new: true })
        .populate('tour', 'id')
        .populate('vuelo', 'origin_name destiny_name')
        .populate('customer', 'dni');

        if (!updatedTicket) {
            return res.status(404).send('Boleto no encontrado');
        }

        // Redireccionar a la lista de boletos después de la actualización
        res.redirect('/boletos');
    } catch (error) {
        console.error('Error al actualizar boleto:', error);
        res.status(500).send('Ocurrió un error al actualizar el boleto.');
    }
});

//RESERVAS ==============================================================================
app.get('/reservas', async (req, res) => {
    try {
        // Obtener todas las reservas con sus referencias pobladas
        const reservations = await Reservation.find({})
            .populate('tour', 'id') // Poblar el campo 'tour' y mostrar solo el ID
            .populate('hotel', 'name') // Poblar el campo 'hotel' y mostrar solo el nombre
            .populate('customer', 'full_name'); // Poblar el campo 'customer' y mostrar el DNI

        // Renderizar la vista 'reservas' y pasar los datos de las reservas como contexto
        res.render('reservas', { reservations: reservations });
    } catch (error) {
        console.error('Error al cargar las reservas:', error);
        res.status(500).send('Ocurrió un error al cargar las reservas.');
    }
});

app.get('/nueva-reserva', async (req, res) => {
    try {
        const tours = await Tour.find(); // Obtener todos los tours
        const hotels = await Hotel.find(); // Obtener todos los hoteles
        const customers = await Customer.find(); // Obtener todos los clientes

        res.render('nuevaReserva', { tours, hotels, customers });
    } catch (error) {
        console.error('Error al obtener datos para agregar reserva:', error);
        res.status(500).send('Ocurrió un error al cargar la página de agregar reserva.');
    }
});

app.post('/crear-reserva', async (req, res) => {
    try {
        const { tourId, hotelId, customerId, dateStart, dateEnd, price } = req.body;

        // Validar que se proporcionaron todos los campos necesarios
        if (!tourId || !hotelId || !customerId || !price) {
            return res.status(400).send('Todos los campos son obligatorios');
        }

        // Crear una nueva reserva en la base de datos
        const newReservation = new Reservation({
            tour: tourId,
            hotel: hotelId,
            customer: customerId,
            date_reservation: new Date(),
            date_start: new Date(dateStart),
            date_end: new Date(dateEnd),
            price: price
        });

        // Guardar la nueva reserva en la base de datos
        await newReservation.save();

        // Redireccionar a una página de confirmación o a la lista de reservas
        res.redirect('/reservas');
    } catch (error) {
        console.error('Error al agregar una reserva:', error);
        res.status(500).send('Ocurrió un error al agregar una reserva.');
    }
});

app.get('/editar-reserva/:reservationId', async (req, res) => {
    try {
        const reservationId = req.params.reservationId;
        const reservation = await Reservation.findById(reservationId)
            .populate('tour', 'id')
            .populate('hotel', 'name')
            .populate('customer', 'dni full_name');

        if (!reservation) {
            return res.status(404).send('Reserva no encontrada');
        }

        // Obtener la lista de tours, hoteles y clientes para mostrar en los selects
        const tours = await Tour.find({}, 'id'); // Asume que Tour es el modelo de Mongoose para tours
        const hotels = await Hotel.find({}, 'name'); // Asume que Hotel es el modelo de Mongoose para hoteles
        const customers = await Customer.find({}, 'dni full_name'); // Asume que Customer es el modelo de Mongoose para clientes

        // Renderizar la vista 'editarReserva' y pasar los datos de la reserva y las listas como contexto
        res.render('editarReserva', { reservation: reservation, tours: tours, hotels: hotels, customers: customers });
    } catch (error) {
        console.error('Error al cargar reserva para editar:', error);
        res.status(500).send('Ocurrió un error al cargar la reserva para editar.');
    }
});

app.post('/actualizar-reserva', async (req, res) => {
    try {
        const { reservationId, tourId, hotelId, customerId, dateReservation, dateStart, dateEnd, price } = req.body;

        // Validar que se proporcionó el ID de la reserva
        if (!reservationId) {
            return res.status(400).send('ID de la reserva no proporcionado');
        }

        // Actualizar la reserva con los nuevos datos
        const updatedReservation = await Reservation.findByIdAndUpdate(reservationId, {
            tour: tourId,
            hotel: hotelId,
            customer: customerId,
            date_reservation: new Date(dateReservation),
            date_start: new Date(dateStart),
            date_end: dateEnd ? new Date(dateEnd) : null,
            price: price
        }, { new: true })
        .populate('tour', 'id')
        .populate('hotel', 'name')
        .populate('customer', 'dni full_name');

        if (!updatedReservation) {
            return res.status(404).send('Reserva no encontrada');
        }

        // Redireccionar a la lista de reservas después de la actualización
        res.redirect('/reservas');
    } catch (error) {
        console.error('Error al actualizar reserva:', error);
        res.status(500).send('Ocurrió un error al actualizar la reserva.');
    }
});

// Ruta para eliminar una reserva (reservation)
app.post('/eliminar-reserva', async (req, res) => {
    try {
        const reservationId = req.body.reservationId; // Obtén el reservationId del cuerpo de la solicitud

        // Validar que se proporcionó el ID de la reserva
        if (!reservationId) {
            return res.status(400).send('ID de la reserva no proporcionado');
        }

        // Buscar y eliminar la reserva por su ID
        const deletedReservation = await Reservation.findByIdAndDelete(reservationId);

        if (!deletedReservation) {
            return res.status(404).send('Reserva no encontrada');
        }

        // Redireccionar a la lista de reservas después de la eliminación
        res.redirect('/reservas'); // Redirige a la página de reservas después de eliminar la reserva
    } catch (error) {
        console.error('Error al eliminar reserva:', error);
        res.status(500).send('Ocurrió un error al eliminar la reserva.');
    }
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

