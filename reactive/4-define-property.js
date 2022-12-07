/**
 * using getter/setter on data object
 */

const data = {
  price: 10,
  quantity: 2,
};

console.log(data);

/**
 * https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty
 */

Object.keys(data).forEach((key) => {
  let fieldValue = data[key];

  Object.defineProperty(data, key, {
    get() {
      console.log(`value of ${key} is accessed`);

      return fieldValue;
    },
    set(newVal) {
      console.log(`value of ${key} is mutated`);

      fieldValue = newVal;
    },
  });
});

data.price = 3;
console.log(data);
