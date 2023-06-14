const express = require("express");
const router = express.Router();
const canchaController = require("../controllers/canchaController.js");

router.get("/", async function (req, res, next) {
  try {
    const canchas = await canchaController.getCanchas();
    res.json(canchas);
  } catch (error) {
    console.log("Error al obtener la lista de canchas", error);
    res
      .status(500)
      .json({ error: "Ocurrió un error al obtener la lista de canchas" });
  }
});

module.exports = router;
