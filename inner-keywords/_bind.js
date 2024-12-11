// fn.bind(obj, 1, 2)
// fn.bind(obj, 1, 2)(2)
Function.prototype._bind = function () {
    const contextArray = Array.from(arguments);
    const fn = this;
    const thisArg = contextArray[0];
    const args = contextArray.slice(1);

    function f() {
        const isNew = typeof new.target !== undefined;

        return fn.apply(isNew ? this : thisArg, args.concat(...arguments));
    }
    f.prototype = fn.prototype;

    return f;
}


var obj = { name: 1, age: 2 }
var name = 'Leo', age = 18
function Fn(height, Gender) {
    console.log('name：', this.name, 'age:', this.age, 'height:', height, 'Gender:', Gender)
}
Fn.prototype.say = function () {
    console.log('Fn.prototype.say')
}

var fn1 = Fn._bind(obj, '80cm')
var obj1 = new fn1('male') // name： undefined age: undefined height: 80cm Gender: male
obj1.say() // Fn.prototype.say

var fn1 = Fn.bind(obj, '80cm')
var obj1 = new fn1('male') // name： undefined age: undefined height: 80cm Gender: male
obj1.say() // Fn.prototype.say


Function.prototype.__bind = function (thisArg, ...args) {
    let fn = this, savedArg = args;

    function f(...args1) {
        const isNew = new.target !== undefined;
        return fn.apply(isNew ? this : thisArg, savedArg.concat(args1));
    }
    // f.prototype = fn.prototype;

    return f;
}

var fn2 = Fn.__bind(obj, '80cm')
var obj2 = new fn2('male') // name： undefined age: undefined height: 80cm Gender: male
obj2.say() // Fn.prototype.say

var fn2 = Fn.bind(obj, '80cm')
var obj2 = new fn2('male') // name： undefined age: undefined height: 80cm Gender: male
obj2.say() // Fn.prototype.say

Function.prototype._call = function (thisArg, ...args) {
    if (typeof this !== 'function') throw Error('error');
    const context = thisArg || window;
    context.fn = this;
    const res = context.fn(...args);
    delete context.fn;
    return res;
}
Function.prototype._apply = function (thisArg, args) {
    if (typeof this !== 'function') throw Error('error');
    const context = thisArg || window;
    context.fn = this;
    const res = context.fn(...args);
    delete context.fn;
    return res;
}