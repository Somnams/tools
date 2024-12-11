/**
 * @param {Array<any>} arr 
 */
const flatten = (arr) => {
    return arr.reduce((prev, cur) => {
        if (Array.isArray(cur)) {
            return prev.concat(flatten(cur));
        } else {
            prev.push(cur);
            return prev;
        }
    }, []);
}

const arr = [1, 2, 3, [11, 22], [22, [333]]];
console.log(flatten(arr), arr.flat());
