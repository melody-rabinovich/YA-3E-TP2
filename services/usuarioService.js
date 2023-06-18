
const { Usuario } = require("../models/usuario.js");
const usuarioData = require("../data/usuarioData.js");

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

const crearUsuario = async (body) => {
  const mailExistente = await usuarioData.validarMail(body.mail);
  if (mailExistente) {
    throw new Error("El mail ya está registrado");
  }
  try {
    const usuario = new Usuario(body.nombre, body.mail, body.password);
    const usuarioInsertado = await usuarioData.insertarUsuario(usuario);
    return usuarioInsertado;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const cambiarNombre = async (mail, nombre) => {
  try {
    await usuarioData.cambiarNombre(mail, nombre)
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  crearUsuario,
  getUsuarios,
  getUsuarioById,
  cambiarNombre,
};

/*const crearUsuarioJugador = async (req, res) => {
  const { nombre } = req.body;
  const jugador = new UsuarioJugador(nombre);
  res.status(201).json({ jugador });
};*/

/*const crearUsuarioDuenio = async (body) => {
  try {
    const mailExistente = await userData.validarMail(body.mail);
    if (mailExistente) {
      throw new Error("El mail ya está registrado");
    }
    const duenio = new UsuarioDueño(body.nombre, body.mail);
    const usuarioInsertado = await userData.insertarUsuarioDuenio(duenio);
    return usuarioInsertado;
  } catch (error) {
    throw error;
  }
};*/
