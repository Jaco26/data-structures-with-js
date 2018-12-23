/*
  A HEAP IS A TREE

  BINARY HEAPS
    Very similar to a binary search tree, but with some different rules.
    - MaxBinaryHeap: parent nodes are always larger than child nodes.
    - MinBinaryHeap: parent nodes are always smaller than child nodes

    Like a BST
    - Each node can only have two children
    Unlike a BST
    - There is no order from left to right (the order comes vertically)

    Max Binary Heap:
    - Each parent has at most two child nodes
    - The value of each parent node is ALWAYS greater than its child nodes 
    - There is no guarantee about the order (left to right) of sibling nodes
    - A binary heap is as compact as possible. All the children of each node
      are as full as they can be and left children are filled out first

  WHY SHOULD WE KNOW ABOUT HEAPS:
  - We will use a Binary Heap to implement a Priority Queue
  - They are used in Graph Traversal algorithms
  
*/