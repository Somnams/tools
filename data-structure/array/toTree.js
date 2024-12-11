/**
 * @param {Array<any>} arr 
 */
const toTree = (arr, root) => {
    return arr.filter(item => item.parent_id === root).map(i => ({ ...i, children: toTree(arr, i.id) }));
};