/**
 * create store of dependencies
 */

const data = {
  price: 10,
  quantity: 2,
};

let total = 0;
let currentComputation = null;

Object.keys(data).forEach((key) => {
  let internalValue = data[key];
  let dependentComputations = new Set();
  Object.defineProperty(data, key, {
    get() {
      console.log(`value of ${key} is accessed`);

      if (currentComputation !== null) {
        dependentComputations.add(currentComputation);
      }

      return internalValue;
    },
    set(newVal) {
      console.log(`value of ${key} is mutated`);
      internalValue = newVal;
      dependentComputations.forEach((computation) => computation());
    },
  });
});

function registerComputation(computation) {
  currentComputation = computation;
  computation();
  currentComputation = null;
}

const computeTotal = () => (total = data.price * data.quantity);

registerComputation(computeTotal);
console.log(total);
data.price = 20;
console.log(total);
