const Horario = require("./horario");

class Cancha {
    static ultimoID = 0;

    constructor(nombre, duenio, direccion, tamanio, precio, horariosAtencion){
        this.id = ++Cancha.ultimoID,
        this.nombre = nombre,
        this.duenio = duenio,
        this.direccion = direccion,
        this.tamanio = tamanio,
//      El horario de atención consiste en un array de dos números; el primero es la hora de apertura, y el segundo, la de cierre.
        this.horariosAtencion = horariosAtencion,
//      Si el horario de atención marca la hora de cierre, la última hora activa es la que inicia justo antes, y que finaliza en
//      la hora de cierre.
        this.ultimaHoraActiva = horariosAtencion[1]-100,
//      El calendario es un array de meses; un mes es un array de días; un día es un array de horas; cada hora puede o no
//      tener una reserva asignada.
        this.calendario2023 = this.setCalendario2023([horariosAtencion[0],this.ultimaHoraActiva]),
        this.precio = precio,
        this.reservasCanceladas = []
    }

    toString(){
        return "Nombre: " + this.nombre + " | Dirección: " + this.direccion + " | Tamaño: fútbol " + this.tamanio + 
        " | Horarios de atención: de " + this.horariosAtencion[0] + " a " + this.horariosAtencion[1];
    }

    setCalendario2023(horarioActivo){
        let cantMeses = 12;
        let meses = [];
        for (let i = 0; i < cantMeses; i++){
            meses.push([]);
        }
        //Se llena cada una de las 12 posiciones con días (un día es un array de horas), según la cantidad de días de cada mes.

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

        //Se llena cada uno de los días (arrays de horas) con horas, según el horario de atención definido.
        for (let i = 0; i < meses.length; i++){
            for (let j = 0; j < meses[i].length; j++){
                this.setDia(meses[i][j],horarioActivo);
            }
        }

        return meses;
    }

    setDia(dia,horarioActivo){
        for (let i = 0; i < (horarioActivo[1]); i++){
            dia.push(new Horario((horarioActivo[0] + (i*100))));
        }
    }

    numHoraToPosision(numHora){
        return (numHora - this.horariosAtencion[0]) / 100;
    }

    horaActiva(numHora){
        return (numHora >= this.horariosAtencion[0] && numHora <= this.ultimaHoraActiva);
    }

    otorgarReserva(mes, dia, numHora, titular){
        if(this.horaActiva(numHora)){
            let nuevaReserva = this.calendario2023[mes][dia][this.numHoraToPosision(numHora)].reservar(mes, dia, numHora, titular, this);
            if(nuevaReserva !== null){
                titular.reservas.push(nuevaReserva);
                console.log("Se ha registrado su reserva.");
            } else {
                console.log("No se ha podido efectuar su reserva porque la cancha ya está reservada en ese horario.");
            }
        } else {
            console.log("Esta cancha no abre en la hora solicitada.");
        }
    }

    desocuparHorario(mes, dia, numHora){
        this.calendario2023[mes][dia][this.numHoraToPosision(numHora)].reserva = null;
    }

    cancelarReserva(mes, dia, numHora, titular){
        // No se está contemplando la posibilidad de que el usuario se cree una reserva por su parte, ya que aquí una
        // reserva existe sí o sí en ambos arrays, el de la cancha y el del usuario.
        if(this.horaActiva(numHora)){
            let horario = this.calendario2023[mes][dia][this.numHoraToPosision(numHora)];
            if(!horario.estaDisponible()){
                if(horario.reserva.titular == titular){
//                  titular.reservas = titular.reservas.filter(reserva => reserva.id != horario.reserva.id);
                    this.reservasCanceladas.push(horario.reserva);
                    horario.reserva.cancelarReserva();
                    this.desocuparHorario(mes, dia, numHora);
                } else {
                    console.log("Usted no es el titular de la reserva, por lo que no puede cancelarla.");
                }
            } else {
                console.log("No hay reserva para las " + numHora + ". La cancha está disponible a esa hora.");
            }
        } else {
            console.log("No existe reserva para las " + numHora + " porque la cancha no atiende a esa hora.");
        }
    }

    getDisponibilidad(mes, dia, horaInicio = 0, horaFin = 2300){
        const horariosDisponibles = [];
        // Hay que chequear que exista al menos una hora de disponibilidad, por lo que evaluamos si el fin del horario
        // de interés es más tarde que mi hora de apertura, o si el comienzo del horario de interés es más temprano que
        // la hora de cierre.
        if(horaFin >= this.horariosAtencion[0] || horaInicio <= this.ultimaHoraActiva){
            let horaComunInicio;
            let horaComunFin;
            if(horaInicio >= this.horariosAtencion[0]){
                horaComunInicio = horaInicio;
            } else {
                horaComunInicio = this.horariosAtencion[0];
            }
            if(horaFin <= this.ultimaHoraActiva){
                horaComunFin = horaFin;
            } else {
                horaComunFin = this.ultimaHoraActiva;
            }

            for (let i = this.numHoraToPosision(horaComunInicio); i <= this.numHoraToPosision(horaComunFin); i++) {
                if(this.calendario2023[mes][dia][i].estaDisponible()){
                    horariosDisponibles.push(this.calendario2023[mes][dia][i]);
                }
            }

            if (horariosDisponibles.length == 0){
                console.log("La cancha no está disponible en ese rango horario.");
            }
        } else {
            console.log("La cancha no está abierta en ese rango horario.");
        }
        return horariosDisponibles;
    }

    listarDisponibilidad(mes, dia, horaInicio = 0, horaFin = 2300){
        const disponibilidad = this.getDisponibilidad(mes, dia, horaInicio, horaFin);
        if(disponibilidad.length != 0){
            for(let i = 0; i < disponibilidad.length; i++){
                console.log(disponibilidad[i].numHora);
            }
        }
    }

    tieneDisponibilidad(mes, dia, hora){
        if(this.horaActiva(hora)){
            return this.calendario2023[mes][dia][this.numHoraToPosision(hora)].estaDisponible();
        } else {
            return false;
        }
    }
};

module.exports = Cancha;