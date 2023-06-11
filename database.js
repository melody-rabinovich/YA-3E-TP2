const MongoClient = require("mongodb").MongoClient;

const uri =
  "mongodb+srv://lucasalonso42:Mongo123@cluster0.rdzncw3.mongodb.net/?retryWrites=true&w=majority";

async function conectar() {
  try {
    await MongoClient.connect(uri);
    console.log("Conexión exitosa a MongoDB");
  } catch (error) {
    console.error("Error al conectar a MongoDB", error);
  }
}

module.exports = {
  conectar,
};
