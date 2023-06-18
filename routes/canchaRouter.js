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
      .json({ error: "Ocurrió un error al obtener la lista de canchas." });
  }
});

router.get("/:id", async function (req, res, next) {
  let miCancha = await canchaService.getCanchaById(req.params.id);

  if (miCancha) {
    res.json(miCancha);
  } else {
    res.status(404).json({
      error: "NOT FOUND",
      code: 404,
    });
  }
});

router.post("/", async function (req, res, next) {

  if (req.body.numero == undefined) {
    return res.status(400).json({
      message: "No se insertó el numero dentro de canchaRouter",
    });
  }

  if (req.body.nombre == undefined) {
    return res.status(400).json({
      message: "No se insertó el nombre dentro de canchaRouter",
    });
  }

  if (req.body.tamanio == undefined) {
    return res.status(400).json({
      message: "No se insertó el tamaño dentro de canchaRouter",
    });
  }

  if (req.body.precio == undefined) {
    return res.status(400).json({
      message: "No se insertó el precio dentro de canchaRouter",
    });
  }

  try {
    const response = await canchaService.crearCancha(req.body);
    res.status(201).json({
      message: "La cancha número " + req.body.numero + " fue creada exitosamente",
      response: response,
    });
  } catch (err) {
    res
      .status(400)
      .json({ mensaje: "Soy el catch del post en canchaRouter", err: err.message });
  }
});

router.get("/:id/reservar", async function (req, res, next) {
  console.log("Quiero ver los horarios disponibles")
});

router.put("/:id/reservar", async function (req, res, next) {
  console.log("Paso los datos para reservar")
  try {
    const response = await canchaService.crearReserva(req.body.fecha, req.body.hora, req.body.idUsuario, req.params.id);
    res.status(201).json({
      message: "La reserva en la cancha número " + req.body.numero + ", para el día " + req.body.fecha + " a las " + req.body.hora + " fue creada exitosamente",
      response: response,
    });
  } catch (err) {
    res
      .status(400)
      .json({ mensaje: "Soy el catch del put canchaRouter reservar", err: err.message });
  }
});

module.exports = router;
