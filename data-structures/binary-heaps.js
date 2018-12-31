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

// Representing a Heap Using an Array
// - For any parent index of an array n...
// - The left child is stored at 2n + 1
// - The right child is at 2n + 2

// - For any child node at index n...
// - Its parent is at index Math.floor((n - 1) / 2)

class MaxBinaryHeap {
  constructor() {
    this.values = [];
  }

  insert(element) {
    // add to the end
    // bubble up
    this.values.push(element);
    let childIndex = this.values.length - 1;
    let parentIndex = Math.floor((childIndex - 1) / 2);
    let swapBox;
    // While the value at values[parentIndex] < values[childIndex]
    while (this.values[parentIndex] < this.values[childIndex]) {
      // swap the value of the values element at parentIndex with the 
      // element at childIndex
      // Set childIndex = parentIndex
      swapBox = this.values[parentIndex];
      this.values[parentIndex] = this.values[childIndex];
      this.values[childIndex] = swapBox;
      childIndex = parentIndex;
      parentIndex = Math.floor((childIndex - 1) / 2);
    }
  }

  /*
    Removing the maximum value in a max binary heap:
    - useful in a priority queue

    Remove from the root
    Replace with the most recently added
    Adjust (sink down)
     - the procedure for deleting the root from the heap
       (effectively extracting the maximum element in a max-heap
        or the minimum element in a min-heap) and restoring the
        properties
     - also known as: bubble-down, percolate-down, sift-down
                      trickle down, heapify-down, cascade-down
                      extract-min/max

    STEPS:
    - Swap the first value in this.values with the last one
    - Pop from this.values so you can return the value at the end
    - Have the new root "sink down" to the correct spot
        - Your parent index starts at 0 (the root)
        - Find the index of the left child (make sure it's not out of bounds)
        - Find the index of the right child (make sure it's not out of bounds)
        - If the left or right child is greater than the element, swap. If
          both left and right children are larger, swap with the largest child
        - The child index you swapped to now becomes the new parent index
        - Keep looping and swapping until neither child is larger than the element
        - Return the old root
  */

  extractMax() { 
    // swap the first value in this.values with the last one and 
    // pop from this.values, so you can return the value at the end
    const max = this.values[0];
    const end = this.values.pop();
    if (this.values.length > 0) {
      this.values[0] = end;
      this.sinkDown();
    }
    return max;
  }

  sinkDown() {
    let index = 0;
    const length = this.values.length;
    const element = this.values[0];
    while (true) {
      let leftChildIdx = 2 * index + 1;
      let rightChildIdx = 2 * index + 2;
      let leftChild, rightChild;
      let swap = null;
      if (leftChildIdx < length) {
        leftChild = this.values[leftChildIdx];
        if (leftChild > element) {
          swap = leftChildIdx;
        }
      } 
      if (rightChildIdx < length) {
        rightChild = this.values[rightChildIdx];
        if (
            (!swap && rightChild > element) || 
            (swap && rightChild > leftChild)
          ) {
            swap = rightChildIdx;
        }
      }
      if (!swap) break;
      this.values[index] = this.values[swap];
      this.values[swap] = element;
      index = swap;
    }
  }

}

const heap = new MaxBinaryHeap();

heap.insert(41);
heap.insert(39);
heap.insert(33);
heap.insert(18);
heap.insert(27);
heap.insert(12);
heap.insert(55);

console.log(heap.values);
console.log(heap.extractMax())
console.log(heap.values);

/*
  WHAT IS A PRIORITY QUEUE
  - It's a data structure where each element has a priority.
    Elements with higher priorities are served before elemenets
    with lower priorities
  - A Priority Queue is an abstract concept, you could implement
    one with an Array or a List


  Steps:
  - Write a Min Binary Heap - lower number means higher priority
  - Each Node has a value and a priority. Use the priority to build the heap
  - Enqueue method accepts a value and a priority, makes a new 
    Node, and puts it in the right spot based off its priority
  - Dequeue method removes the root element, returns it, and 
    rearranges heap using priority
*/

class PQNode {
  constructor(val, priority) {
    this.value = val;
    this.priority = priority;
  }
}

class PriorityQueue {
  constructor() {
    this.values = [];
  }

  enqueue(val, priority) {
    const newNode = new PQNode(val, priority);
    this.values.push(newNode);
    this.bubbleUp();
  }

  bubbleUp() {
    let idx = this.values.length - 1;
    const element = this.values[idx];
    while (idx > 0) {
      let parentIdx = Math.floor((idx - 1) / 2);
      let parent = this.values[parentIdx];
      if (element.priority <= parent.priority) break;
      this.values[parentIdx] = element;
      this.values[idx] = parent;
      idx = parentIdx;
    }
  }

  dequeue() {
    const max = this.values[0];
    const end = this.values.pop();
    if (this.values.length) {
      this.values[0] = end;
      this.sinkDown();
    }
    return max;
  }

  sinkDown() {
    let index = 0;
    const length = this.values.length;
    const element = this.values[0];
    while (true) {
      let leftChildIdx = 2 * index + 1;
      let rightChildIdx = 2 * index + 2;
      let leftChild, rightChild;
      let swap = null;
      if (leftChildIdx < length) {
        leftChild = this.values[leftChildIdx];
        if (leftChild.priority > element.priority) {
          swap = leftChildIdx;
        }
      } 
      if (rightChildIdx < length) {
        rightChild = this.values[rightChildIdx];
        if (
            (!swap && rightChild.priority > element.priority) || 
            (swap && rightChild.priority > leftChild.priority)
          ) {
            swap = rightChildIdx;
        }
      }
      if (!swap) break;
      this.values[index] = this.values[swap];
      this.values[swap] = element;
      index = swap;
    }
  }

}

let ER = new PriorityQueue();
ER.enqueue('common cold', 1);
ER.enqueue('gunshot wound', 5);
ER.enqueue('high fever', 2);

// console.log(ER);
// ER.dequeue();

// INCOMPLETE
