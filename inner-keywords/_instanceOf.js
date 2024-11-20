/**
 * obj instanceOf User ?
 * @param {any} left 
 * @param {Object} right 
 */
function _instanceOf(left, right) {
    if (typeof left !== 'object' || left === null) return false;

    let proto = Object.getPrototypeOf(left);
    while (proto) {
        if (proto === right.prototype) return true;
        proto = Object.getPrototypeOf(left);
    }
    return false;
}
const user = {name: 'aa'};
console.log(_instanceOf(33, Object));
console.log(_instanceOf(user, Object));