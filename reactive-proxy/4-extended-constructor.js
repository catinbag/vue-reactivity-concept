/**
 * create custom contructor via proxy
 */

function extend(sup, base) {
  console.log("base", base);
  const descriptor = Object.getOwnPropertyDescriptor(
    base.prototype,
    "constructor"
  );

  console.log("descriptor", descriptor);

  const prototype = { ...base.prototype };

  base.prototype = Object.create(sup.prototype);
  base.prototype = Object.assign(base.prototype, prototype);

  const handler = {
    construct: function (target, args) {
      console.log("new construct", args);
      const obj = Object.create(base.prototype);
      this.apply(target, obj, args);

      return obj;
    },
    apply: function (target, that, args) {
      sup.apply(that, args);
      base.apply(that, args);
    },
  };

  const proxy = new Proxy(base, handler);
  descriptor.value = proxy;
  Object.defineProperty(base.prototype, "constructor", descriptor);

  return proxy;
}

const Person = function (name) {
  console.log("person init", name);
  this.name = name;
};

const Boy = extend(Person, function (name, age) {
  this.age = age;
});

Boy.prototype.sex = "M";

const Peter = new Boy("Peter", 13);
console.log(Peter.sex);
console.log(Peter.name);
console.log(Peter.age);
