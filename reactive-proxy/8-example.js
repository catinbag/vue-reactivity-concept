/**
 * reactivity by proxy
 */

const { Dependency } = require("../shared/dependency");

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

function firstCalc() {
  console.log("firstCalc", total);
}

function changeState() {
  proxy.price = 1;
  console.log("changeState", total);
}

function addNewField() {
  proxy.newField = "value42"; // trigger updating
  console.log("addNewField", total);
}

function init() {
  registerComputation(computeFn);
  firstCalc();
  changeState();
  addNewField();
}

init();
