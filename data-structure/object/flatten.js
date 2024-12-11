/**
 * @param {Record<string, any>} obj 
 */
const flatten = (obj, path = '', res = {}, isArray) => {
    for (let [key, value] of Object.entries(obj)) {

        if (Array.isArray(value)) {
            let k = isArray ? `${path}[${key}]` : `${path}${key}`;
            flatten(value, k, res, true);
        } else if (typeof value === 'object') {
            let k = isArray ? `${path}[${key}].` : `${path}${key}.`;
            flatten(value, k, res, false);
        } else {
            let k = isArray ? `${path}[${key}]` : `${path}${key}`;
            res[k] = value;

        }
    }
    return res;
};

console.log(flatten({ a: { aa: [{ aa1: 1 }] } }))