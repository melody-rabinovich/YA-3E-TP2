const ObjectId = require("mongodb").ObjectId;
const { obtenerCliente } = require("../database");

const insertarUsuarioDuenio = async (duenio) => {
  const cliente = obtenerCliente();
  const collection = cliente.db("mydatabase").collection("usuarios");

  try {
    const result = await collection.insertOne(duenio);
    console.log("Duenio insertado con éxito: ", result.insertedId);
  } catch (error) {
    console.error("Error al insertar al duenio", error);
  }
};

const traerTodos = async () => {
  console.log("Estoy trayendo todos los usuarios");

  const cliente = obtenerCliente();
  const collection = cliente.db("mydatabase").collection("usuarios");

  try {
    const documentos = await collection.find({}).toArray();
    return documentos;
  } catch (error) {
    console.log("Error al traer a los duenios", error);
  }
};

const traerUsuarioId = async (id) => {
  const cliente = obtenerCliente();
  const collection = cliente.db("mydatabase").collection("usuarios");

  try {
    const user = await collection.findOne({ _id: new ObjectId(id) });
    return user;
  } catch (error) {
    console.log("Error al traer a los duenios", error);
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

module.exports = {
  insertarUsuarioDuenio,
  traerTodos,
  traerUsuarioId,
  validarMail,
};
