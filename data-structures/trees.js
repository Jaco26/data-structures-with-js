/*
  TREES

  WHAT IS A TREE
  - A data structure that consists of nodes in a parent / child
    relationship
  - Lists are linear
  - Trees are nonlinear

  - Terminolgy:
    - Root: The top node in a tree
    - Child: A node directly connected to another node 
            when moving away from the Root
    - Parent: The converse notion of a child
    - Siblings: A group of nodes with the same parent
    - Leaf: A node with no children
    - Edge: The connection between one node and another
  
  WHERE ARE TREES USED
  - HTML DOM
  - Network Routing
  - Abstract Syntax Tree
  - Artificial Intelligence
  - Folders in Operating Systems
  - Computed File Systems

  KINDS OF TREES
  - Trees (in general...)
  - Binary Trees
    - each node can have, at most, 2 children
  - Binary Search Trees
    - each node can have, at most, 2 children
    - they are sorted
    - all items less than any given node are to the left of it
    - all items greater than any given node are to the right

  SEARCHING A BINARY SEARCH TREE
  - compare and move to right or left

  Big O of Binary Search Tree
  - Insertion O(log n) 
  - Searching O(log n) 
  
  as you double the number of nodes, you increase the steps
  required by "insert" and "find" by one

  O(log n) is best case and average Big O
  ...NOT GUARANTEED...
  - Because, some binary search tree configurations are slow
    - one with one "branch"––where every node to the right is larger 
      than the one to its left
      - this would be O(n)

*/


class Node {
  constructor(value, otherStuff) {
    this.value = value;
    this.otherStuff = otherStuff;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor(value) {
    this.root = null;
  }

  insert(val, otherStuff) {
    const newNode = new Node(val, otherStuff);
    if (!this.root) {
      this.root = newNode;
    } else {
      let cursor = this.root;
      while (true) {
        if (val === cursor.value) return 'Sorry but you tried to insert a value equal to a previously inserted value. no no.';
        if (val > cursor.value) {
          if (!cursor.right) {
            cursor.right = newNode;
            return this;
          }
          cursor = cursor.right;
        } else if (val < cursor.value) {
          if (!cursor.left) {
            cursor.left = newNode;
            return this;
          }
          cursor = cursor.left;
        }
      }
    }
  }

  find(val) {
    if (!this.root) return undefined;
    let cursor = this.root;
    while (true) {
      if (val === cursor.value) return cursor;
      if (val > cursor.value) {
        if (!cursor.right) return undefined;
        cursor = cursor.right;
      } else if (val < cursor.value) {
        if (!cursor.left) return undefined;
        cursor = cursor.left;
      }
    }
  }

  contains(val) {
    if (!this.root) return false;
    let cursor = this.root;
    while (true) {
      if (val === cursor.value) return true;
      if (val > cursor.value) {
        if (!cursor.right) return false;
        cursor = cursor.right;
      } else if (val < cursor.value) {
        if (!cursor.left) return false;
        cursor = cursor.left;
      }
    }
  }

  /* 
    Breadth First Search:
    - Create a queue (this can be an array) and a variable
      to store the values of nodes visited
    - Place the root node in the queue
    - Loop as long as there is anything in the queue
      - Dequeue a node from the queue and push the value
        of the node into the variable that stores the nodes
      - If there is a left property on the node dequeued,
        add it to the queue
      - If there is a right property on the node dequeued,
        add it to the queue
    - return the variable that stores all the values
  */
  // Breadth First Search
  BFS() {
    let node = this.root;
    const data = [];
    const queue = [];

    queue.push(node);

    while (queue.length) {
      node = queue.shift();
      data.push(node.value);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    return data;
  }

  /*
    Depth First Search requires three main operations.

    In PreOrder, for any node we need to, at some point:
      - Visit the node itself
      - Look at its left
      - Look at its right

    In PostOrder:
      - Look at a right
      - Look at a left
      - Visit the node those left and right are children of

    In InOrder:
      - Traverse entire left side
      - Visit node
      - Traverse entire right side
  */

  /*
    Depth First Search:
    - Pre order - recursively

    - Create a varible to store the values of the nodes we've visited
    - Store the root of the BST (Binary Search Tree) in a variable called current
    - Write a helper function which accepts a node
      - Push the value of the node to the variable that stores the values
      - If the node has a left property, call the helper function with
        the left property on the node
      - If the node has a right property, call the helper function with the right
        property on the node
  */
  // Depth first search: PreOrder
  DFSPreOrder() {
    const accum = [];
    function traverse(node) {
      accum.push(node.value);
      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);
    }
    traverse(this.root);
    return accum;
  }

  /*
    DFS PostOrder steps:
    - Create a variable to store the values on the nodes visited
    - Store the root of the BST in a variable called current
    - Write a helper function which accepts a node
      - If the node has a left property, call the helper function
        with the left property on the node
      - If the node has a right property, call the helper function
        with the right property on the node
      - Push the value of the node to the varible that stores the values
      - Invoke the helper function with the current variable
    - Return the array of values
  */

  // Depth First search: PostOrder
  DFSPostOrder() {
    const accum = [];
    function traverse(node) {
      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);
      accum.push(node.value);
    }
    traverse(this.root);
    return accum;
  }

  DFSInOrder() {
    const accum = [];
    function traverse(node) {
      if (node.left) traverse(node.left);
      accum.push(node.value);
      if (node.right) traverse(node.right);
    }
    traverse(this.root);
    return accum;
  }

}


const tree = new BinarySearchTree();


tree.insert(10);
tree.insert(6);
tree.insert(15);
tree.insert(3);
tree.insert(8);
tree.insert(20);

console.log('DFSPreOrder', tree.DFSPreOrder());
console.log('DFSPostOrder', tree.DFSPostOrder());
console.log('DFSInOrder', tree.DFSInOrder());
// console.log(tree.find(25).otherStuff);
