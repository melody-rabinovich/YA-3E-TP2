const express = require("express");
const router = express.Router();
const usuarioService = require("../services/usuarioService");

router.post("/", async function (req, res, next) {
  let body = req.body;
  if (req.body.nombre == undefined) {
    return res.status(400).json({
      message: "No se inserto el nombre dentro de usuarioDuenio Routes",
    });
  }
  try {
    const response = await usuarioService.crearUsuarioDuenio(body);
    res.status(201).json({
      message: body.nombre + " fue creado como duenio exitosamente",
      response: response,
    });
  } catch (err) {
    res
      .status(400)
      .json({ mensaje: "Soy el catch del usuarioDuenio", err: err.message });
  }
});

router.get("/", async function (req, res, next) {
  try {
    const usuarios = await usuarioService.getUsers();
    res.json(usuarios);
  } catch (error) {
    console.log("Error al obtener los usuarios", error);
    res.status(500).json({ error: "Ocurrió un error al obtener los usuarios" });
  }
});

module.exports = router;
