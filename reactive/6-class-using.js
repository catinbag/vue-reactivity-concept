/**
 * create class to encapsulate logic
 */

const { Dependency } = require("./../shared");

const data = {
  price: 10,
  quantity: 2,
};

let currentComputation = null;

function defineReactiveProperties(obj) {
  Object.keys(obj).forEach((key) => {
    let internalValue = obj[key];
    // each property will maintain a dep instance with all the subcription
    const dep = new Dependency();

    Object.defineProperty(obj, key, {
      get() {
        console.log(`get: ${key}`);

        dep.depend(currentComputation);

        return internalValue;
      },
      set(newVal) {
        console.log(`set: ${newVal} in ${key}`);
        internalValue = newVal;
        dep.notify();
      },
    });
  });
}

defineReactiveProperties(data);

function registerComputation(computation) {
  currentComputation = computation;
  computation();
  currentComputation = null;
}

let total = 0;
const computeTotal = () => (total = data.price * data.quantity);

function firstCalc() {
  console.log("firstCalc", total);
}

function updateState() {
  data.price = 20;
  console.log("updateState", total);
}

function addNewField() {
  data.newField = 1; // dont trigger updating
  console.log("addNewField", total);
}

function init() {
  registerComputation(computeTotal);
  firstCalc();
  updateState();
  addNewField();
}

init();
