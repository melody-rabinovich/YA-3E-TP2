const { UsuarioJugador, UsuarioDueño } = require("../models/usuario.js");
const userData = require("../data/usuarioDuenio.js");

const crearUsuarioJugador = async (req, res) => {
  const { nombre } = req.body;

  const jugador = new UsuarioJugador(nombre);

  //Enviar respuesta con el usuario creado
  res.status(201).json({ jugador });
};

const crearUsuarioDuenio = async (req, res) => {
  console.log("Estoy en creando usuarioDuenio con el nombre: " + req.body);

  if (req.body.nombre == undefined) {
    return res.status(400).json({
      message: "No se inserto el nombre",
    });
  }

  console.log("Creo el usuario dueño");

  const duenio = new UsuarioDueño(req.body);
  console.log("el usuario es " + duenio);

  userData.insertarUsuarioDuenio(duenio);

  res.status(201).json({ duenio });
};

module.exports = {
  crearUsuarioJugador,
  crearUsuarioDuenio,
};
