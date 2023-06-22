
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

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/usuarios", usuarioRouter);
app.use("/canchas", canchaRouter);

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
