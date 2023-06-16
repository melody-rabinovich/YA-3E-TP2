const Reserva = require("./reserva");

class Dia {
  constructor() {
    this.disponible = true;
    this.reserva = [];
  }

  estaDisponible() {
    return this.disponible;
  }

  reservar(numHora, titular) {
    if (this.disponible) {
      let reserva = new Reserva(numHora, titular);
      this.reserva.push(reserva);
      return this.reserva;
    } else {
      return null;
    }
  }
}

module.exports = Dia;
