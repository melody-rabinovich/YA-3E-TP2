//Importamos el modelo de Cancha
const Cancha = require("../models/cancha");
const canchaData = require("../data/cancha");

const crearCancha = async (request, response) => {
  const { nombre, direccion, tamanio, precio, horariosAtencion } = request.body;

  const cancha = new Cancha(
    nombre,
    direccion,
    tamanio,
    precio,
    horariosAtencion
  );

  response.status(201).json({ cancha });
};

async function getCanchas(res) {
  try {
    const canchas = await canchaData.traerTodos();
    return canchas;
  } catch (error) {
    console.log("Error al obtener las canchas", error);
    throw error;
  }
}

module.exports = { crearCancha, getCanchas };
