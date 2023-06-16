const Dia = require("./dia");
const Usuario = require("./usuario");
const { idGeneratorCancha } = require("../utils/idGenerator.js");

const canchaIdGenerator = idGeneratorCancha();

class Cancha {
  constructor(nombre, precio) {
    this.id = canchaIdGenerator.next().value;
    this.nombre = nombre;
    this.calendario2023 = this.setCalendario2023();
    this.precio = precio;
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
      calendario.push(dias);
    }

    return calendario;
  }

  otorgarReserva(fecha, numHora, titular) {
    const mes = fecha.getMonth();
    const date = fecha.getDate();

    const dia = this.calendario2023[mes][date];
    if (dia && dia.estaDisponible(numHora)) {
      const nuevaReserva = dia.reservar(numHora, titular);

      if (nuevaReserva !== null) {
        //titular.agregarReserva(nuevaReserva);
        console.log("Se ha registrado su reserva.");
      } else {
        console.log(
          "No se ha podido efectuar su reserva porque la cancha ya está reservada en ese horario."
        );
      }
    } else {
      console.log("La cancha ya está reservada en ese horario.");
    }
  }
}

/*eliminarReserva(fecha, numHora, titular) {
    const [mes, dia] = this.getMesDia(fecha);
    const horarioReservado = this.calendario2023[mes][dia][numHora];

    if (
      horarioReservado &&
      !horarioReservado.estaDisponible() &&
      horarioReservado.reserva.titular === titular
    ) {
      titular.reservas = titular.reservas.filter(
        (reserva) =>
          reserva.fecha.getTime() !== fecha.getTime() ||
          reserva.horaInicio !== numHora
      );
      console.log("Se ha eliminado su reserva.");
    } else {
      console.log(
        "Usted no es el titular de la reserva, por lo que no puede cancelarla."
      );
    }
  }

  getDisponibilidad(fecha, horaInicio = 0, horaFin = 23) {
    const [mes, dia] = this.getMesDia(fecha);
    const diaReservas = this.calendario2023[mes][dia];

    const disponibilidad = [];
    for (let hora = horaInicio; hora <= horaFin; hora++) {
      if (diaReservas[hora] && diaReservas[hora].estaDisponible()) {
        disponibilidad.push(hora);
      }
    }

    return disponibilidad;
  }

  listarDisponibilidad(fecha, horaInicio, horaFin) {
    const disponibilidad = this.getDisponibilidad(fecha, horaInicio, horaFin);

    if (disponibilidad.length > 0) {
      for (const horario of disponibilidad) {
        console.log(horario);
      }
    }
  }

  getMesDia(fecha) {
    const mes = fecha.getMonth();
    const dia = fecha.getDate() - 1;
    return [mes, dia];
  }*/

module.exports = Cancha;

let cancha1 = new Cancha("miCancha", 100);
console.log(cancha1);
let usuario1 = new Usuario.UsuarioJugador("Roberto");

const fechaActual = new Date(2023, 5, 10);

cancha1.otorgarReserva(fechaActual, 10, usuario1.nombre);
cancha1.otorgarReserva(fechaActual, 11, usuario1);
cancha1.otorgarReserva(fechaActual, 12, usuario1);
// intento reservar en el mismo horario
cancha1.otorgarReserva(fechaActual, 12, usuario1);

//console.log(cancha1.calendario2023[5][10]);
//console.log(cancha1.calendario2023[5][10].reservas[1].titular);
