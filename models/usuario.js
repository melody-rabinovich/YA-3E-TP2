class Usuario {
    constructor(nombre){
        this.nombre = nombre
    }
};

class UsuarioDueño extends Usuario {
    constructor(nombre, canchas){
        super(nombre),
        this.canchas = canchas
    }
};

class UsuarioJugador extends Usuario {
    constructor(nombre){
        super(nombre),
        this.reservas = []
    };
    reservar(cancha, mes, dia, numHora){
        cancha.otorgarReserva(mes, dia, numHora, this);
    }
    listarReservas(){
        this.reservas.forEach(reserva => {
            console.log(reserva);
        });
    }
};

module.exports = {
    Usuario,
    UsuarioDueño,
    UsuarioJugador
}

