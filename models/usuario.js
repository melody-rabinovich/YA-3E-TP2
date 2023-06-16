const { idGeneratorUsuario } = require("../utils/idGenerator.js");

const usuarioGenerator = idGeneratorUsuario();

class Usuario {
  constructor(nombre, mail) {
    this.id = usuarioGenerator.next().value;
    this.nombre = nombre;
    this.mail = mail;
  }
}

class UsuarioDueño extends Usuario {
  constructor(nombre, mail) {
    super(nombre, mail);
  }
}

class UsuarioJugador extends Usuario {
  constructor(nombre, mail) {
    super(nombre, mail);
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
