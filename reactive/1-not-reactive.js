/**
 * simple computation, no reactivity
 */

let price = 10,
  quantity = 2,
  total = 0;

total = price * quantity;
console.log(total);

price = 20;
quantity = 3;
console.log(total);
