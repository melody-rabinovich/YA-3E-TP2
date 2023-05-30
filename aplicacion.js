class Aplicacion{
    constructor(){
        this.canchasRegistradas = [],
        this.usuariosRegistrados = []
    }

    registrarCancha(cancha){
        this.canchasRegistradas.push(cancha);
    }

    registrarUsuario(usuario){
        this.usuariosRegistrados.push(usuario);
    }

    disponibilidadDiaHorario(mes, dia, hora){
        const canchasConDisponibilidad = this.getDisponibilidadDiaHorario(mes, dia, hora);
        if(canchasConDisponibilidad.length != 0){
            canchasConDisponibilidad.forEach(cancha => {
                console.log(cancha.toString());
            });
        } else {
            console.log("No hay canchas disponibles en ese horario.");
        }
    }

    getDisponibilidadDiaHorario(mes, dia, hora){
        const canchasConDisponibilidad = [];
        for(let i = 0; i < this.canchasRegistradas.length; i++){
            if(this.canchasRegistradas[i].tieneDisponibilidad(mes, dia, hora)){
                canchasConDisponibilidad.push(this.canchasRegistradas[i]);
            }
        }
        return canchasConDisponibilidad;
    }
};

module.exports = Aplicacion;