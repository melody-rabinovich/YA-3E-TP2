const Aplicacion = require('./aplicacion');
const Cancha = require('./cancha');
const Horario = require('./horario');
const Reserva = require('./reserva');
const {Usuario, UsuarioJugador, UsuarioDuenio} = require('./usuario');

let app = new Aplicacion;
let jugador1 = new UsuarioJugador("Jaime")
let jugador2 = new UsuarioJugador("Lucas");
let duenio1 = new UsuarioDuenio("Nicolás")
let cancha1 = new Cancha("El último 10", duenio1, "Av. Mitre 1234, Caseros", 5, 1500, [1400,2300]);
let cancha2 = new Cancha("Las Tres Estrellas", duenio1, "Av. San Martín 1234, Caseros", 5, 1500, [1000,2400]);

jugador1.reservar(cancha1,0,0,1400);
jugador1.reservar(cancha1,0,0,1500);
jugador1.reservar(cancha1,0,0,1500);
jugador1.reservar(cancha1,0,0,2000);
jugador1.listarReservas();
console.log();

jugador2.reservar(cancha1,0,0,1000);
jugador2.reservar(cancha1,0,0,1400);
jugador2.reservar(cancha2,0,0,1400);
jugador2.reservar(cancha1,0,0,2100);
jugador2.listarReservas();
console.log();

cancha1.listarDisponibilidad(0,0);
console.log();

jugador1.listarReservas();
console.log();
cancha1.cancelarReserva(0,0,2000,jugador1);
console.log();
jugador1.listarReservas();
console.log();

app.registrarCancha(cancha1);
app.registrarCancha(cancha2);

app.disponibilidadDiaHorario(0,0,1000);