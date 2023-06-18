
const ObjectId = require("mongodb").ObjectId;
const { obtenerCliente } = require("../database");
const usuarioData = require("./usuarioData.js");

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
  registrarReserva
};
