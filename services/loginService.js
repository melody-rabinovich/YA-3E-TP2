
const usuarioData = require("../data/usuarioData");
const jwt = require('jsonwebtoken');
require('dotenv').config();

async function loguearUsuario(mail, password) {
  try {
    await checkMailRegistrado(mail);
    await checkPassValida(mail, password);

    const usuario = await usuarioData.getUsuarioByMail(mail);
    return usuario;
  } catch (error) {
    throw error;
  }
};

async function existeToken(req) {
  const token = await getToken(req);
  return token != null;
}

async function getToken(req) {
  return req.header('Authorization');
}

async function validarToken(req){
  const existe = await existeToken(req);
  if (existe) {
    const token = await getToken(req);
    return await decodificarToken(token);
  } else {
    throw new Error("Acceso denegado.");
  }
}

async function decodificarToken(token) {
  try {
    return await jwt.verify(token, process.env.TOKEN_SECRET);
  } catch (error) {
    throw new Error("El token no es válido.");
  }
}

async function esAdmin(id){
  return await usuarioData.esAdmin(id);
}

async function validarAdmin(id){
  const admin = await esAdmin(id);
  if(!admin){
    throw new Error("Acceso denegado.");
  }
}

async function validarTokenId(idDecodificado, id){
  if(idDecodificado != id){
    throw new Error("Acceso denegado.");
  }
}

async function validarTokenMail(mailDecodificado, mail){
  if(mailDecodificado != mail){
    throw new Error("Acceso denegado.");
  }
}

async function checkMailRegistrado(mail) {
  const mailExistente = await usuarioData.validarMail(mail);
  if (!mailExistente) {
    throw new Error("El mail no está registrado.");
  }
}

async function checkPassValida(mail, password) {
  const passValida = await usuarioData.validarPass(mail, password);
  if (!passValida) {
    throw new Error("La contraseña no es válida.");
  }
}

async function checkAdmin(req){
  const decodificado = await validarToken(req);
  await validarAdmin(decodificado.id);
}

async function checkLogueado(req, idUsuario){
  const decodificado = await validarToken(req);
  const admin = await esAdmin(decodificado.id);
  if(!admin){
    await validarTokenId(decodificado.id, idUsuario);
  }
}

module.exports = {
  loguearUsuario,
  existeToken,
  getToken,
  validarToken,
  decodificarToken,
  esAdmin,
  validarAdmin,
  validarTokenId,
  validarTokenMail,
  checkAdmin,
  checkLogueado,
};
