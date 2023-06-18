
const ObjectId = require("mongodb").ObjectId;
const { obtenerCliente } = require("../database");
const reservaData = require("./reservaData.js");

const getUsuarios = async () => {
  console.log("Estoy trayendo todos los usuarios");

  const cliente = obtenerCliente();
  const collection = cliente.db("mydatabase").collection("usuarios");

  try {
    const documentos = await collection.find({}).toArray();
    return documentos;
  } catch (error) {
    console.log("Error al traer a los usuarios", error);
  }
};

const getUsuarioById = async (id) => {
  const cliente = obtenerCliente();
  const collection = cliente.db("mydatabase").collection("usuarios");

  try {
    const usuario = await collection.findOne({ _id: new ObjectId(id) });
    return usuario;
  } catch (error) {
    console.log("Error al traer al usuario", error);
  }
};

const insertarUsuario = async (usuario) => {
  const cliente = obtenerCliente();
  const collection = cliente.db("mydatabase").collection("usuarios");

  try {
    const result = await collection.insertOne(usuario);
    console.log("Usuario insertado con éxito: ", result.insertedId);
  } catch (error) {
    console.error("Error al insertar al usuario", error);
  }
};

const validarMail = async (mail) => {
  const cliente = obtenerCliente();
  const collection = cliente.db("mydatabase").collection("usuarios");

  try {
    const usuario = await collection.findOne({ mail: mail });
    return usuario !== null; //Devuelve true si el usuario existe, false si no existe
  } catch (error) {
    console.log("Error al validar el correo electronico", error);
    throw error;
  }
};

const cambiarNombre = async (mail, nuevoNombre) => {
  const cliente = obtenerCliente();
  const collection = cliente.db("mydatabase").collection("usuarios");

  try {
    //const usuario = await getUsuarioId(id);
    collection.updateOne(
      { mail: mail },
      {$set:
        {nombre: nuevoNombre}
      }
    )
  } catch (error) {
    console.log("Error al cambiar el nombre", error);
  }
};

const registrarReserva = async (reserva, insertedId) => {
  const cliente = obtenerCliente();
  const collection = cliente.db("mydatabase").collection("usuarios");

  try {
    const filter = { _id: new ObjectId(reserva.idUsuario) };
    const update = { $push: { reservas: insertedId } };
    const result = await collection.updateOne(filter, update);
    return result;
  } catch (error) {
    console.log("Error al generar la reserva", error);
  }
}

module.exports = {
  insertarUsuario,
  getUsuarios,
  getUsuarioById,
  validarMail,
  cambiarNombre,
  registrarReserva,
};
