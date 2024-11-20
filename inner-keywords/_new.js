function _new(func, ...args) {
    const obj = {};
    obj.__proto__ = func.prototype;
    let result = func.apply(obj, args);
    // func constructor should return object
    return result instanceof Object ? result : obj;
}

function Person(name, age) {
    this.name = name;
    this.age = age;
}
Person.prototype.sayHi = function () {
    console.log(`Hi, ${this.name}`);
}

let p = _new(Person, "Alone", 12);
console.log(p);

p.sayHi();