/**
 * using function with side effect
 */

let price = 10,
  quantity = 2,
  total = 0;

const computeTotal = () => (total = price * quantity);
computeTotal();
console.log(total);

price = 10;
quantity = 3;
console.log(total);
computeTotal();
console.log(total);
