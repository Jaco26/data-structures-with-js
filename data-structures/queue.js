/*
  QUEUES

  WHAT IS A QUEUE
  - A FIFO data structure (First In First Out)
  
  USES
  - Waiting to join an online game? There's a queue
  - Background tasks
  - Uploading or downloading resources (not great example because of concurrency)
  - Printing / Task processing

  Big O of Queues
  - Insertion O(1) ...IMPORTANT
  - Removal O(1) ...IMPORTANT
  - Searching O(n) ...not important operation
  - Access O(n) ...not important operation
*/

// A QUEUE WITH AN ARRAY
const queueArray = [];

queueArray.push(1);
queueArray.push(2);
queueArray.push(3);
queueArray.shift();
queueArray.shift();
queueArray.shift();


// OUR OWN QUEUE CLASS
class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.first = null;
    this.last = null;
    this.size = 0;
  }

  enqueue(val) {
    const newNode = new Node(val);
    if (!this.first) {
      this.first = newNode;
      this.last = newNode;
    } else {
      this.last.next = newNode;
      this.last = newNode;
    }
    return ++this.size;
  }

  dequeue() {
    if (!this.first) return null;
    const temp = this.first;
    if (this.first === this.last) {
      this.last = null;
    }
    this.first = this.first.next;
    this.size -= 1;
    return temp.val;
  }
}

const queue = new Queue();

console.log(queue.enqueue(9))
queue.enqueue(94)
queue.enqueue(32)
console.log(queue.dequeue());
