
const { Usuario } = require("../models/usuario");
const usuarioData = require("../data/usuarioData");
const reservaData = require("../data/reservaData");

async function getUsuarios() {
  try {
    const usuarios = await usuarioData.getUsuarios();
    return usuarios;
  } catch (error) {
    throw error;
  }
}

async function getUsuarioById(id) {
  try {
    await checkUsuario(id);

    const usuario = await usuarioData.getUsuarioById(id);
    return usuario;
  } catch (error) {
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

async function cambiarNombre(idUsuario, nombre) {
  try {
    await checkUsuario(idUsuario);

    const result = await usuarioData.cambiarNombre(idUsuario, nombre)
    return result;
  } catch (error) {
    throw error;
  }
};

async function getMisReservas(idUsuario) {
  try {
    const usuario = await checkUsuario(idUsuario);

    const reservas = await usuarioData.getMisReservas(usuario);
    return reservas;
  } catch (error) {
    throw error;
  }
}

async function cancelarReserva(idUsuario, idReserva) {
  try {
    const usuario = await checkUsuario(idUsuario);
    await checkReservaRegistrada(usuario, idReserva);
  
    const result = await reservaData.cancelarReserva(idReserva);
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
  const existeReserva = await usuario.reservas.find(id => id == idReserva);
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
