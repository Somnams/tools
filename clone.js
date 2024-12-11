/// shallow copy
/**
 * @param {Record<string, any>} obj 
 */
const shallowCopy = (obj) => {
    if (!obj || typeof obj !== 'object') throw Error('error object');
    const res = {};
    for (let i in obj) {
        if (obj.hasOwnProperty(i)) {
            res[i] = obj[i];
        }
    }
    return res;
}
const obj = { a: 1, b: 2, c: [1, 2, 34] };
const a = Object.assign({}, obj);
const a1 = shallowCopy(obj);
console.log(a, a1);

/// deep clone
/**
 * @param {Record<string, any>} obj 
 */
const deepClone = (obj, set = new WeakSet()) => {
    if (typeof obj !== 'object' || !obj) return obj;
    if (set.has(obj)) {
        return obj;
    }
    const res = Array.isArray(obj) ? [] : {};
    set.add(obj);
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            res[key] = deepClone(obj[key], set);
        }
    }
    return res;
};
console.log(deepClone(obj));
console.log(JSON.parse(JSON.stringify(obj)));
