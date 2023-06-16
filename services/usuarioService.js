const { UsuarioJugador, UsuarioDueño } = require("../models/usuario.js");
const userData = require("../data/usuarioDuenio.js");

const crearUsuarioJugador = async (req, res) => {
  const { nombre } = req.body;
  const jugador = new UsuarioJugador(nombre);
  res.status(201).json({ jugador });
};

const crearUsuarioDuenio = async (body) => {
  const duenio = new UsuarioDueño(body.nombre);
  const usuarioInsertado = await userData.insertarUsuarioDuenio(duenio);
  return usuarioInsertado;
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

module.exports = {
  crearUsuarioJugador,
  crearUsuarioDuenio,
  getUsers,
};
