
const ObjectId = require("mongodb").ObjectId;
const { EstadoReserva } = require("../models/reserva");
const { obtenerCliente } = require("../database");

const getReservas = async () => {
  const cliente = obtenerCliente();
  const collection = cliente.db("mydatabase").collection("reservas");

  try {
    const documentos = await collection.find({}).toArray();
    return documentos;
  } catch (error) {
    console.log("Error al traer a las reservas.", error);
    throw error;
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
    throw error;
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
    throw error;
  }
};

const cancelarReserva = async (idReserva) => {
  const cliente = obtenerCliente();
  const collection = cliente.db("mydatabase").collection("reservas");

  try {
    const filter = { _id: new ObjectId(idReserva) };
    const update = { $set: { estado: EstadoReserva.Cancelada } };
    const result = await collection.updateOne(filter, update);
    return result;
  } catch (error) {
    console.log("Error al cambiar el estado de la reserva.", error);
    throw error;
  }
}

const estaCancelada = async (idReserva) => {
  try {
    const reserva = await getReservaById(idReserva);
    return reserva.estado == EstadoReserva.Cancelada; //Devuelve true si la reserva está cancelada, false si no lo está
  } catch (error) {
    console.log("Error al revisar si la reserva está cancelada.", error);
    throw error;
  }
}

module.exports = {
  getReservas,
  getReservaById,
  crearReserva,
  cancelarReserva,
  estaCancelada,
};
