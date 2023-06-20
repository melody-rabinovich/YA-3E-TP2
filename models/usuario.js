
const Rol = {
  Admin: "Admin",
  Usuario: "Usuario",
}

class Usuario {
  constructor(nombre, mail, password) {
    this.nombre = nombre;
    this.mail = mail;
    this.password = password;
    this.rol = Rol.Usuario;
    this.reservas = []; //Se guardan los IDs de las reservas
  }
}

module.exports = {
  Usuario,
  Rol,
};
