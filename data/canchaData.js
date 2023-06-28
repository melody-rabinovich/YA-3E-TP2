
const { obtenerCliente } = require("../database");
const { HorarioAtencion } = require("../models/cancha");
const { EstadoReserva } = require("../models/reserva");
const reservaData = require("./reservaData");

const getCanchas = async () => {
  const cliente = obtenerCliente();
  const collection = cliente.db("mydatabase").collection("canchas");

  try {
    const documentos = await collection.find({}).toArray();
    return documentos;
  } catch (error) {
    console.log("Error al traer a las canchas.", error);
    throw error;
  }
};

const getCanchaById = async (id) => {
  const cliente = obtenerCliente();
  const collection = cliente.db("mydatabase").collection("canchas");

  try {
    const cancha = await collection.findOne({ numero: id });
    return cancha;
  } catch (error) {
    console.log("Error al traer a la cancha.", error);
    throw error;
  }
};

const insertarCancha = async (cancha) => {
  const cliente = obtenerCliente();
  const collection = cliente.db("mydatabase").collection("canchas");

  try {
    const result = await collection.insertOne(cancha);
    return result;
  } catch (error) {
    console.error("Error al insertar la cancha.", error);
    throw error;
  }
};

const numeroExistente = async (numero) => {
  const cliente = obtenerCliente();
  const collection = cliente.db("mydatabase").collection("canchas");

  try {
    const cancha = await collection.findOne({ numero: numero });
    return cancha != null; //Devuelve true si el número está registrado, false si no lo está
  } catch (error) {
    console.log("Error al revisar la existencia del número de la cancha.", error);
    throw error;
  }
};

const nombreExistente = async (nombre) => {
  const cliente = obtenerCliente();
  const collection = cliente.db("mydatabase").collection("canchas");

  try {
    const cancha = await collection.findOne({ nombre: nombre });
    return cancha != null; //Devuelve true si el número está registrado, false si no lo está
  } catch (error) {
    console.log("Error al revisar la existencia del nombre de la cancha.", error);
    throw error;
  }
};

const getDisponibilidadPorDia = async (mes, dia, cancha) => {
  try{
//  Es bonito, prolijo, corto, legible, pero es MUY LENTO
/*
    let disponibilidad = [];
    for(let i = 0; i < 24; i++){
      if (!await estaOcupada(mes, dia, i, cancha)){
        disponibilidad.push(i);
      }
    }
*/
//  De esta forma me pasa de 34 segundos y medio, a 1 segundo y medio
    let disponibilidad = [];
    for(let i = HorarioAtencion.Apertura; i < HorarioAtencion.Cierre; i++){
      disponibilidad.push(i);
    }

    for(let i = 0; i < cancha.calendario2023[mes][dia].reservas.length; i++){
      let reserva = await reservaData.getReservaById(cancha.calendario2023[mes][dia].reservas[i]);
      if (reserva.estado == EstadoReserva.Activa){
        disponibilidad = disponibilidad.filter(numero => numero != reserva.hora);
      }
    }
    return disponibilidad;
  } catch (error) {
    console.error("Error al calcular la disponibilidad por día.", error);
    throw error;
  }
};

const getMisReservasPorDia = async (mes, dia, cancha) => {
  const cliente = obtenerCliente();
  const collection = cliente.db("mydatabase").collection("reservas");
  let reservas = [];

  try {
    for (let i = 0; i < cancha.calendario2023[mes][dia].reservas.length; i++){
      let reserva = await collection.findOne({ _id: cancha.calendario2023[mes][dia].reservas[i] })
      reservas.push(reserva);
    }
    return reservas;
  } catch (error) {
    console.log("Error al traer las reservas de la cancha.", error);
    throw error;
  }
};

const estaOcupada = async (mes, dia, hora, cancha) => {
  const reservas = await getMisReservasPorDia(mes, dia, cancha);

  try {
    let reservaEncontrada = await reservas.find(r => r.hora == hora && r.estado == EstadoReserva.Activa);
    return reservaEncontrada != null; //Devuelve true si la reserva existe, false si no existe
  } catch (error) {
    console.log("Error al validar si la cancha está ocupada.", error);
    throw error;
  }
};

const registrarReserva = async (reserva, insertedId) => {
  const cliente = obtenerCliente();
  const collection = cliente.db("mydatabase").collection("canchas");

  try {
    const mes = reserva.mes;
    const dia = reserva.dia;
  
    const filter = { numero: reserva.idCancha };
    const update = { $push: { [`calendario2023.${mes}.${dia}.reservas`]: insertedId } };
    const result = await collection.updateOne(filter, update);
    return result;
  } catch (error) {
    console.log("Error al generar la reserva.", error);
    throw error;
  }
};

const tieneEstaReserva = async (mes, dia, cancha, idReserva) => {
  try {
    let reservaEncontrada = await cancha.calendario2023[mes][dia].reservas.find(r_id => r_id == idReserva);
    return reservaEncontrada != null; //Devuelve true si la reserva existe, false si no existe
  } catch (error) {
    console.log("Error al averiguar si la cancha " + cancha.numero + " tiene la reserva " + idReserva + ".", error);
    throw error;
  }
};

const getMisReservas = async (cancha) => {
  let reservas = [];

  try {
    for (let mes = 0; mes < cancha.calendario2023.length; mes++){
      for (let dia = 0; dia < cancha.calendario2023[mes].length; dia++){
        let reservasDelDia = await getMisReservasPorDia(mes, dia, cancha);
        reservas.push(...reservasDelDia);
        }
    }
    return reservas;
  } catch (error) {
    console.log("Error al traer las reservas del usuario.", error);
    throw error;
  }
};

module.exports = {
  getCanchas,
  getCanchaById,
  insertarCancha,
  numeroExistente,
  nombreExistente,
  getDisponibilidadPorDia,
  getMisReservasPorDia,
  estaOcupada,
  registrarReserva,
  tieneEstaReserva,
  getMisReservas,
};
