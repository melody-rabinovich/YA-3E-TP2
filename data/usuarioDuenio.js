const obtenerCliente = require("../database");

const insertarUsuarioDuenio = async (duenio) => {
  console.log("Estoy en insertar usuarioDuenio");

  const cliente = obtenerCliente();
  const collection = cliente.db().collection("usuariosDuenios");

  try {
    const result = await collection.insertOne(duenio);
    console.log("Duenio insertado con éxito: ", result.insertedId);
  } catch (error) {
    console.error("Error al insertar al duenio", error);
  }
};

module.exports = {
  insertarUsuarioDuenio,
};
