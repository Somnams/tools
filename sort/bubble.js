/**
 * @param {Array} arr 
 */
const bubble = (arr) => {
    const len = arr.length;
    if (len <= 1) return arr;

    for (let i = 0; i < len - 1; i++) {
        for (let j = 0; j < i; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
    return arr;
};

const arr = [-1, -33, 2, 9, 0, 11];
console.log(bubble(arr));
