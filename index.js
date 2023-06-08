const Aplicacion = require('./models/aplicacion.js');
const Cancha = require('./models/cancha.js');
const Horario = require('./models/horario.js');
const {Usuario, UsuarioJugador, UsuarioDueño} = require('./models/usuario.js');
const express = require('express');
const app = express();
//Se lo pone entre llaves para llamar al valor de la propiedad crearUsuarioJugador que es el callback
const {crearUsuarioJugador, crearUsuarioDuenio} = require('./controllers/usuarioController')
const {crearCancha} = require('./controllers/canchaController.js')
let  bodyParser= require('body-parser')

//Sin esta linea no funciona el POST por el formato de JSON
app.use(bodyParser.json());

app.get('/', (require,response) => {
    response.send('Bienvenidos a la API del proyecto de canchas')
});
//El response, por otro lado, es el objeto utilizado para enviar la respuesta al cliente.

//¿Todos los get y post y las interacciones con el servidor se hacen desde el index.js?
//Se crean dueños y jugador por solicitudes POST hacia el servidor
app.post('/usuarios', crearUsuarioJugador);
app.post('/duenio', crearUsuarioDuenio);

app.post('/cancha', crearCancha);


/*let cancha = new Cancha("El último 10", "Av. Mitre 1234, Caseros", 5, 1500, [1400,2300]);
let jugador1 = new UsuarioJugador("Jaime")
jugador1.reservar(cancha,0,0,1400);
jugador1.reservar(cancha,0,0,1400);
jugador1.reservar(cancha,0,0,2000);

let jugador2 = new UsuarioJugador("Lucas");
//cancha.otorgarReserva(0,0,1000);
//cancha.otorgarReserva(0,0,1400);
//cancha.otorgarReserva(0,0,1400);

cancha.listarDisponibilidad(0,0,0,2300);
console.log();
cancha.listarDisponibilidad(0,0);
console.log();
jugador1.listarReservas();
console.log();
cancha.eliminarReserva(0,0,2000,jugador1);
console.log();
jugador1.listarReservas();*/

// Levanta el servidor en el puerto 3000 http://localhost:3000/
const port =3000;
app.listen(port, () => {
 console.log(`Servidor escuchando en el puerto ${port}
 http://localhost:3000/`);
});