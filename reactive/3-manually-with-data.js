/**
 * using function with data object
 */

const data = {
  price: 10,
  quantity: 2,
};

let total = 0;
const computeTotal = () => (total = data.price * data.quantity);
computeTotal();
console.log(total);
