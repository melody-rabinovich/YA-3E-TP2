const { MongoClient } = require("mongodb");

const uri =
  "mongodb+srv://lucasalonso42:Mongo123@cluster0.rdzncw3.mongodb.net/?retryWrites=true&w=majority";

let cliente;
async function conectar() {
  try {
    cliente = new MongoClient(uri);
    await cliente.connect();
    console.log("Conexión exitosa a MongoDB");
  } catch (error) {
    console.error("Error al conectar a MongoDB", error);
  }
}
function obtenerCliente() {
  return cliente;
}

module.exports = {
  conectar,
  obtenerCliente,
};
