
const express = require("express");
const cors = require("cors");
const { conectar } = require("./database");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
const usuarioRouter = require("./routes/usuarioRouter.js");
const canchaRouter = require("./routes/canchaRouter.js");
const path = require("path");
const cookieParser = require("cookie-parser");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/usuarios", usuarioRouter);
app.use("/canchas", canchaRouter);

//Conecto a la base de datos
conectar()
  .then(() => {
  })
  .catch((error) => {
    console.error("Error al conectar a la base de datos", error);
    throw error;
  });

app.get("/", (req, res) => {
  res.send("Bienvenidos a la API del proyecto de canchas");
});

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}
  http://localhost:` + port + `/`);
});

module.exports = app;

//El response, por otro lado, es el objeto utilizado para enviar la respuesta al cliente.

/*¿Todos los get y post y las interacciones con el servidor se hacen desde el index.js?
//Se crean dueños y jugador por solicitudes POST hacia el servidor
app.post('/cancha', crearCancha);


let cancha = new Cancha("El último 10", "Av. Mitre 1234, Caseros", 5, 1500, [1400,2300]);
let jugador1 = new UsuarioJugador("Jaime")
jugador1.reservar(cancha,0,0,1400);
jugador1.reservar(cancha,0,0,1400);
jugador1.reservar(cancha,0,0,2000);

let jugador2 = new UsuarioJugador("Lucas");
//cancha.otorgarReserva(0,0,1000);
//cancha.otorgarReserva(0,0,1400);
//cancha.otorgarReserva(0,0,1400);

cancha.listarDisponibilidad(0,0,0,2300);
console.log();
cancha.listarDisponibilidad(0,0);
console.log();
jugador1.listarReservas();
console.log();
cancha.eliminarReserva(0,0,2000,jugador1);
console.log();
jugador1.listarReservas();

const req = {
  "fecha": "2023/01/30 00:00:00",
  "hora": "10",
  "idUsuario": "648e3e58f44a1a57cf931d60"
}
const tipoDate = new Date(req.fecha);

const mes = tipoDate.getMonth();
const dia = tipoDate.getDate();

console.log(req)
console.log()
console.log(tipoDate)
console.log()
console.log(mes)
console.log(dia)
console.log()

const req2 = {
  "fecha": "2023/01/01 00:00:00",
  "hora": "10",
  "idUsuario": "648e3e58f44a1a57cf931d60"
}
const tipoDate2 = new Date(req2.fecha);

const mes2 = tipoDate2.getMonth();
const dia2 = tipoDate2.getDate();

console.log(req2)
console.log()
console.log(tipoDate2)
console.log()
console.log(mes2)
console.log(dia2)
console.log()
*/

