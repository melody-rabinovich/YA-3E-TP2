
const { HorarioAtencion } = require("../models/cancha");
const { Tamanios } = require("../models/cancha");
const { Cancha } = require("../models/cancha");
const { Reserva } = require("../models/reserva");
const usuarioService = require("../services/usuarioService");
const canchaData = require("../data/canchaData");
const usuarioData = require("../data/usuarioData");
const reservaData = require("../data/reservaData");

async function getCanchas() {
  try {
    const canchasConCalendario = await canchaData.getCanchas();
    const canchasSinCalendario = await removerCalendarioDeCanchas(canchasConCalendario);
    return canchasSinCalendario;
  } catch (error) {
    throw error;
  }
}

async function getCanchaById(id) {
  try {
    await checkCancha(id);

    const canchaConCalendario = await canchaData.getCanchaById(id);
    const canchaSinCalendario = await removerCalendarioDeCancha(canchaConCalendario);
    return canchaSinCalendario;
  } catch (error) {
    throw error;
  }
}

async function crearCancha(numero, nombre, tamanio, precio) {
  try {
    await checkNumeroExistente(numero);
    await checkNombreExistente(nombre);
    await checkTamanio(tamanio);

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
    const cancha = await checkCancha(idCancha);
    await usuarioService.checkUsuario(idUsuario);
    await checkOcupada(mes, dia, hora, cancha);

    const reserva = new Reserva(mes, dia, hora, idUsuario, idCancha);
    const result = await reservaData.crearReserva(reserva);
    await canchaData.registrarReserva(reserva, result.insertedId);
    await usuarioData.registrarReserva(reserva, result.insertedId);
    return result;
  } catch (error) {
    throw error;
  }
}

async function getMisReservas(idCancha) {
  try {
    const cancha = await checkCancha(idCancha);

    const reservas = await canchaData.getMisReservas(cancha);
    return reservas;
  } catch (error) {
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
    await checkReservaCancelada(idReserva);
  
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

async function checkReservaCancelada(idReserva) {
  const estaCancelada = await reservaData.estaCancelada(idReserva);
  if (estaCancelada) {
    throw new Error("La reserva ya está cancelada.");
  }
}

async function removerCalendarioDeCancha(canchaConCalendario) {
    let { calendario2023, ...canchaSinCalendario } = canchaConCalendario;
    return canchaSinCalendario;
}

async function removerCalendarioDeCanchas(canchasConCalendario) {
  let canchasSinCalendario = await canchasConCalendario.map(({ _id, numero, nombre, tamanio, precio, ...resto }) => {
    return { _id, numero, nombre, tamanio, precio }
  });
  return canchasSinCalendario;
}

async function checkNumeroExistente(numero) {
  const existeNumero = await canchaData.numeroExistente(numero);
  if (existeNumero) {
    throw new Error("El número ya está registrado.");
  }
}

async function checkNombreExistente(nombre) {
  const existeNombre = await canchaData.nombreExistente(nombre);
  if (existeNombre) {
    throw new Error("El nombre ya está registrado.");
  }
}

async function checkTamanio(tamanio) {
  const tamanios = await Object.keys(Tamanios).map(key => Tamanios[key]);
  let tamanioValido = false;
  let i = 0;

  while (tamanioValido == false && i < tamanios.length){
    if(tamanio == tamanios[i]) {
      tamanioValido = true;
    } else {
      i++
    }
  }

  if (!tamanioValido) {
    throw new Error("El tamaño ingresado no es válido.");
  }
};

module.exports = {
  getCanchas,
  getCanchaById,
  crearCancha,
  getDisponibilidadPorDia,
  crearReserva,
  getMisReservas,
  cancelarReserva,
  cancelarReservaConfirmed,
  checkHorarioAtencion,
};
