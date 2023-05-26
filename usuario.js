class Usuario {
    static ultimoID = 0;

    constructor(nombre){
        this.id = ++Usuario.ultimoID,
        this.nombre = nombre
    }
};

class UsuarioDuenio extends Usuario {
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
    UsuarioDuenio,
    UsuarioJugador
}
