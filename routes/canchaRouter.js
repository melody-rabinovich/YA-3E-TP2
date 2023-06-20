
const express = require("express");
const router = express.Router();
const canchaService = require("../services/canchaService.js");
const loginService = require("../services/loginService.js");

router.get("/", async function (req, res, next) {
  try {
    const canchasConCalendario = await canchaService.getCanchas();
    const canchas = canchasConCalendario.map(({ numero, nombre, tamanio, precio, ...resto }) => {
      return { numero, nombre, tamanio, precio };
    });

    /*
    const existe = await loginService.existeToken(req);
    if (existe){
      const token = await loginService.getToken(req);
      const decodificado = await loginService.decodificarToken(token);
      const admin = await loginService.esAdmin(decodificado.id);
      if (admin){
        canchas = await canchaService.getCanchas();
      }
    }
    */

    res.json(canchas);
  } catch (error) {
    res
      .status(500)
      .json({ mensaje: "Ocurrió un error al obtener la lista de canchas.", error: error.message });
  }
});

router.get("/:id", async function (req, res, next) {
  try{
    let miCanchaConCalendario = await canchaService.getCanchaById(req.params.id);

    let { numero, nombre, tamanio, precio, ...miCancha } = miCanchaConCalendario;

    if (miCancha) {
      res.json(miCancha);
    } else {
      res.status(404).json({
        error: "NOT FOUND",
        code: 404,
      });
    }
  } catch(error) {
    res
      .status(400)
      .json({ mensaje: "Ocurrió un error al acceder a la cancha.", error: error.message });
  }
});

router.post("/", async function (req, res, next) {

  if (req.body.numero == undefined) {
    return res.status(400).json({
      message: "No se insertó el numero, inténtelo nuevamente.",
    });
  }

  if (req.body.nombre == undefined) {
    return res.status(400).json({
      message: "No se insertó el nombre, inténtelo nuevamente.",
    });
  }

  if (req.body.tamanio == undefined) {
    return res.status(400).json({
      message: "No se insertó el tamaño, inténtelo nuevamente.",
    });
  }

  if (req.body.precio == undefined) {
    return res.status(400).json({
      message: "No se insertó el precio, inténtelo nuevamente.",
    });
  }

  try {
    const decodificado = await loginService.validarToken(req);
    await loginService.validarAdmin(decodificado.id);

    const response = await canchaService.crearCancha(req.body.numero, req.body.nombre, req.body.tamanio, req.body.precio);
    res.status(201).json({
      message: "La cancha número " + req.body.numero + " fue creada exitosamente.",
      response: response,
    });
  } catch (error) {
    res
      .status(400)
      .json({ mensaje: "Ocurrió un error al registrar la cancha.", error: error.message });
  }
});

router.get("/:id/reservar", async function (req, res, next) {
  try {
    const response = await canchaService.getDisponibilidadPorDia(req.body.mes, req.body.dia, req.params.id)
    res.status(200).json({
      message: "La disponibilidad de la cancha número " + req.params.id + " para el día " + req.body.dia + " de " + req.body.mes + " es la siguiente:",
      response: response,
    });
  } catch (error) {
    res
      .status(400)
      .json({ mensaje: "Ocurrió un error al consultar las reservas.", error: error.message });
  }
});

router.put("/:id/reservar", async function (req, res, next) {
  try {
    const decodificado = await loginService.validarToken(req);
    const admin = await loginService.esAdmin(decodificado.id);
    if(!admin){
      await validarTokenId(decodificado.id, req.body.idUsuario);
    }
  
    const response = await canchaService.crearReserva(req.body.fecha, req.body.hora, req.body.idUsuario, req.params.id);
    res.status(201).json({
      message: "La reserva en la cancha número " + req.params.id + ", para el día " + req.body.fecha + " a las " + req.body.hora + " hs. fue creada exitosamente.",
      response: response,
    });
  } catch (error) {
    res
      .status(400)
      .json({ mensaje: "Ocurrió un error al crear la reserva.", error: error.message });
  }
});

router.get("/:id/MisReservas", async function (req, res, next) {
  try {
    const decodificado = await loginService.validarToken(req);
    await loginService.validarAdmin(decodificado.id);

    const response = await canchaService.getMisReservas(req.params.id);
    res.status(201).json({
      message:
        "Estas son las reservas de la cancha número " +
        req.params.id + ":",
      response: response,
    });
  } catch (error) {
    res
      .status(400)
      .json({ mensaje: "Ocurrió un error al obtener las reservas.", error: error.message });
  }
});

router.delete("/:id/MisReservas", async function (req, res, next) {
  try {
    const decodificado = await loginService.validarToken(req);
    await loginService.validarAdmin(decodificado.id);

    const response = await canchaService.cancelarReserva(req.body.fecha, req.params.id, req.body.idReserva);
    res.status(201).json({
      message:
        "Se canceló la reserva.",
      response: response,
    });
  } catch (error) {
    res
      .status(400)
      .json({ mensaje: "Ocurrió un error al cancelar la reserva.", error: error.message });
  }
});

module.exports = router;
