
const ObjectId = require("mongodb").ObjectId;
const { obtenerCliente } = require("../database");
const { Rol } = require("../models/usuario.js");

const getUsuarios = async () => {
  const cliente = obtenerCliente();
  const collection = cliente.db("mydatabase").collection("usuarios");

  try {
    const documentos = await collection.find({}).toArray();
    return documentos;
  } catch (error) {
    console.log("Error al traer a los usuarios.", error);
    throw error;
  }
};

const getUsuarioById = async (id) => {
  const cliente = obtenerCliente();
  const collection = cliente.db("mydatabase").collection("usuarios");

  try {
    const usuario = await collection.findOne({ _id: new ObjectId(id) });
    return usuario;
  } catch (error) {
    console.log("Error al traer al usuario.", error);
    throw error;
  }
};

const getUsuarioByMail = async (mail) => {
  const cliente = obtenerCliente();
  const collection = cliente.db("mydatabase").collection("usuarios");

  try {
    const usuario = await collection.findOne({ mail: mail });
    return usuario;
  } catch (error) {
    console.log("Error al traer al usuario.", error);
    throw error;
  }
};

const insertarUsuario = async (usuario) => {
  const cliente = obtenerCliente();
  const collection = cliente.db("mydatabase").collection("usuarios");

  try {
    const result = await collection.insertOne(usuario);
    return result;
  } catch (error) {
    console.error("Error al insertar al usuario.", error);
    throw error;
  }
};

const setAdmin = async (mail) => {
  const cliente = obtenerCliente();
  const collection = cliente.db("mydatabase").collection("usuarios");

  try {
    const result = await collection.updateOne(
      { mail: mail },
      {$set:
        {rol: Rol.Admin}
      }
    )
    return result;
  } catch (error) {
    console.log("Error al crear el usuario administrador.", error);
    throw error;
  }
};

const esAdmin = async (id) => {
  const usuario = await getUsuarioById(id);
  return usuario.rol == Rol.Admin;
}

const validarMail = async (mail) => {
  const cliente = obtenerCliente();
  const collection = cliente.db("mydatabase").collection("usuarios");

  try {
    const usuario = await collection.findOne({ mail: mail });
    return usuario != null; //Devuelve true si el mail está registrado, false si no lo está
  } catch (error) {
    console.log("Error al validar el correo electrónico.", error);
    throw error;
  }
};

const validarPass = async (mail, password) => {
  const cliente = obtenerCliente();
  const collection = cliente.db("mydatabase").collection("usuarios");

  try {
    const usuario = await collection.findOne({ mail: mail });
    return usuario.password == password; //Devuelve true si la contraseña es correcta, false si no lo es
  } catch (error) {
    console.log("Error al validar la contraseña.", error);
    throw error;
  }
};

const cambiarNombre = async (mail, nuevoNombre) => {
  const cliente = obtenerCliente();
  const collection = cliente.db("mydatabase").collection("usuarios");

  try {
    const result = await collection.updateOne(
      { mail: mail },
      {$set:
        {nombre: nuevoNombre}
      }
    )
    return result;
  } catch (error) {
    console.log("Error al cambiar el nombre.", error);
    throw error;
  }
};

const registrarReserva = async (reserva, insertedId) => {
  const cliente = obtenerCliente();
  const collection = cliente.db("mydatabase").collection("usuarios");

  try {
    await checkUsuario(reserva.idUsuario);

    const filter = { _id: new ObjectId(reserva.idUsuario) };
    const update = { $push: { reservas: insertedId } };
    const result = await collection.updateOne(filter, update);
    return result;
  } catch (error) {
    console.log("Error al generar la reserva.", error);
    throw error;
  }
}

const getMisReservas = async (usuario) => {
  const cliente = obtenerCliente();
  const collection = cliente.db("mydatabase").collection("reservas");
  let reservas = [];

  try {
    for (let i = 0; i < usuario.reservas.length; i++){
      let reserva = await collection.findOne({ _id: usuario.reservas[i] })
      reservas.push(reserva);
    }
    return reservas;
  } catch (error) {
    console.log("Error al traer las reservas del usuario.", error);
    throw error;
  }
};

const checkUsuario = async (idUsuario) => {
  const usuario = await getCanchaById(idUsuario);
  if (!usuario) {
    throw new Error("El usuario no existe.");
  }
  return usuario;
}

module.exports = {
  getUsuarios,
  getUsuarioById,
  getUsuarioByMail,
  insertarUsuario,
  setAdmin,
  esAdmin,
  validarMail,
  validarPass,
  cambiarNombre,
  registrarReserva,
  getMisReservas,
  checkUsuario,
};
