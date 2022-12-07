/**
 * reactivity by proxy
 */

const { Dependency } = require("./depencdency");

// WIP

function watch(localTaget, cb) {
  let currentComputeFn = null;
  const dependency = new Dependency();

  const proxyLocal = new Proxy(localTaget, {
    get: function (obj, prop) {
      console.log(`get: ${prop}`);

      dependency.depend(currentComputeFn);

      return obj[prop];
    },
    set: function (obj, prop, value) {
      console.log(`setter local: ${value} in ${prop}`);

      obj[prop] = value;
    },
  });

  function registerComputation(fn) {
    currentComputeFn = fn;
    fn(); // change state firstly
    currentComputeFn = null;
  }

  registerComputation(cb);

  console.log("proxyLocal", proxyLocal);

  proxyLocal.price = 5;
  console.log("proxyLocal.price", proxyLocal.price);
}

const target = {
  price: 10,
  quantity: 2,
};

function init() {
  watch(target, () => {
    console.log("CB changed proxy");
  });

  target.price = 2;
}

init();
