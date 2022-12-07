/**
 * create class to encapsulate logic
 */

class Dependency {
  constructor() {
    this.subscribers = new Set();
  }
  depend(targetComputaion) {
    this.subscribers.add(targetComputaion);
  }
  notify() {
    this.subscribers.forEach((c) => c());
  }
}

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
        console.log(`value of ${key} is accessed`);

        if (currentComputation !== null) {
          dep.depend(currentComputation);
        }

        return internalValue;
      },
      set(newVal) {
        console.log(`value of ${key} is mutated`);
        internalValue = newVal;
        dep.notify();
      },
    });
  });
}

defineReactiveProperties(data, currentComputation);

function registerComputation(computation) {
  currentComputation = computation;
  computation();
  currentComputation = null;
}

let total = 0;
const computeTotal = () => (total = data.price * data.quantity);

registerComputation(computeTotal);
console.log(total);
data.price = 20;
console.log(total);
