function* idGenerator() {
  let id = 1;
  while (true) {
    yield id++;
  }
}

module.exports = idGenerator();
