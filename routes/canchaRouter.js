
const express = require("express");
const router = express.Router();
const canchaRouterValidationService = require("../services/canchaRouterValidationService");
const canchaService = require("../services/canchaService");
const loginService = require("../services/loginService");

router.get("/", async function (req, res, next) {//All
  try {
    const canchas = await canchaService.getCanchas();
    res.json(canchas);
  } catch (error) {
    res
      .status(500)
      .json({ mensaje: "Ocurrió un error al obtener la lista de canchas.", error: error.message });
  }
});

router.get("/:id", async function (req, res, next) {//All
  try{
    let cancha = await canchaService.getCanchaById(req.params.id);
    res.json(cancha);
  } catch(error) {
    res
      .status(400)
      .json({ mensaje: "Ocurrió un error al acceder a la cancha.", error: error.message });
  }
});

router.post("/", async function (req, res, next) {//Admin
  try {
    await loginService.checkAdmin(req);

    let numero = parseInt(req.body.numero);
    let nombre = req.body.nombre;
    let tamanio = parseInt(req.body.tamanio);
    let precio = parseInt(req.body.precio);

    canchaRouterValidationService.checkBodyNumero(numero);
    canchaRouterValidationService.checkBodyNombre(nombre);
    canchaRouterValidationService.checkBodyTamanio(tamanio);
    canchaRouterValidationService.checkBodyPrecio(precio);
  
    const response = await canchaService.crearCancha(numero, nombre, tamanio, precio);
    res.status(201).json({
      message: "La cancha fue creada exitosamente.",
      response: response,
    });
  } catch (error) {
    res
      .status(400)
      .json({ mensaje: "Ocurrió un error al registrar la cancha.", error: error.message });
  }
});

router.get("/:id/reservar/mes/:mes/dia/:dia", async function (req, res, next) {//All
  try {
    let mes = parseInt(req.params.mes);
    let dia = parseInt(req.params.dia);

    canchaRouterValidationService.checkMesDia(mes, dia);

    mes = mes - 1;
    dia = dia - 1;

    const response = await canchaService.getDisponibilidadPorDia(mes, dia, req.params.id)
    res.status(200).json({
      message: "La disponibilidad de la cancha es la siguiente:",
      response: response,
    });
  } catch (error) {
    res
      .status(400)
      .json({ mensaje: "Ocurrió un error al consultar la disponibilidad de la cancha.", error: error.message });
  }
});

router.post("/:id/reservar", async function (req, res, next) {//Usuario y Admin
  try {
    await loginService.checkLogueado(req, req.body.idUsuario);

    let mes = parseInt(req.body.mes);
    let dia = parseInt(req.body.dia);
    let hora = parseInt(req.body.hora);

    canchaRouterValidationService.checkMesDia(mes, dia);
    await canchaRouterValidationService.checkHora(hora);

    mes = mes - 1;
    dia = dia - 1;

    const response = await canchaService.crearReserva(mes, dia, hora, req.body.idUsuario, req.params.id);
    res.status(201).json({
      message: "Reserva creada exitosamente.",
      response: response,
    });
  } catch (error) {
    res
      .status(400)
      .json({ mensaje: "Ocurrió un error al crear la reserva.", error: error.message });
  }
});

router.get("/:id/MisReservas", async function (req, res, next) {//Admin
  try {
    await loginService.checkAdmin(req);

    const response = await canchaService.getMisReservas(req.params.id);
    res.status(201).json({
      message: "Estas son las reservas de la cancha:",
      response: response,
    });
  } catch (error) {
    res
      .status(400)
      .json({ mensaje: "Ocurrió un error al obtener las reservas.", error: error.message });
  }
});

router.delete("/:id/MisReservas/mes/:mes/dia/:dia/:idReserva", async function (req, res, next) {//Admin
  try {
    await loginService.checkAdmin(req);

    let mes = parseInt(req.params.mes);
    let dia = parseInt(req.params.dia);

    canchaRouterValidationService.checkMesDia(mes, dia);

    mes = mes - 1;
    dia = dia - 1;

    const response = await canchaService.cancelarReserva(mes, dia, req.params.id, req.params.idReserva);
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
