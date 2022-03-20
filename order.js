import BinaryTree from "./classes.js";

const tree = new BinaryTree('A');
tree.left = new BinaryTree('B');
tree.right = new BinaryTree('C');
tree.left.left = new BinaryTree('D');
tree.left.right = new BinaryTree('E');
tree.right.right = new BinaryTree('F');

const preOrder = (root) => {
  if (!root) {
    return;
  }
  const stack = [root];
  while (!!stack.length) {
    const cur = stack.pop();
    console.log(cur.val);
    cur.right && stack.push(cur.right);
    cur.left && stack.push(cur.left);
  }
};

const preOrderWithRecursion = (root) => {
  if (!root) {
    return;
  }
  console.log(root.val);
  preOrderWithRecursion(root.left);
  preOrderWithRecursion(root.right);
};

const inOrder = (root) => {
  if (!root) {
    return;
  }
  const stack = [];
  let cur = root;
  while (cur || !!stack.length) {
    while (cur) {
      stack.push(cur);
      cur = cur.left;
    }
    cur = stack.pop();
    console.log(cur.val);
    cur = cur.right;
  }
};

const inOrderWithRecursion = (root) => {
  if (!root) {
    return;
  }
  inOrderWithRecursion(root.left);
  console.log(root.val);
  inOrderWithRecursion(root.right);
};

const postOrder = (root) => {
  if (!root) {
    return;
  }
  const s1 = [root];
  const s2 = [];
  while(!!s1.length) {
    const cur = s1.pop();
    s2.push(cur);
    cur.left && s1.push(cur.left);
    cur.right && s1.push(cur.right);
  }
  while (!!s2.length) {
    const cur = s2.pop();
    console.log(cur.val);
  }
};

const postOrderWithRecursion = (root) => {
  if (!root) {
    return;
  }
  postOrderWithRecursion(root.left);
  postOrderWithRecursion(root.right);
  console.log(root.val);
};

postOrderWithRecursion(tree);
