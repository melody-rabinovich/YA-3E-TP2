class Reserva {
    static ultimoID = 0;

    constructor(mes, dia, horaInicio, titular, cancha){
        this.id = ++Reserva.ultimoID,
        this.mes = mes,
        this.dia = dia,
        this.horaInicio = horaInicio,
        this.titular = titular,
        this.cancha = cancha,
        this.estado = EstadoReserva.Activa
    }

    toString(){
        return "Titular: " + this.titular.nombre + " | Fecha: " + this.dia + "/" + this.mes + " | Hora: " + this.horaInicio + 
        " | Lugar: " + this.cancha.nombre + " (" + this.cancha.direccion + ") | Estado: " + this.estado;
    }

    cancelarReserva(){
        this.estado = EstadoReserva.Cancelada;
    }
};

const EstadoReserva = {
    Activa: "Activa",
    Cancelada: "Cancelada"
}

module.exports = Reserva;