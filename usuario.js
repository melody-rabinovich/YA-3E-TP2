class Usuario {
    constructor(nombre){
        this.nombre = nombre,
        this.reservas = []
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
};

module.exports = {
    Usuario,
    UsuarioDueño,
    UsuarioJugador
}

