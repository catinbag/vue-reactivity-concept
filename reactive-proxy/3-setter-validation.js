/**
 * setter validation
 */

const validator = {
  set: function (obj, prop, value) {
    console.group("set", prop);
    console.log("obj", obj);
    console.log("value", value);

    if (prop === "age") {
      if (!Number.isInteger(value)) {
        console.groupEnd();
        throw new TypeError("The age is not an integer");
      }

      if (value > 200) {
        console.groupEnd();
        throw new RangeError("The age seems invalid");
      }
    }

    obj[prop] = value;
    console.groupEnd();

    return true;
  },
};

const person = new Proxy({}, validator);

person.age = 30;
console.log(person.age);
person.age = 300;
person.age = "young";
console.log("end");
