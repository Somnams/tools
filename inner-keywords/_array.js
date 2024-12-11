/// map
Array.prototype._map = function (fn, thisArg) {
    const arr = this;
    const res = [];
    for (let i = 0; i < arr.length; i++) {
        res.push(fn.call(thisArg, arr[i], i, arr));
    }

    return res;
}

const a = [1, 2, 3];
const a1 = a._map((item, i) => {
    return item * 2
});
console.log(a, a1);

/// reduce
Array.prototype._reduce = function (fn, initialVal) {
    const arr = this;
    let res = initialVal ?? arr[0];
    for (let i = 0; i < arr.length; i++) {
        res = fn.call(null, res, arr[i], i, arr);
    }
    return res;
}
const b = a._reduce((p, c) => { return p + c });
const b1 = a._reduce((p, c) => { return p + c });
console.log(b, b1);
