class Reserva {
    static ultimoID = 0;

    constructor(mes, dia, horaInicio, titular){
        this.id = ++Reserva.ultimoID,
        this.mes = mes,
        this.dia = dia,
        this.horaInicio = horaInicio,
        this.titular = titular
    }
};

module.exports = Reserva;