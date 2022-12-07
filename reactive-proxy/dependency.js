class Dependency {
  deps = new Set();

  depend(dep) {
    if (dep === null) {
      return;
    }

    this.deps.add(dep);
  }

  notify() {
    this.deps.forEach((dep) => dep());
  }
}

module.exports = {
  Dependency,
};
