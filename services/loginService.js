
const usuarioData = require("../data/usuarioData.js");
const jwt = require('jsonwebtoken');

async function loguearUsuario(mail, password) {
  const mailExistente = await usuarioData.validarMail(mail);
  if (!mailExistente) {
    throw new Error("El mail no está registrado.");
  }

  const passValida = await usuarioData.validarPass(mail, password);
  if (!passValida) {
    throw new Error("La contraseña no es válida.");
  }
  try {
    const usuario = await usuarioData.getUsuarioByMail(mail);
    return usuario;
  } catch (error) {
    console.log(`Error al obtener el usuario con mail: ${mail}.`, error);
    throw error;
  }
};

async function existeToken(req) {
  const token = await getToken(req);
  return token != null;
}

async function getToken(req) {
  return req.header('auth-token');
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
    return jwt.verify(token, process.env.TOKEN_SECRET);
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
};
