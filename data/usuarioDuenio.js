const { obtenerCliente } = require("../database");

const insertarUsuarioDuenio = async (duenio) => {
  console.log("Estoy en insertar usuarioDuenio");

  const cliente = obtenerCliente();
  const collection = cliente.db("mydatabase").collection("mycollection");

  try {
    console.log(JSON.stringify(duenio));

    const result = await collection.insertOne(duenio);
    console.log("Duenio insertado con éxito: ", result.insertedId);
  } catch (error) {
    console.error("Error al insertar al duenio", error);
  }
};

const traerTodos = async () => {
  console.log("Estoy trayendo todos los usuarios");

  const cliente = obtenerCliente();

  const collection = cliente.db("mydatabase").collection("mycollection");

  try {
    const documentos = await collection.find({}).toArray();
    return documentos;
  } catch (error) {
    console.log("Error al traer a los duenios", error);

    res.status(500).json({ error: "Ocurrio un error al obtener los usuarios" });
  }
};

module.exports = {
  insertarUsuarioDuenio,
  traerTodos,
};
