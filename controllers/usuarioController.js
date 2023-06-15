const { UsuarioJugador, UsuarioDueño } = require("../models/usuario.js");
const userData = require("../data/usuarioDuenio.js");

const crearUsuarioJugador = async (req, res) => {
  const { nombre } = req.body;

  const jugador = new UsuarioJugador(nombre);

  //Enviar respuesta con el usuario creado
  res.status(201).json({ jugador });
};

const crearUsuarioDuenio = async (body) => {
  //console.log("Estoy en creando usuarioDuenio con el nombre: " + req.nombre);

  /*if (req.nombre == undefined) {
    return res.status(400).json({
      message: "No se inserto el nombre dentro de usuarioController",
    });
  }*/

  //console.log("Creo el usuario dueño");

  const duenio = new UsuarioDueño(body.nombre);
  // console.log("el usuario es " + duenio);

  const usuarioInsertado = await userData.insertarUsuarioDuenio(duenio);

  return usuarioInsertado;
  //res.status(201).json({ duenio });
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
