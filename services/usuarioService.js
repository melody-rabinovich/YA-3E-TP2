const { UsuarioJugador, UsuarioDueño } = require("../models/usuario.js");
const userData = require("../data/usuarioDuenio.js");

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
const crearUsuarioDuenio = async (body) => {
  const mailExistente = await userData.validarMail(body.mail);
  if (mailExistente) {
    throw new Error("El mail ya está registrado");
  }
  try {
    const duenio = new UsuarioDueño(body.nombre, body.mail);
    const usuarioInsertado = await userData.insertarUsuarioDuenio(duenio);
    return usuarioInsertado;
  } catch (error) {
    console.log(error);
  }
};

async function getUsers(res) {
  try {
    const usuarios = await userData.traerTodos();
    return usuarios;
  } catch (error) {
    console.log("Error al obtener los usuarios", error);
    throw error;
  }
}

async function getUsuarioById(id) {
  try {
    const usuario = await userData.traerUsuarioId(id);
    return usuario;
  } catch (error) {
    console.log(`Error al obtener el usuario con id: ${id}`, error);
    throw error;
  }
}

module.exports = {
  // crearUsuarioJugador,
  crearUsuarioDuenio,
  getUsers,
  getUsuarioById,
};
