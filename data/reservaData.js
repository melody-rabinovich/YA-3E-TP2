
const ObjectId = require("mongodb").ObjectId;
const { EstadoReserva } = require("../models/reserva.js");
const { obtenerCliente } = require("../database");
const usuarioData = require("./usuarioData.js");

const getReservas = async () => {
  console.log("Estoy trayendo todas las reservas.");

  const cliente = obtenerCliente();
  const collection = cliente.db("mydatabase").collection("reservas");

  try {
    const documentos = await collection.find({}).toArray();
    return documentos;
  } catch (error) {
    console.log("Error al traer a las reservas.", error);

    res.status(500).json({ error: "Ocurrió un error al obtener las reservas." });
  }
};

const getReservaById = async (id) => {
  const cliente = obtenerCliente();
  const collection = cliente.db("mydatabase").collection("reservas");

  try {
    const reserva = await collection.findOne({ _id: new ObjectId(id) });
    return reserva;
  } catch (error) {
    console.log("Error al traer a la reserva.", error);
  }
};

const crearReserva = async (reserva) => {
  const cliente = obtenerCliente();
  const collection = cliente.db("mydatabase").collection("reservas");

  try {
    const result = await collection.insertOne(reserva);
    return result;
  } catch (error) {
    console.error("Error al insertar la reserva.", error);
  }
};

const cancelarReserva = async (idReserva) => {
  const cliente = obtenerCliente();
  const collection = cliente.db("mydatabase").collection("reservas");

  const reserva = await getReservaById(idReserva);
  if (reserva.estado == EstadoReserva.Cancelada) {
    throw new Error("Error: la reserva ya está cancelada.");
  }

  try {
    const filter = { _id: new ObjectId(reserva._id) };
    const update = { $set: { estado: EstadoReserva.Cancelada } };
    const result = await collection.updateOne(filter, update);
    return result;
  } catch (error) {
    console.log("Error al cambiar el estado de la reserva.", error);
    throw error;
  }
}

module.exports = {
  getReservas,
  getReservaById,
  crearReserva,
  cancelarReserva,
};
