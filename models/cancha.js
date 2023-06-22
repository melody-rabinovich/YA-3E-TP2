
const { Dia } = require("./dia");

class Cancha {
  constructor(numero, nombre, tamanio, precio) {
    this.numero = numero;
    this.nombre = nombre;
    this.tamanio = tamanio;
    this.precio = precio;
    this.calendario2023 = this.setCalendario2023();
  }

  setCalendario2023() {
    const calendario = [];

    for (let i = 0; i < 12; i++) {
      const mes = new Date(2023, i, 1);
      const dias = [];
      while (mes.getMonth() === i) {
        dias.push(new Dia());
        mes.setDate(mes.getDate() + 1);
      }
      calendario.push(dias); //Se guardan los IDs de las reservas
    }
    return calendario;
  }
}

module.exports = {
  Cancha
};
