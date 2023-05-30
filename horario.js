const Reserva = require('./reserva');

class Horario {
    static ultimoID = 0;

    constructor(numHora){
        this.id = ++Horario.ultimoID,
        this.numHora = numHora,
        this.reserva = null
    }

    estaDisponible(){
        return this.reserva === null;
    }

    reservar(mes, dia, horaInicio, titular, cancha){
        if (this.estaDisponible()){
            this.reserva = new Reserva(mes, dia, horaInicio, titular, cancha);
            return this.reserva;
        } else {
            return null;
        }
    }
};

module.exports = Horario;