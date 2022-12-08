const target = {};
const p = new Proxy(target, {});

p.a = 37;
console.log(target.a);
