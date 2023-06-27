
const { HorarioAtencion } = require("../models/cancha");
const { Cancha } = require("../models/cancha");
const { Reserva } = require("../models/reserva");
const usuarioService = require("../services/usuarioService");
const canchaData = require("../data/canchaData");
const usuarioData = require("../data/usuarioData");
const reservaData = require("../data/reservaData");

async function getCanchas() {
  try {
    const canchas = await canchaData.getCanchas();
    return canchas;
  } catch (error) {
    console.log("Error al obtener las canchas.", error);
    throw error;
  }
}

async function getCanchaById(id) {
  try {
    const cancha = await canchaData.getCanchaById(id);
    return cancha;
  } catch (error) {
    console.log(`Error al obtener la cancha con id: ${id}.`, error);
    throw error;
  }
}

async function crearCancha(numero, nombre, tamanio, precio) {
  try {
    await canchaData.validarNumero(numero);
    await canchaData.validarNombre(nombre);
    await canchaData.validarTamanio(tamanio);

    const cancha = new Cancha(numero, nombre, tamanio, precio);
    const canchaInsertada = await canchaData.insertarCancha(cancha);  
    return canchaInsertada;
    } catch (error) {
    throw error;
  }

};

async function getDisponibilidadPorDia(mes, dia, idCancha) {
  const cancha = await checkCancha(idCancha);

  const disponibilidad = await canchaData.getDisponibilidadPorDia(mes, dia, cancha);
  return disponibilidad;
}

async function crearReserva(mes, dia, hora, idUsuario, idCancha) {
  try {
    const cancha = await canchaData.checkCancha(idCancha);
    await usuarioData.checkUsuario(idUsuario);
    await checkHorarioAtencion(hora);
    await checkOcupada(mes, dia, hora, cancha);

    const reserva = new Reserva(mes, dia, hora, idUsuario, idCancha);
    const result = await reservaData.crearReserva(reserva);
    await canchaData.registrarReserva(reserva, result.insertedId);
    await usuarioData.registrarReserva(reserva, result.insertedId);
    return result;
  } catch (error) {
    console.log(`Error al crear la reserva.`, error);
    throw error;
  }
}

async function getMisReservas(idCancha) {
  try {
    const cancha = await checkCancha(idCancha);

    const reservas = await canchaData.getMisReservas(cancha);
    return reservas;
  } catch (error) {
    console.log(`Error al obtener las reservas de la cancha número ${idCancha}.`, error);
    throw error;
  }
}

async function cancelarReservaConfirmed(idReserva) {
  try {
    const result = await reservaData.cancelarReserva(idReserva);
    return result;
  } catch (error) {
    throw error;
  }
}

async function cancelarReserva(mes, dia, idCancha, idReserva) {
  try {
    const cancha = await checkCancha(idCancha);
    await checkReservaRegistrada(mes, dia, cancha, idReserva);
  
    const result = await cancelarReservaConfirmed(idReserva);
    return result;
  } catch (error) {
    throw error;
  }
}

async function checkCancha(idCancha) {
  const cancha = await canchaData.getCanchaById(idCancha);
  if (!cancha) {
    throw new Error("La cancha no existe.");
  }
  return cancha;
}

async function checkHorarioAtencion(hora) {
  if (hora < HorarioAtencion.Apertura || hora >= HorarioAtencion.Cierre) {
    throw new Error("La cancha no abre a esa hora.");
  }
};

async function checkOcupada(mes, dia, hora, cancha) {
  const estaOcupada = await canchaData.estaOcupada(mes, dia, hora, cancha);
  if (estaOcupada) {
    throw new Error("La cancha está ocupada a esa hora.");
  }
}

async function checkReservaRegistrada(mes, dia, cancha, idReserva) {
  const reservaRegistrada = await canchaData.tieneEstaReserva(mes, dia, cancha, idReserva);
  if (!reservaRegistrada) {
    throw new Error("La reserva no está registrada en esta cancha.");
  }
}

module.exports = {
  getCanchas,
  getCanchaById,
  crearCancha,
  getDisponibilidadPorDia,
  crearReserva,
  getMisReservas,
  cancelarReserva,
  cancelarReservaConfirmed,
};
