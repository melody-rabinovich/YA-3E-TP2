
const express = require("express");
const router = express.Router();
const usuarioService = require("../services/usuarioService");
const loginService = require("../services/loginService");
const Joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const schemaRegister = Joi.object({
  nombre: Joi.string().min(2).max(100).required(),
  mail: Joi.string().min(6).max(100).required().email(),
  password: Joi.string().min(6).max(100).required(),
})

const schemaLogin = Joi.object({
  mail: Joi.string().min(6).max(100).required().email(),
  password: Joi.string().min(6).max(100).required(),
})

router.get("/", async function (req, res) {//Admin
  try {/*
    const decodificado = await loginService.validarToken(req);
    await loginService.validarAdmin(decodificado.id);*/

    const usuarios = await usuarioService.getUsuarios();
    res.json(usuarios);
  } catch (error) {
    res.status(500)
    .json({ mensaje: "Ocurrió un error al obtener los usuarios.", error: error.message });
  }
});

router.get("/:id", async function (req, res, next) {//Usuario y Admin
  try{/*
    const decodificado = await loginService.validarToken(req);
    const admin = await loginService.esAdmin(decodificado.id);
    if(!admin){
      await validarTokenId(decodificado.id, req.params.id);
    }*/
  
    let miUsuario = await usuarioService.getUsuarioById(req.params.id);
  
    if (miUsuario) {
      res.json(miUsuario);
    } else {
      res.status(404).json({
        error: "NOT FOUND",
        code: 404,
      });
    }
  } catch (error) {
    res
      .status(400)
      .json({ mensaje: "Ocurrió un error al acceder al usuario.", error: error.message });
  }
});

router.post("/register", async function (req, res) {//All
  if (req.body.nombre == undefined) {
    return res.status(400).json({
      message: "No se ingresó el nombre, inténtelo nuevamente.",
    });
  } else if (req.body.mail == undefined) {
    return res.status(400).json({
      message: "No se ingresó el mail, inténtelo nuevamente.",
    });
  } else if (req.body.password == undefined) {
    return res.status(400).json({
      message: "No se ingresó la contraseña, inténtelo nuevamente.",
    });
  }

  const { error } = schemaRegister.validate(req.body);
    
  if (error) {
      return res.status(400).json(
          {error: error.details[0].message}
      )
  }

  try {
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

  const { error } = schemaRegister.validate(req.body);
    
  if (error) {
      return res.status(400).json(
          {error: error.details[0].message}
      )
  }

  try {/*
    const decodificado = await loginService.validarToken(req);
    await loginService.validarAdmin(decodificado.id);*/
  
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
  if (req.body.mail == undefined) {
    return res.status(400).json({
      message: "No se insertó el mail, inténtelo nuevamente.",
    });
  } else if (req.body.password == undefined) {
    return res.status(400).json({
      message: "No se insertó la contraseña, inténtelo nuevamente.",
    });
  }

  const { error } = schemaLogin.validate(req.body);
    
  if (error) {
      return res.status(400).json(
          {error: error.details[0].message}
      )
  }

  try {
    const usuario = await loginService.loguearUsuario(req.body.mail, req.body.password);

    await jwt.sign({
      id: usuario._id,
      mail: usuario.mail,
    }, process.env.TOKEN_SECRET, {expiresIn: "1h"}, (error, token) => {
      res.header('auth-token', token).json({
        error: null,
        mensaje: "Bienvenido.",
        data: {token}
      })
    })
  } catch (error) {
    res
      .status(400)
      .json({ mensaje: "Ocurrió un error al iniciar sesión.", error: error.message });
  }
});

router.put("/:id/cambiarnombre", async function (req, res, next) {//Usuario y Admin
  try {/*
    const decodificado = await loginService.validarToken(req);
    const admin = await loginService.esAdmin(decodificado.id);
    if(!admin){
      await validarTokenId(decodificado.id, req.params.id);
    }*/
  
    const response = await usuarioService.cambiarNombre(req.body.mail, req.body.nombre);
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
  try {/*
    const decodificado = await loginService.validarToken(req);
    const admin = await loginService.esAdmin(decodificado.id);
    if(!admin){
      await validarTokenId(decodificado.id, req.params.id);
    }*/
  
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
  try {/*
    const decodificado = await loginService.validarToken(req);
    const admin = await loginService.esAdmin(decodificado.id);
    if(!admin){
      await validarTokenId(decodificado.id, req.params.id);
    }*/
  
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
