const ObjectId = require("mongodb").ObjectId;
const { obtenerCliente } = require("../database");
const usuarioData = require("./usuarioData.js");

const getReservas = async () => {
  console.log("Estoy trayendo todas las reservas");

  const cliente = obtenerCliente();
  const collection = cliente.db("mydatabase").collection("reservas");

  try {
    const documentos = await collection.find({}).toArray();
    return documentos;
  } catch (error) {
    console.log("Error al traer a las reservas", error);

    res.status(500).json({ error: "Ocurrio un error al obtener las reservas" });
  }
};

const getReservaById = async (id) => {
  const cliente = obtenerCliente();
  const collection = cliente.db("mydatabase").collection("reservas");

  try {
    const cancha = await collection.findOne({ _id: new ObjectId(id) });
    //cancha.calendario2023 = cancha.calendario2023.filter(reserva => reserva.id != horario.reserva.id);
    return cancha;
  } catch (error) {
    console.log("Error al traer a la reserva", error);
  }
};

const crearReserva = async (reserva) => {
  const cliente = obtenerCliente();
  const collection = cliente.db("mydatabase").collection("reservas");

  try {
    const result = await collection.insertOne(reserva);
    console.log("Reserva insertada con éxito: ", result.insertedId);
    return result;
  } catch (error) {
    console.error("Error al insertar la reserva", error);
  }
};

module.exports = {
  getReservas,
  getReservaById,
  crearReserva
};
