
const { Cancha } = require("../models/cancha");
const { Reserva } = require("../models/reserva");
const canchaData = require("../data/canchaData");
const usuarioData = require("../data/usuarioData");
const reservaData = require("../data/reservaData");

async function getCanchas(res) {
  try {
    const canchas = await canchaData.getCanchas();
    return canchas;
  } catch (error) {
    console.log("Error al obtener las canchas", error);
    throw error;
  }
}

async function getCanchaById(id) {
  try {
    const cancha = await canchaData.getCanchaById(id);
    return cancha;
  } catch (error) {
    console.log(`Error al obtener la cancha con id: ${id}`, error);
    throw error;
  }
}

const crearCancha = async (body) => {
  const cancha = new Cancha(
    body.numero,
    body.nombre,
    body.tamanio,
    body.precio,
  );

  const canchaInsertada = await canchaData.insertarCancha(cancha);

  return canchaInsertada;
};

async function getDisponibilidadPorDia(idCancha, mes, dia) {
  const cancha = await canchaData.getCanchaById(idCancha);
  if (!cancha) {
    throw new Error("La cancha no existe.");
  }

  const disponibilidad = await canchaData.getDisponibilidadPorDia(cancha, mes, dia);
  return disponibilidad;
}

async function crearReserva(fecha, hora, idUsuario, idCancha) {
  const tipoDate = new Date(fecha);
  const mes = tipoDate.getMonth();
  const dia = tipoDate.getDate() - 1;

  const cancha = await canchaData.getCanchaById(idCancha);
  if (!cancha) {
    throw new Error("La cancha no existe.");
  }

  const usuario = await usuarioData.getUsuarioById(idUsuario);
  if (!usuario) {
    throw new Error("El usuario no existe.");
  }

  const estaOcupada = await canchaData.estaOcupada(mes, dia, hora, cancha);
  if (estaOcupada) {
    throw new Error("La cancha está ocupada a esa hora.");
  }

  try {
    const reserva = new Reserva(tipoDate, hora, idUsuario, idCancha);
    const result = await reservaData.crearReserva(reserva);
    await canchaData.registrarReserva(reserva, result.insertedId);
    await usuarioData.registrarReserva(reserva, result.insertedId);
    return result;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  crearCancha,
  getCanchas,
  getCanchaById,
  getDisponibilidadPorDia,
  crearReserva,
};
