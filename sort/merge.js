/**
 * @param {Array} left 
 * @param {Array} right 
 */
const helper = (left, right) => {
    const arr = [];
    while (left.length && right.length) {
        if (left[0] <= right[0]) {
            arr.push(left.shift());
        } else {
            arr.push(right.shift());
        }
    }
    const rest = left.length > 0 ? left : right;
    arr.push(...rest);
    return arr;
};

/**
 * @param {Array} arr 
 */
const merge = (arr) => {
    const len = arr.length;
    if (len <= 1) return arr;

    const mid = len >> 1;
    const l = merge(arr.slice(0, mid));
    const r = merge(arr.slice(mid, len));
    return helper(l, r);
}

const arr = [-1, -33, 2, 9, 0, 11];
console.log(merge(arr));