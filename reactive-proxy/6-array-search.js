/**
 * search in array
 */

const target = [
  { name: "Firefox", type: "browser" },
  { name: "SeaMonkey", type: "browser" },
  { name: "Thunderbird", type: "mailer" },
];

const handler = {
  get: function (obj, prop) {
    console.log("\nprop", prop);

    if (prop in obj) {
      return obj[prop];
    }

    if (prop === "number") {
      return obj.length;
    }

    let result,
      types = {};

    for (let product of obj) {
      console.log("product", product);
      if (product.name === prop) {
        result = product;
      }
      if (types[product.type]) {
        types[product.type].push(product);
      } else {
        types[product.type] = [product];
      }
    }

    if (result) {
      return result;
    }

    if (prop in types) {
      return types[prop];
    }

    if (prop === "types") {
      return Object.keys(types);
    }

    return undefined;
  },
};

const products = new Proxy(target, handler);
console.log("products", products);

console.log("products[0]", products[0]);
console.log('products["Firefox"]', products["Firefox"]);
console.log('products["Chrome"]', products["Chrome"]);
console.log("products.browser", products.browser);
console.log("products.types", products.types);
console.log("products.number", products.number);
