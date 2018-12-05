
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

}

const list = new SinglyLinkedList();
// list.push('Hi');
// list.push('How are ya??');
// list.push(99);

// console.log(list);
list.unshift(84);
// console.log(list);
list.unshift(73);
list.push(99);
console.log(list.head.val);
console.log(list.head.next.val);
console.log(list.head.next.next.val);

console.log(list.length);
console.log(list.get(3));




// console.log(list.head.val);
// console.log(list.pop());
// console.log(list.shift().val);
// console.log(list.head.val);
// list.unshift('mem eme me');
// console.log(list.head);
