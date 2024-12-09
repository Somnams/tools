/**
 * @param {Array<number>} arr
 * @param {'set' | 'index'} type
 */
const unique = (arr, type) => {
    let res = arr;
    switch (type) {
        case "set":
            res = [...new Set(arr)];
            break;
        case "index":
            res = arr.filter((val, index, array) => {
                return array.indexOf(val) === index;
            });
            break;
        default:
            break;
    }
    return res;
};

const num = [1, 0, 1, 2, 3, 4, 0];
console.log(unique(num, 'index'));
console.log(unique(num, 'set'));