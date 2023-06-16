class Usuario {
  constructor(nombre) {
    this.nombre = nombre;
  }
}

class UsuarioDueño extends Usuario {
  constructor(nombre) {
    super(nombre);
  }
}

class UsuarioJugador extends Usuario {
  constructor(nombre) {
    super(nombre);
    this.reservas = [];
  }
  reservar(cancha, mes, dia, numHora) {
    cancha.otorgarReserva(mes, dia, numHora, this);
  }
  listarReservas() {
    this.reservas.forEach((reserva) => {
      console.log(reserva);
    });
  }
  agregarReserva(reserva) {
    this.reservas.push(reserva);
  }
}

module.exports = {
  Usuario,
  UsuarioDueño,
  UsuarioJugador,
};
