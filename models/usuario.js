
class Usuario {
  constructor(nombre, mail, password) {
    this.nombre = nombre;
    this.mail = mail;
    this.password = password;
    this.reservas = []; //Se guardan los IDs de las reservas
  }
}

class Admin extends Usuario{
  constructor(nombre, mail, password) {
    super(nombre, mail, password)
  }
}

module.exports = {
  Usuario,
  Admin,
};
