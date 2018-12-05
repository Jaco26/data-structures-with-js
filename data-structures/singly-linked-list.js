
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
    
    this.length += 1;
  }
}

const list = new SinglyLinkedList();