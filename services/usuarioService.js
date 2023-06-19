
const ObjectId = require("mongodb").ObjectId;
const { Usuario } = require("../models/usuario.js");
const usuarioData = require("../data/usuarioData.js");
const canchaService = require("../services/canchaService");

async function getUsuarios() {
  try {
    const usuarios = await usuarioData.getUsuarios();
    return usuarios;
  } catch (error) {
    console.log("Error al obtener los usuarios", error);
    throw error;
  }
}

async function getUsuarioById(id) {
  try {
    const usuario = await usuarioData.getUsuarioById(id);
    return usuario;
  } catch (error) {
    console.log(`Error al obtener el usuario con id: ${id}`, error);
    throw error;
  }
}

async function crearUsuario(nombre, mail, password) {
  const mailExistente = await usuarioData.validarMail(mail);
  if (mailExistente) {
    throw new Error("El mail ya está registrado");
  }
  try {
    const usuario = new Usuario(nombre, mail, password);
    const usuarioInsertado = await usuarioData.insertarUsuario(usuario);
    return usuarioInsertado;
  } catch (error) {
    throw error;
  }
};

async function cambiarNombre(mail, nombre) {
  try {
    await usuarioData.cambiarNombre(mail, nombre)
  } catch (error) {
    console.log(error);
    throw error;
  }
};

async function getMisReservas(idUsuario) {
  const usuario = await usuarioData.getUsuarioById(idUsuario);
  if (!usuario) {
    throw new Error("El usuario no existe.");
  }

  try {
    const reservas = await usuarioData.getMisReservas(usuario);
    return reservas;
  } catch (error) {
    console.log(`Error al obtener las reservas del usuario de id ${idUsuario}`, error);
    throw error;
  }
}

async function cancelarReserva(idUsuario, idReserva) {
  const usuario = await usuarioData.getUsuarioById(idUsuario);
  if (!usuario) {
    throw new Error("El usuario no existe.");
  }

  const existeReserva = usuario.reservas.find(id => id == idReserva);
  if (!existeReserva) {
    throw new Error("El usuario no es titular de la reserva, por lo que no puede cancelarla.");
  }

  try {
    const result = await canchaService.cancelarReservaConfirmed(idReserva);
    return result;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  crearUsuario,
  getUsuarios,
  getUsuarioById,
  cambiarNombre,
  getMisReservas,
  cancelarReserva,
};
