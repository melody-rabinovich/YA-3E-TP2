class Hora {
  constructor(id, usuario, cancha, fechaHora) {
    this.id = id;
    this.usuario = usuario;
    this.cancha = cancha;
    this.fechaHora = fechaHora;
  }

  setFechaHora(fechaHora) {
    if (fechaHora instanceof Date) {
      this.fechaHora = fechaHora;
    } else {
      throw new Error("La fecha y hora deben ser un objeto de tipo Date");
    }
  }
}
