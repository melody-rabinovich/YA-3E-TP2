
const EstadoReserva = {
  Activa: "Activa",
  Cancelada: "Cancelada"
}

class Reserva {
  constructor(fecha, hora, idUsuario, idCancha) {
    this.fecha = fecha;
    this.hora;
    this.setHora(hora);
    this.idUsuario = idUsuario;
    this.idCancha = idCancha;
    this.estado = EstadoReserva.Activa
  }

  setHora(hora){
    if(hora >= 24){
      throw new Error("La hora ingresada no es válida.");
    }
    this.hora = hora;
  }
}

module.exports = {
  Reserva,
  EstadoReserva,
};
