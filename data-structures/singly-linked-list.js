
/*
  OBJECTIVES:
  - Define what a Singly Linked List is
  - Compare and contrast Linked Lists with Arrays
  - Implement insertion, removal and traversal methods

  DEFINITION:
  - A data structure that constains a "head", "tail" and "length" property
  - Linked Lists consist of nodes, each "node" has a "value" and a "pointer" to another node or null

  COMPARED TO ARRAYS
  - Lists
      - Do not have indexes
      - Connected via nodes with a "next" pointer
      - Random access is not allowed
  
  - Arrays
      - Indexed in order
      - Insertion and deletion can be expensive
      - Can quickly be accessed at a specific index
*/

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

// VERY simple singly linked list...
const first = new Node('Hi');
first.next = new Node('there');
first.next.next = new Node('How');
first.next.next.next = new Node('are');
first.next.next.next.next = new Node('you?')

class SinglyLinkedList {
  constructor() {
    // initialized with no arguments
    this.length = 0;
    this.head = null;
    this.tail = null;
  }

  toArr(full = false) {
    const accum = [];
    let current = this.head;
    for (let i = 0; i < this.length; i++) {
      const value = full ? current : current.val;
      accum.push(value);
      current = current.next;
    }
    return accum;
  }

  push(val) {
    const node = new Node(val);
    if (!this.head) {
      this.head = node;
      this.tail = this.head;
    } else {
      this.tail.next = node;
      this.tail = node;
    }
    this.length += 1;
    return this;
  }

  pop() {
    if (!this.head) return undefined;
    let current = this.head;
    let newTail = current;
    while (current.next) {
      newTail = current;
      current = current.next;
    }
    this.tail = newTail;
    this.tail.next = null;
    this.length -= 1;
    if (this.length === 0) {
      this.head = null;
      this.tail = null;
    }
    return current;
  }

  shift() {
    if (!this.head) return undefined;
    let currentHead = this.head;
    this.head = currentHead.next;
    this.length -= 1;
    if (this.length === 0) {
      this.tail = null;
    }
    return currentHead;
  }

  unshift(val) {
    const newHead = new Node(val);
    if (!this.head) {
      this.head = newHead;
      this.tail = this.head;
    } else {
      newHead.next = this.head;
      this.head = newHead;
    }
    this.length += 1;
    return this;
  }

  get(num) {
    if (num < 0 || num >= this.length) return null;
    let traverser = this.head;
    for (let i = 0; i < num; i++) {
      traverser = traverser.next;
    }
    return traverser;
  }

  insert(index, val) {
    if (index < 0 || index > this.length) return false;
    else if (index === this.length) return !!this.push(val); // !! is a boolean operator that "double negates" whatever is returned --- an array --- coerced boolean
    else if (index === 0) return !!this.unshift(val);
    const nodeBeforeIndex = this.get(index - 1);
    if (nodeBeforeIndex) {
      const newNode = new Node(val);
      newNode.next = nodeBeforeIndex.next
      nodeBeforeIndex.next = newNode;
      this.length += 1;
      return true
    }
  }

  remove(index) {
    if (index < 0 || index > this.length) return undefined;
    else if (index === this.length - 1) return this.pop();
    else if (index === 0) return this.shift();
    const nodeBeforeIndex = this.get(index - 1);
    if (nodeBeforeIndex) {
      const removedNode = nodeBeforeIndex.next;
      nodeBeforeIndex.next = removedNode.next;
      this.length -= 1;
      return removedNode;
    }
  }


  reverse() {
    // reverse the pointers
    // make "next" point to "val"
    // start at the head
    let n = this.length;
    let oldBigSpoon = this.head;
    let newBigSpoon = oldBigSpoon.next;
    let nextBigSpoon = newBigSpoon.next;
    newBigSpoon.next = oldBigSpoon;
    oldBigSpoon = newBigSpoon;
    newBigSpoon = nextBigSpoon;
    nextBigSpoon = nextBigSpoon.next
    



    // let newBigSpoon = currentNode.next;
    // let oldBigSpoon = currentNode;
    // while (n > 0) {
    //   newBigSpoon.next = currentNode;
    //   currentNode = newBigSpoon.next;
    //   oldBigSpoon = currentNode;
    //   n--;
    // }
    console.log('done');
    
    return this;
  }

}

const list = new SinglyLinkedList();

list.push('Hello')
list.push('how')
list.insert(2, 'are')
list.push('You')
list.unshift('Hey')


console.log(list.toArr());
// console.log('head ->', list.head);
// console.log('tail ->', list.tail);



const reversed = list.reverse();

console.log(reversed.toArr());
// console.log(list.head.val);
// console.log(list.tail.val);



// this.tail = this.head;
// let walker = this.head;
// let next = walker.next;



// reverse() {
//   this.head = this.tail;
//   let next;
//   let prev;
//   let current = this.head;
//   for (let i = 0; i < this.length; i++) {
//     next = current.next;
//     current.next = prev;
//     prev = current;
//     current = next;
//   }
//   return this;
// }