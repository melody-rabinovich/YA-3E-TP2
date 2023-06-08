//Importamos el modelo de Cancha
const Cancha = require('../models/cancha');

const crearCancha = async(request,response) =>{
    const {nombre, direccion,tamanio, precio, horariosDeAtencion}= request.body;

    const cancha = new Cancha({nombre, direccion, tamanio, precio,horariosDeAtencion});

    response.status(201).json({cancha});
}

module.exports = {crearCancha};
