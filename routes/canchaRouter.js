
const express = require("express");
const router = express.Router();
const canchaService = require("../services/canchaService.js");
const loginService = require("../services/loginService.js");

router.get("/", async function (req, res, next) {//All
  try {
    const canchasConCalendario = await canchaService.getCanchas();
    const canchas = await canchasConCalendario.map(({ _id, numero, nombre, tamanio, precio, ...resto }) => {
      return { _id, numero, nombre, tamanio, precio };
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

router.get("/:id", async function (req, res, next) {//All
  try{
    let miCanchaConCalendario = await canchaService.getCanchaById(req.params.id);

    if (miCanchaConCalendario) {
      let { calendario2023, ...miCancha } = miCanchaConCalendario;
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

router.post("/", async function (req, res, next) {//Admin

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

  try {/*
    const decodificado = await loginService.validarToken(req);
    await loginService.validarAdmin(decodificado.id);*/

    const response = await canchaService.crearCancha(req.body.numero, req.body.nombre, req.body.tamanio, req.body.precio);
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

router.get("/:id/reservar/mes=:mes/dia=:dia", async function (req, res, next) {//All
  try {
    const mes = req.params.mes - 1;
    const dia = req.params.dia - 1;
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

router.put("/:id/reservar", async function (req, res, next) {//Usuario y Admin
  try {/*
    const decodificado = await loginService.validarToken(req);
    const admin = await loginService.esAdmin(decodificado.id);
    if(!admin){
      await validarTokenId(decodificado.id, req.body.idUsuario);
    }*/
  
    if (req.body.mes == undefined || req.body.mes < 1 || req.body.mes > 12) {
      return res.status(400).json({
        message: "No se ingresó un mes válido, inténtelo nuevamente.",
      });
    } else if (req.body.dia == undefined || req.body.dia < 1 || (req.body.mes == 2 && req.body.dia > 28) || ((req.body.mes == 1 || req.body.mes == 3 || req.body.mes == 5 || req.body.mes == 7 || req.body.mes == 8 || req.body.mes == 10 || req.body.mes == 12) && req.body.dia > 31) || ((req.body.mes == 4 || req.body.mes == 6 || req.body.mes == 9 || req.body.mes == 11) && req.body.dia > 30)) {
      return res.status(400).json({
        message: "No se ingresó un día válido, inténtelo nuevamente.",
      });
    } else if (req.body.hora == undefined || req.body.hora < 0 || req.body.hora > 23) {
      return res.status(400).json({
        message: "No se ingresó una hora válida, inténtelo nuevamente.",
      });
    }
        
    const mes = req.body.mes - 1;
    const dia = req.body.dia - 1;
    const response = await canchaService.crearReserva(mes, dia, req.body.hora, req.body.idUsuario, req.params.id);
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
  try {/*
    const decodificado = await loginService.validarToken(req);
    await loginService.validarAdmin(decodificado.id);*/

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

router.delete("/:id/MisReservas/mes=:mes/dia=:dia/:idReserva", async function (req, res, next) {//Admin
  try {/*
    const decodificado = await loginService.validarToken(req);
    await loginService.validarAdmin(decodificado.id);*/

    const mes = req.params.mes - 1;
    const dia = req.params.dia - 1;
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
