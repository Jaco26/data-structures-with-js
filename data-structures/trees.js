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
*/

class Node {
  constructor() {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor(value) {
    this.root = null;
  }

  insert() {

  }

  find() {

  }
}

const tree = new BinarySearchTree();


