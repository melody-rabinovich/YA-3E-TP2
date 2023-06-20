const { MongoClient } = require("mongodb");
require('dotenv').config();

//Base de datos de Lucas
//const uri = "mongodb+srv://lucasalonso42:Mongo123@cluster0.rdzncw3.mongodb.net/?retryWrites=true&w=majority";

//Base de datos de Ivan
const uri = "mongodb+srv://ivanbeltram:gIkTk9RYiYWZllOj@cluster0.cyh8yco.mongodb.net/?retryWrites=true&w=majority";

//Conexión con datos de .env
//const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.cyh8yco.mongodb.net/?retryWrites=true&w=majority`;

let cliente;
async function conectar() {
  try {
    cliente = new MongoClient(uri);
    await cliente.connect();
  } catch (error) {
    console.error("Error al conectar a MongoDB", error);
    throw error;
  }
}
function obtenerCliente() {
  return cliente;
}

module.exports = {
  conectar,
  obtenerCliente,
};
