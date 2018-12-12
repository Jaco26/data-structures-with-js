
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

  - Big O of Singly Linked Lists
    - Insertion: O(1)
        Array average is O(n) because everything to the right of the insertion
        must be reindexed
    - Removal: it depends... O(1) from beginning or O(n) from end
    - Searching: O(n) worst case
    - Accessing: O(n) worst case
        Array has "random access" --- time to access random indexes is constant
        but indexing takes time

    * Singly Linked Lists are an excellent alternative to arrays
    when insertion and deletion at the beginning are frequently required
    * Arrays contain a built-in index whereas Linked Lists do not
    * The idea of a list data structure that consists of nodes
    is the foundation of other data structures like Stacks and Queues

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
    let node = this.head;
    this.head = this.tail;
    this.tail = node;
    let next;
    let prev = null; // we need to make sure the tail of out list is "null"
    for (let i = 0; i < this.length; i++) {
      next = node.next;
      node.next = prev;
      prev = node;
      node = next;
    }
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

const reversed = list.reverse();
console.log(reversed.toArr());
