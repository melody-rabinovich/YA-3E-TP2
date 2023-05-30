const Cancha = require("./cancha");

class Usuario {
    static ultimoID = 0;

    constructor(nombre){
        this.id = ++Usuario.ultimoID,
        this.nombre = nombre
    }
};

class UsuarioDuenio extends Usuario {
    constructor(nombre){
        super(nombre),
        this.canchas = []
    }

    canchaRegistrada(direccion){
        let canchaRegistrada = false;
        let i = 0;
        while(i < canchas.length && !canchaRegistrada){
            canchaRegistrada = (canchas[i].direccion == direccion);
            i++;
        }
        return canchaRegistrada;
    }

    registrarCancha(nombre, duenio, direccion, tamanio, precio, horariosAtencion){
        if(!canchaRegistrada(direccion)){
            this.canchas.push(new Cancha(nombre, duenio, direccion, tamanio, precio, horariosAtencion))
            console.log("Cancha registrada.");
        } else {
            console.log("Ya cuenta con una cancha registrada en esa dirección.");
        }
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
            console.log(reserva.toString());
        });
    }
};

module.exports = {
    Usuario,
    UsuarioDuenio,
    UsuarioJugador
}
