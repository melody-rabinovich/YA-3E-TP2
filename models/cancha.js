const Horario = require("./horario");
class Cancha {
  static ultimoID = 0;

  constructor(nombre, tamanio, precio, horariosAtencion) {
    (this.id = ++Cancha.ultimoID),
      (this.nombre = nombre),
      (this.tamanio = tamanio),
      //      El horario de atención consiste en un array de dos números; el primero es la hora de apertura, y el segundo, la de cierre.
      (this.horariosAtencion = horariosAtencion),
      //      Si el horario de atención marca la hora de cierre, la última hora activa es la que inicia justo antes, y que finaliza en
      //      la hora de cierre.
      (this.ultimaHoraActiva = horariosAtencion[1] - 100),
      //      El calendario es un array de meses; un mes es un array de días; un día es un array de horas; cada hora puede o no
      //      tener una reserva asignada.
      (this.calendario2023 = this.setCalendario2023([
        horariosAtencion[0],
        this.ultimaHoraActiva,
      ])),
      (this.precio = precio),
      (this.reservasCanceladas = []);
  }

  setCalendario2023(horariosAtencion) {
    /* if (horariosAtencion === undefined) {
            console.error("Los horarios de atención no están definidos.");
            return null; // O realiza alguna acción de manejo de errores apropiada
          }*/

    let cantMeses = 12;
    let meses = [];
    for (let i = 0; i < cantMeses; i++) {
      meses.push([]);
    }
    //Llenar cada una de las 12 posiciones con arrays de horas, según la cantidad de días de cada mes

    //Enero
    for (let i = 0; i < 31; i++) {
      meses[0].push([]);
    }
    //Febrero
    for (let i = 0; i < 28; i++) {
      meses[1].push([]);
    }
    //Marzo
    for (let i = 0; i < 31; i++) {
      meses[2].push([]);
    }
    //Abril
    for (let i = 0; i < 30; i++) {
      meses[3].push([]);
    }
    //Mayo
    for (let i = 0; i < 31; i++) {
      meses[4].push([]);
    }
    //Junio
    for (let i = 0; i < 30; i++) {
      meses[5].push([]);
    }
    //Julio
    for (let i = 0; i < 31; i++) {
      meses[6].push([]);
    }
    //Agosto
    for (let i = 0; i < 31; i++) {
      meses[7].push([]);
    }
    //Septiembre
    for (let i = 0; i < 30; i++) {
      meses[8].push([]);
    }
    //Octubre
    for (let i = 0; i < 31; i++) {
      meses[9].push([]);
    }
    //Noviembre
    for (let i = 0; i < 30; i++) {
      meses[10].push([]);
    }
    //Diciembre
    for (let i = 0; i < 31; i++) {
      meses[11].push([]);
    }

    for (let i = 0; i < meses.length; i++) {
      for (let j = 0; j < meses[i].length; j++) {
        this.setDia(meses[i][j], horariosAtencion);
      }
    }

    return meses;
  }

  setDia(dia, horariosAtencion) {
    for (let i = 0; i < horariosAtencion[1]; i++) {
      dia.push(new Horario(horariosAtencion[0] + i * 100, this.tamanio * 2));
    }
  }

  numHoraToPosision(numHora) {
    return (numHora - this.horariosAtencion[0]) / 100;
  }

  otorgarReserva(mes, dia, numHora, titular) {
    if (
      numHora >= this.horariosAtencion[0] &&
      numHora <= this.horariosAtencion[1]
    ) {
      let nuevaReserva = this.calendario2023[mes][dia][
        this.numHoraToPosision(numHora)
      ].reservar(mes, dia, numHora, titular);
      if (nuevaReserva !== null) {
        titular.reservas.push(nuevaReserva);
        console.log("Se ha registrado su reserva.");
      } else {
        console.log(
          "No se ha podido efectuar su reserva porque la cancha ya está reservada en ese horario."
        );
      }
    } else {
      console.log("Esta cancha no abre en la hora solicitada.");
    }
  }

  eliminarReserva(mes, dia, numHora, titular) {
    // No se está contemplando la posibilidad de que el usuario se cree una reserva por su parte, ya que aquí una
    // reserva existe sí o sí en ambos arrays, el de la cancha y el del usuario.
    let horario =
      this.calendario2023[mes][dia][this.numHoraToPosision(numHora)];
    if (!horario.estaDisponible()) {
      if (horario.reserva.titular == titular) {
        console.log("letra");
        // Acá pusimos un cero ("0") porque necesitamos el intex de la reserva en el array de reservas del
        // usuario, y no tenemos uno. Por lo tanto, hardcodeamos la primera posición del array.
        titular.reservas.splice(0, 1);
        /*                titular.reservas = titular.reservas.map(reserva => {
                    if(reserva.mes != mes && reserva.dia != dia && reserva.horaInicio != numHora){
                        return reserva;
                    }
                });*/
      } else {
        console.log(
          "Usted no es el titular de la reserva, por lo que no puede cancelarla."
        );
      }
    } else {
      console.log("Esta cancha no tiene esa hora reservada. Está disponible.");
    }
  }

  getDisponibilidad(mes, dia, horaInicio = 0, horaFin = 2300) {
    let horasDisponibles = [];
    // Hay que chequear que exista al menos una hora de disponibilidad, por lo que evaluamos si el fin del horario
    // de interés es más tarde que mi hora de apertura, o que el comienzo del horario de interés es más temprano que
    // la hora de cierre.
    if (
      horaFin >= this.horariosAtencion[0] ||
      horaInicio <= this.horariosAtencion[1]
    ) {
      let horaComunInicio;
      let horaComunFin;
      if (horaInicio >= this.horariosAtencion[0]) {
        horaComunInicio = horaInicio;
      } else {
        horaComunInicio = this.horariosAtencion[0];
      }
      if (horaFin <= this.horariosAtencion[1]) {
        horaComunFin = horaFin;
      } else {
        horaComunInicio = this.horariosAtencion[1];
      }
      for (
        let i = this.numHoraToPosision(horaComunInicio);
        i <= this.numHoraToPosision(horaComunFin);
        i++
      ) {
        if (this.calendario2023[mes][dia][i].estaDisponible()) {
          //console.log(this.calendario2023[mes][dia][i].numHora);
          horasDisponibles.push(this.calendario2023[mes][dia][i]);
          //                    console.log(horasDisponibles[horasDisponibles.length-1].numHora);
        }
      }
    } else {
      console.log("La cancha no está abierta en ese rango horario.");
    }
    //console.log( horasDisponibles)
    return horasDisponibles;
  }

  listarDisponibilidad(mes, dia, horaInicio, horaFin) {
    const disponibilidad = this.getDisponibilidad(
      mes,
      dia,
      horaInicio,
      horaFin
    );
    if (disponibilidad.length != 0) {
      for (let i = 0; i < disponibilidad.length; i++) {
        console.log(disponibilidad[i].numHora);
      }
    }
  }
}

module.exports = Cancha;
