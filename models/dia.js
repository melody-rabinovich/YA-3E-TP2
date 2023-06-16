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
    // creo que la validación corresponde hacerla acá.
    // la estamos haciendo también desde Cancha otorgarReserva()
   console.log(this.estaDisponible(numHora))
    if (this.estaDisponible(numHora)) {
      let reserva = new Reserva(numHora, titular);
      this.reservas.push(reserva);
      return this.reservas;
    } else {
      console.log("no se pudo realizar la reserva");
      return null;
    }
  }
}

module.exports = Dia;
