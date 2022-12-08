/**
 * simple proxy constructor
 */

const handler = {
  get: function (target, name) {
    console.log("get", target, name);
    return name in target ? target[name] : 42;
  },
};

const target = {};
const p = new Proxy(target, handler);
p.a = 1;
p.b = undefined;

console.log("p.a", p.a);
console.log("p.b", p.b);
console.log("c in p", "c" in p);
console.log("p.c", p.c);

console.log("p", p);
console.log("target", target);
console.log("is equal", p === target);
