/*
  TREE TRAVERSAL

  Given any sort of tree, how do you visit each node once?

  Two common ways:
  - Bredth First
      Visit every sibling node before going to a child node

  - Depth First
      work veritcally
    - InOrder
    - PreOrder
    - PostOrder

  Breadth Or Depth First: which is better?
  - BFS compared to DFS in general:
    - Time complexity is equal; we're visiting every node
    - Space complexity:

      Given a very fleshed out/wide tree where the bottom levels grow
      to include a ton of nodes:
      - With Breadth First, our queue of nodes yet to visit will 
        grow a lot
      - With Depth First, we don't have to keep track of all nodes at a 
        given level in the tree, we only need to keep track of a given branch.

      Given a tree with a single long branch:
      - With Breadth First, our queue need barely store anything
      - With Depth First, we must keep track of the whole branch in
        memory (with the call stack full of our recursive function)

  DFS Use Cases:
  - InOrder:
      Given a Binary Search Tree, InOrder will return all the values in
      the correct sorted order.
  - PreOrder:
      Can be useful to clone or duplicate a tree; or flatten it out so
      you can store it in a file or database and recreate it later
      from that serialized structure


  RECAP OF TREES
  - Non-linear data structures that contain a root and child nodes
  - Binary Trees can have values of any type, but at most two children 
    for each parent
  - Binary Search Trees are a specific version of binary trees where very node 
    to the left of a parent is less than the parent's value and every node to
    the right is greater

*/



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

function breadthFirstSearch(bst) {
  let node = bst.root;
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

function DFSPreOrder(bst) {
  const accum = [];
  function traverse(node) {
    accum.push(node.value);
    if (node.left) traverse(node.left);
    if (node.right) traverse(node.right);
  }
  traverse(bst.root);
  return accum;
}

function DFSPostOrder(bst) {
  const accum = [];
  function traverse(node) {
    if (node.left) traverse(node.left);
    if (node.right) traverse(node.right);
    accum.push(node.value);
  }
  traverse(bst.root);
  return accum;
}

function DFSInOrder(bst) {
  const accum = [];
  function traverse(node) {
    if (node.left) traverse(node.left);
    accum.push(node.value);
    if (node.right) traverse(node.right);
  }
  traverse(bst.root);
  return accum;
}
