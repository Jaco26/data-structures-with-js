/*
  A HEAP IS A TREE
  BINARY HEAPS
    Very similar to a binary search tree, but with some different rules.
    - MaxBinaryHeap: parent nodes are always larger than child nodes.
    - MinBinaryHeap: parent nodes are always smaller than child nodes
    Like a BST
    - Each node can only have a maximum of two children
    Unlike a BST
    - There is no order of child node values from left to right (the order comes vertically)

    Max Binary Heap:
    - Each parent has at most two child nodes
    - The value of each parent node is ALWAYS greater than its child nodes 
    - There is no guarantee about the order (left to right) of sibling nodes
    - A binary heap is as compact as possible:
      - All the children of each node are as full as they can be
      - child nodes are filled out left to right
      - child nodes are filled out left to right

  WHY SHOULD WE KNOW ABOUT HEAPS:
  - We will use a Binary Heap to implement a Priority Queue
  - They are used in Graph Traversal algorithms

  BIG O Of (min and max) BINARY HEAPS: 
  - Insertion O(log n)
  - Removal O(log n)
  - Search O(n)
  
*/

// Representing a Heap Using an Array
// - For any parent node at index n of an array
//   - The left child is stored at 2n + 1
//   - The right child is at 2n + 2

// - For any child node at index n of an array
//   - The parent is at index Math.floor((n - 1) / 2)


class MaxBinaryHeap {
  constructor() {
    this.values = [];
  }
  /*
    Insert into MaxBinaryHeap
    - accept a value and push it into this.values
    - bubble up...
      - create a variable called "elementIndex" which is this.values.length - 1
      - create a variable called "parentIndex" which is Math.floor(("elementIndex" - 1) / 2)
      - keep looping as long as the values element at the "parentIndex" is less than the
        values element at the child "elementIndex"
          - swap te value of the values element at this.values["parentIndex"] with the value
            of the element at the child "elementIndex"
          - set "elementIndex" = "parentIndex"
  */
  insert(element) {
    this.values.push(element);
    let elementIndex = this.values.length - 1;
    let parentIndex = Math.floor((elementIndex - 1) / 2);
    let temporaryParentValueHolder;
    while (this.values[parentIndex] < this.values[elementIndex]) { // Execute the code in this block if parentIndex value 
                                                                   // is less than elementIndex value.
      temporaryParentValueHolder = this.values[parentIndex]; // store the parentIndex value so we can...
      this.values[parentIndex] = this.values[elementIndex]; // set the parentIndex value = elementIndex value and then...
      this.values[elementIndex] = temporaryParentValueHolder; // dump the stored parentIndex value from two lines up into 
                                                              // the place that was holding the elementIndex value.
      elementIndex = parentIndex; // Update "elementIndex" to reflect where our "element" is and then...
      parentIndex = Math.floor((elementIndex - 1) / 2); // calculate the next "parentIndex".
    }
  }
 /*
    JAN 10 EXTRACT MAX NOTES

    Removing from a MaxBinaryHeap:

    Why?
    - useful in a priority queue where we want to extract the item of
      maximum value/importance/priority
    
    Method Overview:
    - Remove the root
    - Replace with the most recently added
    - Adjust/"Sink Down" (bubble-down, percolate-down, cascade-down, etc...)
      - Basically just the process of making the heap a valid heap now that
        its highest value parent is gone...
    
    Steps:
    - Swap the first value in this.values with the last one
    - Pop from this.values so you can return the value at the end...the one that's the biggest and was in front
    - Have the newly exposed root "sink down" to its proper (valid MaxBinaryHeap) spot
      - Your "parentIndex" starts at 0, the index of newly exposed (invalid) root
      - Find the index of the left child and verify that it is in bounds
      - Find the index of the right child and verify that it is in bounds
      - If the left or right child is greater than the element, swap. If both
        left and right children are larger, swap with the largest child
      - The child index you swapped to now becomes the new "parentIndex"
      - Keep looping and swapping until neither child is larger than this.values["parentIndex"]
      - Return the old root
      
 */
  extractMax() { 
    const max = this.values[0]; // Hold the max-value element in "max" for returning at the end.
    const oldBottom = this.values.pop(); // Remove the old bottom element so that we can...
    if (this.values.length > 0) { // ...if there's anything left in this.values...
      this.values[0] = oldBottom; // move its value to top of this.values.
      this.sinkDown(); // Then, sink down...adjust the order of things so that the heap is valid and then...
    }
    return max; // return the max-value element we stored on the first line
  }

  sinkDown() {
    const length = this.values.length; // Keep this for quick reference when checking if left and right child indexes are in range.
    const valueToSink = this.values[0]; // The value of the element taken from the end and put at the beginning; the value to sink down.
    let parentIndex = 0; // The value at this index was just popped off of the end of this.values and plopped at the beginning.
    let leftChildIdx, rightChildIdx, leftChild, rightChild, swap;
    while (true) { // As long as we don't explicitly break out of this loop...
      leftChildIdx = 2 * parentIndex + 1; // Calculate the index of the left child and...
      rightChildIdx = leftChildIdx + 1; // the index of the right child (2 * parentIndex + 2)---to save an operation, we just add 1 to the left child index.
      swap = null; // Use this later to check if a swap has occured.
      if (leftChildIdx < length) { // If leftChildIdx is within the range of this.values...
        leftChild = this.values[leftChildIdx]; // store the value at leftChildIdx in leftChild.
        if (leftChild > valueToSink) { // If that value is greater than that of the element we are sinking...
          swap = leftChildIdx; // store leftChildIdx in swap.
        }
      } 
      if (rightChildIdx < length) { // If rightChildIdx is within range...
        rightChild = this.values[rightChildIdx]; // store the value at rightChildIdx in rightChild.
        if (
            (!swap && rightChild > valueToSink) || // If swap has not been set to leftChildIdx AND rightChild is greater than valueToSink...
            (swap && rightChild > leftChild)      // OR, swap has been set to leftChildIdx AND rightChild is greater than leftChild...
          ) {
            swap = rightChildIdx; // store rightChildIdx in swap.
        }
      }
      if (!swap) break; // If swap is still null, no swap took place. The root we are sinking is in a valid position. Break!
                                                    // Otherwise... 
      this.values[parentIndex] = this.values[swap]; // Set the value at parentIndex = the value at the index stored in swap.
      this.values[swap] = valueToSink; // Set the value at whichever childIndex is stored in swap = the value of the element we are sinking down.
      parentIndex = swap; // Set parentIndex = the index stored in swap.
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
      if (element.priority >= parent.priority) break; // The >= (as opposed to <=) makes this a minBinaryHeap
      this.values[parentIdx] = element;
      this.values[idx] = parent;
      idx = parentIdx;
    }
  }

  dequeue() {
    const min = this.values[0];
    const end = this.values.pop();
    if (this.values.length) {
      this.values[0] = end;
      this.sinkDown();
    }
    return min;
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
        if (leftChild.priority < element.priority) { // The < (as opposed to >) makes this a minBinaryHeap
          swap = leftChildIdx;
        }
      } 
      if (rightChildIdx < length) { 
        rightChild = this.values[rightChildIdx];
        if (
            (!swap && rightChild.priority < element.priority) || // The <(as opposed to >) makes this a minBinaryHeap
            (swap && rightChild.priority < leftChild.priority) // The < (as opposed to >) makes this a minBinaryHeap
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

console.log(ER);