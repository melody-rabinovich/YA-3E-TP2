function* idGeneratorCancha() {
  let id = 1;
  while (true) {
    yield id++;
  }
}

function* idGeneratorUsuario() {
  let id = 1;
  while (true) {
    yield id++;
  }
}

module.exports = { idGeneratorCancha, idGeneratorUsuario };
