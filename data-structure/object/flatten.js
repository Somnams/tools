/**
 * @param {Record<string, any>} obj 
 */
const flatten = (obj, path = '', res = {}, isArray) => {
    for (let [key, value] of Object.entries(obj)) {
        if (Array.isArray(value)) {
            const k = isArray ? `${path}[${key}]` : `${path}${key}`;
            flatten(value, k, res, true);
        } else if (typeof value === "object") {
            const k = isArray ? `${path}[${key}].` : `${path}${key}.`;
            flatten(value, k, res, false);
        } else {
            const k = isArray ? `${path}[${key}]` : `${path}${key}`;
            res[k] = value;
        }
    }
    return res;
};

console.log(flatten({ a: { aa: [{ aa1: 1 }] } })); // {a.aa[0].aa1: 1}

/// lodash.get
/**
 * @param {object} obj 
 * @param {string} path 
 * @param {any} defaultValue 
 */
const _get = (obj, path, defaultValue) => {
    const pathLIst = Array.isArray(path) ? path : path.replace(/\[(.*?)\]/g, '.$1').split('.');

    const res = pathLIst.reduce((p, c) => {
        return p?.[c];
    }, obj);
    return res ?? defaultValue;
};

const object = { 'a': [{ 'b': { 'c': 3 } }] };
console.log(_get(object, 'a[0].b.c'));
console.log(_get(object, 'a[0].b.c'));
console.log(_get(object, ['a', '0', 'b', 'c']));
