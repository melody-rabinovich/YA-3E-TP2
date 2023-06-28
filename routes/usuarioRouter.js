
const express = require("express");
const router = express.Router();
const usuarioRouterValidationService = require("../services/usuarioRouterValidationService");
const usuarioService = require("../services/usuarioService");
const loginService = require("../services/loginService");
const jwt = require('jsonwebtoken');
require('dotenv').config();

router.get("/", async function (req, res) {//Admin
  try {
    await loginService.checkAdmin(req);

    const usuarios = await usuarioService.getUsuarios();
    res.json(usuarios);
  } catch (error) {
    res.status(500)
    .json({ mensaje: "Ocurrió un error al obtener los usuarios.", error: error.message });
  }
});

router.get("/:id", async function (req, res, next) {//Usuario y Admin
  try{
    await loginService.checkLogueado(req, req.params.id);

    let usuario = await usuarioService.getUsuarioById(req.params.id);
    res.json(usuario);
  } catch (error) {
    res
      .status(400)
      .json({ mensaje: "Ocurrió un error al acceder al usuario.", error: error.message });
  }
});

router.post("/register", async function (req, res) {//All
  try {
    usuarioRouterValidationService.checkBodyNombre(req.body.nombre);
    usuarioRouterValidationService.checkBodyMail(req.body.mail);
    usuarioRouterValidationService.checkBodyPass(req.body.password);
    usuarioRouterValidationService.checkSchemaRegister(req.body);
  
    const response = await usuarioService.crearUsuario(req.body.nombre, req.body.mail, req.body.password);
    res.status(201).json({
      message: "El usuario fue creado exitosamente.",
      response: response,
    });
  } catch (error) {
    res
      .status(400)
      .json({ mensaje: "Ocurrió un error al registar al usuario.", error: error.message });
  }
});

router.post("/register/admin", async function (req, res) {//Admin
  try {
    await loginService.checkAdmin(req);
    usuarioRouterValidationService.checkBodyNombre(req.body.nombre);
    usuarioRouterValidationService.checkBodyMail(req.body.mail);
    usuarioRouterValidationService.checkBodyPass(req.body.password);
    usuarioRouterValidationService.checkSchemaRegister(req.body);
    
    const response = await usuarioService.crearAdmin(req.body.nombre, req.body.mail, req.body.password);
    res.status(201).json({
      message: "El administrador fue creado exitosamente.",
      response: response,
    });
  } catch (error) {
    res
      .status(400)
      .json({ mensaje: "Ocurrió un error al registar al administrador.", error: error.message });
  }
});

router.post("/login", async function (req, res) {//All
  try {
    usuarioRouterValidationService.checkBodyMail(req.body.mail);
    usuarioRouterValidationService.checkBodyPass(req.body.password);
    usuarioRouterValidationService.checkSchemaLogin(req.body);
  
    const usuario = await loginService.loguearUsuario(req.body.mail, req.body.password);

    await jwt.sign({
      id: usuario._id,
      mail: usuario.mail,
    }, process.env.TOKEN_SECRET, {expiresIn: "1h"}, (error, token) => {
      return res.header('Authorization', token).json({
        error: null,
        mensaje: "Bienvenido.",
        token: token,
        usuario: usuario,
      })
    })
  } catch (error) {
    res
      .status(400)
      .json({ mensaje: "Ocurrió un error al iniciar sesión.", error: error.message });
  }
});

router.put("/:id/cambiarnombre", async function (req, res, next) {//Usuario y Admin
  try {
    await loginService.checkLogueado(req, req.params.id);
  
    const response = await usuarioService.cambiarNombre(req.params.id, req.body.nombre);
    return res.status(201).json({
      message: "Cambio de nombre exitoso.",
      response: response,
    });
  } catch (error) {
    res
      .status(400)
      .json({ mensaje: "Ocurrió un error al cambiar el nombre del usuario.", error: error.message });
  }
});

router.get("/:id/MisReservas", async function (req, res, next) {//Usuario y Admin
  try {
    await loginService.checkLogueado(req, req.params.id);
  
    const response = await usuarioService.getMisReservas(req.params.id);
    res.status(201).json({
      message:
        "Estas son las reservas del usuario:",
      response: response,
    });
  } catch (error) {
    res
      .status(400)
      .json({ mensaje: "Ocurrió un error al obtener las reservas.", error: error.message });
  }
});

router.delete("/:id/MisReservas/:idReserva", async function (req, res, next) {//Usuario y Admin
  try {
    await loginService.checkLogueado(req, req.params.id);
  
    const response = await usuarioService.cancelarReserva(req.params.id, req.params.idReserva);
    res.status(201).json({
      message: "Se canceló la reserva.",
      response: response,
    });
  } catch (error) {
    res
      .status(400)
      .json({ mensaje: "Ocurrió un error al cancelar la reserva.", error: error.message });
  }
});

module.exports = router;
