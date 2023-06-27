
const { Usuario } = require("../models/usuario.js");
const usuarioData = require("../data/usuarioData.js");
const canchaService = require("../services/canchaService");

async function getUsuarios() {
  try {
    const usuarios = await usuarioData.getUsuarios();
    return usuarios;
  } catch (error) {
    console.log(`Error al obtener los usuarios.`, error);
    throw error;
  }
}

async function getUsuarioById(id) {
  try {
    const usuario = await usuarioData.getUsuarioById(id);
    return usuario;
  } catch (error) {
    console.log(`Error al obtener el usuario con id: ${id}.`, error);
    throw error;
  }
}

async function crearUsuario(nombre, mail, password) {
  try {
    await checkMailExistente(mail);

    const usuario = new Usuario(nombre, mail, password);
    const usuarioInsertado = await usuarioData.insertarUsuario(usuario);
    return usuarioInsertado;
  } catch (error) {
    throw error;
  }
};

async function crearAdmin(nombre, mail, password) {
  try {
    const usuarioInsertado = await crearUsuario(nombre, mail, password);
    await usuarioData.setAdmin(mail);
    return usuarioInsertado;
  } catch (error) {
    throw error;
  }
};

async function cambiarNombre(idUsuario, mail, nombre) {
  try {
    await checkUsuario(idUsuario);

    const result = await usuarioData.cambiarNombre(mail, nombre)
    return result;
  } catch (error) {
    console.log(`Error al cambiar el nombre del usuario con mail ${mail}.`, error);
    throw error;
  }
};

async function getMisReservas(idUsuario) {
  try {
    const usuario = await checkUsuario(idUsuario);

    const reservas = await usuarioData.getMisReservas(usuario);
    return reservas;
  } catch (error) {
    console.log(`Error al obtener las reservas del usuario de id ${idUsuario}.`, error);
    throw error;
  }
}

async function cancelarReserva(idUsuario, idReserva) {
  try {
    const usuario = await checkUsuario(idUsuario);
    await checkReservaRegistrada(usuario, idReserva);
  
    const result = await canchaService.cancelarReservaConfirmed(idReserva);
    return result;
  } catch (error) {
    throw error;
  }
}

async function checkUsuario(idUsuario) {
  const usuario = await usuarioData.getUsuarioById(idUsuario);
  if (!usuario) {
    throw new Error("El usuario no existe.");
  }
  return usuario;
}

async function checkMailExistente(mail) {
  const mailExistente = await usuarioData.validarMail(mail);
  if (mailExistente) {
    throw new Error("El mail ya está registrado.");
  }
}

async function checkReservaRegistrada(usuario, idReserva) {
  const existeReserva = usuario.reservas.find(id => id == idReserva);
  if (!existeReserva) {
    throw new Error("El usuario no es titular de la reserva, por lo que no puede cancelarla.");
  }
}

module.exports = {
  getUsuarios,
  getUsuarioById,
  crearUsuario,
  crearAdmin,
  cambiarNombre,
  getMisReservas,
  cancelarReserva,
  checkUsuario,
};
