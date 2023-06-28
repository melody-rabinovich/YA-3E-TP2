
const Joi = require('@hapi/joi');

const schemaRegister = Joi.object({
  nombre: Joi.string().min(2).max(100).required(),
  mail: Joi.string().min(6).max(100).required().email(),
  password: Joi.string().min(6).max(100).required(),
})

const schemaLogin = Joi.object({
  mail: Joi.string().min(6).max(100).required().email(),
  password: Joi.string().min(6).max(100).required(),
})

function checkBodyNombre(nombre) {
  if (nombre == undefined) {
    throw new Error("No se insertó el nombre, inténtelo nuevamente.");
  }
}

function checkBodyMail(mail) {
  if (mail == undefined) {
    throw new Error("No se insertó el mail, inténtelo nuevamente.");
  }
}

function checkBodyPass(password) {
  if (password == undefined) {
    throw new Error("No se insertó la contraseña, inténtelo nuevamente.");
  }
}

function checkSchemaRegister(body){
  const { error } = schemaRegister.validate(body);
  if (error) {
    throw new Error(error.details[0].message);
  }
}

function checkSchemaLogin(body){
  const { error } = schemaLogin.validate(body);
  if (error) {
    throw new Error(error.details[0].message);
  }
}

module.exports = {
  checkBodyNombre,
  checkBodyMail,
  checkBodyPass,
  checkSchemaRegister,
  checkSchemaLogin,
};
