
const canchaService = require("../services/canchaService");

function checkBodyNumero(numero) {
  if (numero == undefined) {
    throw new Error("No se insertó el numero, inténtelo nuevamente.");
  }
}

function checkBodyNombre(nombre) {
  if (nombre == undefined) {
    throw new Error("No se insertó el nombre, inténtelo nuevamente.");
  }
}

function checkBodyTamanio(tamanio) {
  if (tamanio == undefined) {
    throw new Error("No se insertó el tamaño, inténtelo nuevamente.");
  }
}

function checkBodyPrecio(precio) {
  if (precio == undefined) {
    throw new Error("No se insertó el precio, inténtelo nuevamente.");
  }
}

function checkMesDia(mes, dia) {
  if (mes == undefined || isNaN(mes) || mes < 1 || mes > 12) {
    throw new Error("No se ingresó un mes válido, inténtelo nuevamente.");
  } else if (dia == undefined || isNaN(dia) || dia < 1 || (mes == 2 && dia > 28) || ((mes == 1 || mes == 3 || mes == 5 || mes == 7 || mes == 8 || mes == 10 || mes == 12) && dia > 31) || ((mes == 4 || mes == 6 || mes == 9 || mes == 11) && dia > 30)) {
    throw new Error("No se ingresó un día válido, inténtelo nuevamente.");
  }
}

async function checkHora(hora) {
  if (hora == undefined || isNaN(hora)) {
    throw new Error("No se ingresó una hora válida, inténtelo nuevamente.");
  } else {
    await canchaService.checkHorarioAtencion(hora);
  }
}

module.exports = {
  checkBodyNumero,
  checkBodyNombre,
  checkBodyTamanio,
  checkBodyPrecio,
  checkMesDia,
  checkHora,
};
