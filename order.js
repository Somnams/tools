import BinaryTree from "./classes";

const tree = new BinaryTree('A');
tree.left = new BinaryTree('B');
tree.right = new BinaryTree('C');

console.log(tree);

const preOrder = (root) => {};