
const ObjectId = require("mongodb").ObjectId;
const { obtenerCliente } = require("../database");
const reservaData = require("./reservaData.js");
const { Cancha } = require("../models/cancha");

const getCanchas = async () => {
  console.log("Estoy trayendo todas las canchas.");

  const cliente = obtenerCliente();
  const collection = cliente.db("mydatabase").collection("canchas");

  try {
    const documentos = await collection.find({}).toArray();
    return documentos;
  } catch (error) {
    console.log("Error al traer a las canchas", error);

    res.status(500).json({ error: "Ocurrio un error al obtener las canchas." });
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
  }
};

const insertarCancha = async (cancha) => {
  const cliente = obtenerCliente();
  const collection = cliente.db("mydatabase").collection("canchas");

  try {
    const result = await collection.insertOne(cancha);
    return result;
  } catch (error) {
    console.error("Error al insertar la cancha", error);
  }
};

const getDisponibilidadPorDia = async (cancha, mes, dia) => {
  let disponibilidad = [];
  for(let i = 0; i < 24; i++){
    disponibilidad.push(i);
  }

  try{
    for(let i = 0; i < cancha.calendario2023[mes][dia].reservas.length; i++){
      let horaReserva = (await reservaData.getReservaById(cancha.calendario2023[mes][dia].reservas[i])).hora;
      disponibilidad = disponibilidad.filter(numero => numero != horaReserva);
    }
    return disponibilidad;
  } catch (error) {
    console.error("Error al calcular la disponibilidad por día.", error);
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
    console.log("Error al traer las reservas de la cancha", error);
  }
};

const estaOcupada = async (mes, dia, hora, cancha) => {
  const reservas = await getMisReservasPorDia(mes, dia, cancha);

  try {
    let reservaEncontrada = null;
    let i = 0;

    while (reservaEncontrada == null && i < reservas.length){
      if(reservas[i].hora == hora){
        reservaEncontrada = reservas[i];
      }
      i++;
    }

    return reservaEncontrada !== null; //Devuelve true si el usuario existe, false si no existe
  } catch (error) {
    console.log("Error al validar si la cancha está ocupada", error);
    throw error;
  }
};

const registrarReserva = async (reserva, insertedId) => {
  const cliente = obtenerCliente();
  const collection = cliente.db("mydatabase").collection("canchas");

  try {
    const mes = reserva.fecha.getMonth();
    const dia = reserva.fecha.getDate() - 1;
  
    const filter = { numero: reserva.idCancha };
    const update = { $push: { [`calendario2023.${mes}.${dia}.reservas`]: insertedId } };
    const result = await collection.updateOne(filter, update);
    return result;
  } catch (error) {
    console.log("Error al generar la reserva", error);
  }
};

module.exports = {
  getCanchas,
  getCanchaById,
  insertarCancha,
  getDisponibilidadPorDia,
  getMisReservasPorDia,
  estaOcupada,
  registrarReserva,
};
