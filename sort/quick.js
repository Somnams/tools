/**
 * @param {Array} arr 
 * @param {number} low 
 * @param {number} high 
 */
const quick = (arr, low, high) => {
    if (low < high) {
        const mid = partition(arr, low, high);
        quick(arr, low, mid);
        quick(arr, mid + 1, high);
    }
    return arr;
};


/**
 * @param {Array} arr 
 * @param {number} low 
 * @param {number} high 
 */
const partition = (arr, low, high) => {
    const p = arr[high - 1];
    let i = low - 1;
    for (let j = low; j < high; j++) {
        
        if (arr[j] < p) {
            i += 1;
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }
    if (arr[high - 1] < arr[i + 1]) {
        [arr[i + 1], arr[high - 1]] = [arr[high - 1], arr[i + 1]];
    }
    return i + 1;
}

const arr = [5, 29, 2, 36, 24];
console.log(quick(arr, 0, arr.length));