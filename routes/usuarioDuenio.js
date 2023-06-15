const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuarioController");

router.post("/", async function (req, res, next) {
  let body = req.body;
  console.log(body);

  if (req.body.nombre == undefined) {
    return res.status(400).json({
      message: "No se inserto el nombre dentro de usuarioDuenio Routes",
    });
  }
  console.log(body.nombre);

  try {
    const response = await usuarioController.crearUsuarioDuenio(body);
    //.then((response) => {
    res.status(201).json({
      message: body.nombre + " fue creado como duenio exitosamente",
      response: response,
    });
    //})
  } catch (err) {
    res
      .status(400)
      .json({ mensaje: "Soy el catch del usuarioDuenio", err: err.message });
  }
});

router.get("/", async function (req, res, next) {
  try {
    const usuarios = await usuarioController.getUsers();
    res.json(usuarios);
  } catch (error) {
    console.log("Error al obtener los usuarios", error);
    res.status(500).json({ error: "Ocurrió un error al obtener los usuarios" });
  }
});

module.exports = router;
