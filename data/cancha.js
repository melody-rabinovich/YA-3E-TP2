const { obtenerCliente } = require("../database");

const traerTodos = async () => {
  console.log("Estoy trayendo todas las canchas");

  const cliente = obtenerCliente();
  const collection = cliente.db("mydatabase").collection("canchas");

  try {
    const documentos = await collection.find({}).toArray();
    return documentos;
  } catch (error) {
    console.log("Error al traer a las canchas", error);

    res.status(500).json({ error: "Ocurrio un error al obtener las canchas" });
  }
};

const insertarCancha = async (cancha) => {
  const cliente = obtenerCliente();
  const collection = cliente.db("mydatabase").collection("canchas");

  try {
    const result = await collection.insertOne(cancha);
    console.log("Cancha insertada con éxito: ", result.insertedId);
  } catch (error) {
    console.error("Error al insertar la cancha", error);
  }
};

module.exports = { traerTodos, insertarCancha };
