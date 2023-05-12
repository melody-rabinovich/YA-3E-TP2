const Reserva = require('./reserva');

class Horario {
    constructor(numHora){
        this.numHora = numHora,
        this.reserva = null
    }

    estaDisponible(){
        return this.reserva === null;
    }

    reservar(titular, horaInicio){
        if (this.estaDisponible()){
            this.reserva = new Reserva(titular, horaInicio);
            return this.reserva;
        }else{
            return null;
        }
    }
};

module.exports = Horario;