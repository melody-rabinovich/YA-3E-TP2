const express = require("express");
const router = express.Router();
const canchaService = require("../services/canchaService.js");

router.get("/", async function (req, res, next) {
  try {
    const canchas = await canchaService.getCanchas();
    res.json(canchas);
  } catch (error) {
    console.log("Error al obtener la lista de canchas", error);
    res
      .status(500)
      .json({ error: "Ocurrió un error al obtener la lista de canchas" });
  }
});

router.post("/", async function (req, res, next) {
  let body = req.body;

  if (req.body.nombre == undefined) {
    return res.status(400).json({
      message: "No se inserto el nombre dentro de cancha Routes",
    });
  }
  console.log(body.nombre);

  try {
    const response = await canchaService.crearCancha(body);
    res.status(201).json({
      message: "La cancha " + body.nombre + " fue creada exitosamente",
      response: response,
    });
  } catch (err) {
    res
      .status(400)
      .json({ mensaje: "Soy el catch del canchaCrear", err: err.message });
  }
});

module.exports = router;
