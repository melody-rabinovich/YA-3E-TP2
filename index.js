class Cancha {
    constructor(nombre, direccion, tamanio){
        this.nombre = nombre,
        this.direccion = direccion,
        this.tamanio = tamanio,
        this.calendario2023 = this.setCalendario2023()
    }

    setCalendario2023(){
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
                this.setDia(meses[i][j]);
            }
        }

        return meses;
    }

    setDia(dia){
        for (let i = 0; i < 10; i++){
            dia.push(new Hora((1400 + (i*100)),this.tamanio*2));
        }
    }

    numHoraToPosision(numHora){
        return (numHora - 1400) / 100;
    }

    otorgarReserva(mes, dia, numHora, cantJugadores){
        if(this.calendario2023[mes][dia][this.numHoraToPosision(numHora)].reservar(cantJugadores)){
            console.log("Se ha registrado su reserva.");
        } else {
            console.log("No hay suficiente disponibilidad para efectuar su reserva.")
        }
    }
}

class Hora {
    constructor(numHora, disponibilidad){
        this.numHora = numHora,
        this.disponibilidad = disponibilidad,
        this.reservas = []
    }

    hayDisponibilidad(cantJugadores){
        return this.disponibilidad >= cantJugadores;
    }

    reservar(cantJugadores){
        let hayDisponibilidad = this.hayDisponibilidad(cantJugadores);
        if (hayDisponibilidad){
            this.disponibilidad -= cantJugadores;
        }
        return hayDisponibilidad;
    }
}

class Usuario {
    constructor(nombre){
        this.nombre = nombre,
        this.reservas = []
    }

    reservar(reserva){
        this.reservas.push(reserva);
    }
}

class Reserva {
    constructor(titular, cantidadJugadores, horaInicio){
        this.titular = titular,
        this.cantidadJugadores = cantidadJugadores,
        this.horaInicio = horaInicio
    }
}

let cancha = new Cancha("El último 10", "Av. Mitre 1234, Caseros", 5);
cancha.otorgarReserva(0,0,1400,11);
cancha.otorgarReserva(0,0,1400,1);