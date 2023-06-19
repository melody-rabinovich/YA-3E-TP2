
const express = require("express");
const router = express.Router();
const usuarioService = require("../services/usuarioService");

router.get("/", async function (req, res) {
  try {
    const usuarios = await usuarioService.getUsuarios();
    res.json(usuarios);
  } catch (error) {
    console.log("Error al obtener los usuarios.", error);
    res.status(500).json({ error: "Ocurrió un error al obtener los usuarios." });
  }
});

router.get("/:id", async function (req, res, next) {
  let miUsuario = await usuarioService.getUsuarioById(req.params.id);

  if (miUsuario) {
    res.json(miUsuario);
  } else {
    res.status(404).json({
      error: "NOT FOUND",
      code: 404,
    });
  }
});

router.post("/register", async function (req, res) {
  if (req.body.nombre == undefined) {
    return res.status(400).json({
      message: "No se insertó el nombre, inténtelo nuevamente.",
    });
  } else if (req.body.mail == undefined) {
    return res.status(400).json({
      message: "No se insertó el mail, inténtelo nuevamente.",
    });
  } else if (req.body.password == undefined) {
    return res.status(400).json({
      message: "No se insertó la contraseña, inténtelo nuevamente.",
    });
  }
  try {
    const response = await usuarioService.crearUsuario(req.body.nombre, req.body.mail, req.body.password);
    res.status(201).json({
      message:
        "El usuario " + req.body.nombre +
        " fue creado como usuario exitosamente con el mail " +
        req.body.mail + ".",
      response: response,
    });
  } catch (err) {
    res
      .status(400)
      .json({ mensaje: "Ocurrió un error al registar al usuario.", err: err.message });
  }
});

router.put("/:id/cambiarnombre", async function (req, res, next) {
  try {
    const response = await usuarioService.cambiarNombre(req.body.mail, req.body.nombre)
    res.status(201).json({
      message:
        "Se cambió el nombre a " + req.body.nombre +
        " del usuario con mail " +
        req.body.mail + ".",
      response: response,
    });
  } catch (err) {
    res
      .status(400)
      .json({ mensaje: "Ocurrió un error al cambiar el nombre del usuario.", err: err.message });
  }
});

router.get("/:id/MisReservas", async function (req, res, next) {
  try {
    const response = await usuarioService.getMisReservas(req.params.id);
    res.status(201).json({
      message:
        "Estas son las reservas del usuario con mail " +
        req.body.mail + ".",
      response: response,
    });
  } catch (err) {
    res
      .status(400)
      .json({ mensaje: "Ocurrió un error al obtener las reservas.", err: err.message });
  }
});

router.delete("/:id/MisReservas", async function (req, res, next) {
  try {
    const response = await usuarioService.cancelarReserva(req.params.id, req.body.idReserva);
    res.status(201).json({
      message:
        "Se canceló la reserva.",
      response: response,
    });
  } catch (err) {
    res
      .status(400)
      .json({ mensaje: "Ocurrió un error al cancelar la reserva.", err: err.message });
  }
});

module.exports = router;
