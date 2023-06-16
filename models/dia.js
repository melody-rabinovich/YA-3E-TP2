const Reserva = require("./reserva");

class Dia {
  constructor() {
    //this.disponible = true;
    this.reservas = [];
  }

  estaDisponible(hora) {
    let i = 0;
    let disponible = true;

    while (i < this.reservas.length && disponible){
      if (this.reservas[i].numHora == hora){
        disponible == false;
      } else{
        i ++;
      }
    }
  
    return disponible;
  }

  reservar(numHora, titular) {
    if (true) {
      let reserva = new Reserva(numHora, titular);
      this.reservas.push(reserva);
      return this.reservas;
    } else {
      return null;
    }
  }
}

module.exports = Dia;
