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
        if (val > cursor.value) {
          if (!cursor.right) {
            cursor.right = newNode;
            return this;
          }
          cursor = cursor.right;
          continue;
        } else if (val < cursor.value) {
          if (!cursor.left) {
            cursor.left = newNode;
            return this;
          }
          cursor = cursor.left;
          continue;
        }
        return 'Sorry but you tried to insert a value equal to a previously inserted value. no no.'
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
}

const tree = new BinarySearchTree();


tree.insert(9, 'Me and you');
tree.insert(25, 'You and me');
tree.insert(2, 'Both of us');
tree.insert(20, 'Together');


console.log(tree.find(25).otherStuff);
