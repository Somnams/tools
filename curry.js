function curry(func) {
    function curried(...args) {
        if (args.length >= func.length) {
            return func.apply(this, args);
        } else {
            return function f(...args1) {
                return curried.apply(this, args.concat(args1));
            }
        }
    }

    return curried;
}

function sum(a, b, c) {
    return [a, b, c].reduce((p, c) => p + c, 0);
}
const c = curry(sum);
console.log(c(2, 4, 6));
console.log(c(2)(4)(6));
console.log(c(2, 4)(6));
