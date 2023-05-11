class Aplicacion{
    constructor(){
        this.canchasRegistradas = []
    }
    disponibilidadDiaHorario(hora, dia, mes){

    }

}

class Cancha {
    constructor(nombre, direccion, tamanio, precio, horariosAtencion){
        this.nombre = nombre,
        this.direccion = direccion,
        this.tamanio = tamanio,
//      Si el horario de atención es de 14 a 24, se computa como 1400 a 2300, ya que cuenta desde el inicio de la última hora
        this.horariosAtencion = horariosAtencion,
        this.calendario2023 = this.setCalendario2023(horariosAtencion),
        this.precio = precio
    }

    setCalendario2023(horariosAtencion){
        let cantMeses = 12;
        let meses = [];
        for (let i = 0; i < cantMeses; i++){
            meses.push([]);
        }
        //Llenar cada una de las 12 posiciones con arrays de horas, según la cantidad de días de cada mes

        //Enero
        for (let i = 0; i < 31; i++){
            meses[0].push([]);
        }
        //Febrero
        for (let i = 0; i < 28; i++){
            meses[1].push([]);
        }
        //Marzo
        for (let i = 0; i < 31; i++){
            meses[2].push([]);
        }
        //Abril
        for (let i = 0; i < 30; i++){
            meses[3].push([]);
        }
        //Mayo
        for (let i = 0; i < 31; i++){
            meses[4].push([]);
        }
        //Junio
        for (let i = 0; i < 30; i++){
            meses[5].push([]);
        }
        //Julio
        for (let i = 0; i < 31; i++){
            meses[6].push([]);
        }
        //Agosto
        for (let i = 0; i < 31; i++){
            meses[7].push([]);
        }
        //Septiembre
        for (let i = 0; i < 30; i++){
            meses[8].push([]);
        }
        //Octubre
        for (let i = 0; i < 31; i++){
            meses[9].push([]);
        }
        //Noviembre
        for (let i = 0; i < 30; i++){
            meses[10].push([]);
        }
        //Diciembre
        for (let i = 0; i < 31; i++){
            meses[11].push([]);
        }

        for (let i = 0; i < meses.length; i++){
            for (let j = 0; j < meses[i].length; j++){
                this.setDia(meses[i][j],horariosAtencion);
            }
        }

        return meses;
    }

    setDia(dia,horariosAtencion){
        for (let i = 0; i < horariosAtencion[1]; i++){
            dia.push(new Hora((horariosAtencion[0] + (i*100)),this.tamanio*2));
        }
    }

    numHoraToPosision(numHora){
        return (numHora - this.horariosAtencion[0]) / 100;
    }

    otorgarReserva(mes, dia, numHora, titular){
        if(numHora >= this.horariosAtencion[0] && numHora <= this.horariosAtencion[1]){
            let nuevaReserva = this.calendario2023[mes][dia][this.numHoraToPosision(numHora)].reservar(titular, numHora);
            if(nuevaReserva !== null){
                titular.reservas.push[nuevaReserva];
                console.log("Se ha registrado su reserva.");
            } else {
                console.log("No se ha podido efectuar su reserva porque la cancha ya está reservada en ese horario.");
            }
        } else{
            console.log("Esta cancha no abre en la hora solicitada.");
        }
    }

    getDisponibilidad(mes, dia, horaInicio, horaFin){
        let horasDisponibles = [];
        // Hay que chequear que exista al menos una hora de disponibilidad, por lo que evaluamos si el fin del horario
        // de interés es más tarde que mi hora de apertura, o que el comienzo del horario de interés es más temprano que
        // la hora de cierre.
        if(horaFin >= this.horariosAtencion[0] || horaInicio <= this.horariosAtencion[1]){
            let horaComunInicio;
            let horaComunFin;
            if(horaInicio >= this.horariosAtencion[0]){
                horaComunInicio = horaInicio;
            } else {
                horaComunInicio = this.horariosAtencion[0];
            }
            if(horaFin <= this.horariosAtencion[1]){
                horaComunFin = horaFin;
            } else {
                horaComunInicio = this.horariosAtencion[1];
            }
            for (let i = this.numHoraToPosision(horaComunInicio); i <= this.numHoraToPosision(horaComunFin); i++) {
                if(this.calendario2023[mes][dia][i].estaDisponible()){
                    console.log(this.calendario2023[mes][dia][i].numHora);
                    horasDisponibles.push[this.calendario2023[mes][dia][i]];
//                    console.log(horasDisponibles[horasDisponibles.length-1].numHora);
                }
            }
        } else {
            console.log("La cancha no está abierta en ese rango horario.");
        }
        return horasDisponibles;
    }

/*     getDisponibilidad(mes, dia){
        this.getDisponibilidad(mes, dia, 0, 2300);
    }
 */
    listarDisponibilidad(mes, dia, horaInicio, horaFin){
        const disponibilidad = this.getDisponibilidad(mes, dia, horaInicio, horaFin);
        console.log("hola2");
        if(disponibilidad.length != 0){
            console.log("hola3");
            for(let i = 0; i < disponibilidad.length; i++){
                console.log(disponibilidad[i].numHora);
            }
        }
    }
}

class Hora {
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
}

class Usuario {
    constructor(nombre){
        this.nombre = nombre,
        this.reservas = []
    }
}

class UsuarioDueño extends Usuario {
    constructor(nombre, canchas){
        super(nombre),
        this.canchas = canchas
    }
}

class UsuarioJugador extends Usuario {
    constructor(nombre){
        super(nombre),
        this.reservas = []
    }

    reservar(cancha, mes, dia, numHora){
        cancha.otorgarReserva(mes, dia, numHora, this);
    }

}

class Reserva {
    constructor(titular, horaInicio){
        this.titular = titular,
        this.horaInicio = horaInicio
    }
}

let cancha = new Cancha("El último 10", "Av. Mitre 1234, Caseros", 5, 1500, [1400,2300]);
let jugador1 = new UsuarioJugador("Jaime")
jugador1.reservar(cancha,0,0,1400);
jugador1.reservar(cancha,0,0,1400);
jugador1.reservar(cancha,0,0,2000);
//cancha.otorgarReserva(0,0,1000);
//cancha.otorgarReserva(0,0,1400);
//cancha.otorgarReserva(0,0,1400);

cancha.listarDisponibilidad(0,0,0,2300);
