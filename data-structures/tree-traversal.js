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

function breadthFirstSearch() {
  const queue = [];
  const visited = [];

  while (queue.length) {
    
  }
}

