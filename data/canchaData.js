
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

const getDisponibilidadPorDia = async (idCancha, mes, dia) => {
  let disponibilidad = [];
  for(let i = 0; i < 24; i++){
    disponibilidad.push(i);
  }

  const cancha = await getCanchaById(idCancha);
  
  if (!cancha) {
    throw new Error("La cancha no existe.");
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

const estaOcupada = async (mes, dia, hora, idCancha) => {
  const cliente = obtenerCliente();
  const collection = cliente.db("mydatabase").collection("canchas");

  try {
    const cancha = await collection.findOne({ numero: idCancha });
    const horaEncontrada = cancha.calendario2023[mes][dia].reservas.find(h => h == hora);
    return horaEncontrada !== null; //Devuelve true si el usuario existe, false si no existe
  } catch (error) {
    console.log("Error al validar el correo electronico", error);
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
  estaOcupada,
  registrarReserva,
};
