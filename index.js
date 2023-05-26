const Aplicacion = require('./aplicacion');
const Cancha = require('./cancha');
const Horario = require('./horario');
const Reserva = require('./reserva');
const {Usuario, UsuarioJugador, UsuarioDueño} = require('./usuario');


let cancha = new Cancha("El último 10", "Av. Mitre 1234, Caseros", 5, 1500, [1400,2300]);
let jugador1 = new UsuarioJugador("Jaime")
jugador1.reservar(cancha,0,0,1400);
jugador1.reservar(cancha,0,0,1500);
jugador1.reservar(cancha,0,0,2000);
jugador1.listarReservas();
console.log();

let jugador2 = new UsuarioJugador("Lucas");
jugador2.reservar(cancha,0,0,1000);
jugador2.reservar(cancha,0,0,1400);
jugador2.reservar(cancha,0,0,2100);
jugador2.listarReservas();
console.log();

cancha.listarDisponibilidad(0,0);
console.log();

jugador1.listarReservas();
console.log();
cancha.eliminarReserva(0,0,2000,jugador1);
console.log();
jugador1.listarReservas();
