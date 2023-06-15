//Importamos el modelo de Cancha
const Cancha = require("../models/cancha");
const canchaData = require("../data/cancha");

const crearCancha = async (body) => {
  const cancha = new Cancha(
    body.nombre,
    body.tamanio,
    body.precio,
    body.horarioAtencion
  );

  console.log("Estoy " + cancha);

  const canchaInsertada = await canchaData.insertarCancha(cancha);
  console.log(canchaInsertada);

  return canchaInsertada;
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
