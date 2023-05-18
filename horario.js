const Reserva = require('./reserva');

class Horario {
    constructor(numHora){
        this.numHora = numHora,
        this.reserva = null
    }

    estaDisponible(){
        return this.reserva === null;
    }

    reservar(mes, dia, horaInicio, titular){
        if (this.estaDisponible()){
            this.reserva = new Reserva(mes, dia, horaInicio, titular);
            return this.reserva;
        }else{
            return null;
        }
    }
};

module.exports = Horario;