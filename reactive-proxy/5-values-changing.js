/**
 * change values and add new properties
 */

const target = {
  browsers: ["Internet Explorer", "Netscape"],
};

const handler = {
  get: function (obj, prop) {
    if (prop === "latestBrowser") {
      return obj.browsers[obj.browsers.length - 1];
    }

    return obj[prop];
  },
  set: function (obj, prop, value) {
    if (prop === "latestBrowser") {
      obj.browsers.push(value);
      return;
    }

    if (typeof value === "string") {
      value = [value];
    }

    obj[prop] = value;

    return true;
  },
};

const products = new Proxy(target, handler);

console.log(products.browsers);
products.browsers = "Firefox";
console.log(products.browsers);

products.latestBrowser = "Chrome";
console.log(products.browsers);
console.log(products.latestBrowser);
