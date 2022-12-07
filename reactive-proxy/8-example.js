/**
 * reactivity by proxy
 */

const { Dependency } = require("./dependency");

const target = {
  price: 10,
  quantity: 2,
};

let currentComputeFn = null;

const dependency = new Dependency();

const handler = {
  get: function (obj, prop) {
    console.log(`get: ${prop}`);

    dependency.depend(currentComputeFn);

    return obj[prop];
  },
  set: function (obj, prop, value) {
    console.log(`set: ${value} in ${prop}`);

    obj[prop] = value;
    dependency.notify();
  },
};

const proxy = new Proxy(target, handler);

let total = 0;
const computeFn = () => (total = proxy.price * proxy.quantity);

function registerComputation(fn) {
  currentComputeFn = fn;
  fn(); // change state firstly
  currentComputeFn = null;
}

function changeState() {
  proxy.price = 1;
  console.log("last total", total);
}

function firstCalc() {
  console.log("firstCalc", total);
}

function init() {
  registerComputation(computeFn);
  firstCalc();
  changeState();
}

init();
