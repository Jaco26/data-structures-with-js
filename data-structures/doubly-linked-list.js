/*
  OBJECTIVES
  - Construct a Doubly Linked List
  - Compare and contrast Doubly and Singly Linked Lists
  - Implement basic operations on a Doubly Linked List

  WHAT IS IT?
  - Almost identical to Singly Linked List, except every node
    has another pointer, to the previous node

  Compared to Signly Linked Lists
  - More flexible
  - Uses more memory

  Big O of Doubly Linked Lists:
    - Insertion O(1)
    - Removal O(1)
    - Searching O(n)
    - Access O(n)

  Recap:
    - Doubly Linked Lists are almost identical to Singly Linked Lists except
      there is an additional pointer (useful for something like browser history...)
    - Better than Singly Linked Lists for finding nodes and can be done in half the time
    - However, they do take up more memory considering the extra pointer

*/

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
    this.prev = null;
  }
}


class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
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
    const newNode = new Node(val);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      // console.log('\nline 51: this.tail\n---------------\n', this.tail);
      newNode.prev = this.tail;
      // console.log('\nline 53: newNode\n---------------\n', newNode);
      this.tail = newNode;
      // console.log('\nline 55: this.tail\n---------------\n', this.tail);
    }
    this.length += 1;
    return this;
  }

  pop() {
    if (!this.tail) return undefined;
    const poppedNode = this.tail;
    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.tail = poppedNode.prev;
      this.tail.next = null;
      poppedNode.prev = null;
    }
    this.length -= 1;
    return poppedNode;
  }

  shift() {
    if (!this.head) return undefined;
    const oldHead = this.head;
    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = oldHead.next;
      this.head.prev = null; // this value used to the be the head...
      oldHead.next = null; // cut off list linkages from return value
    }
    this.length -= 1;
    return oldHead
  }

  unshift(val) {
    const newNode = new Node(val); // create a new node
    if (this.length === 0) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head; // point the new node at the current head
      this.head.prev = newNode; // point the current head at the new node
      this.head = newNode; // make the instance's head = the new node
    }
    this.length += 1;
    return this;
  }

  get(index) {
    if (index < 0 || index > this.length - 1) return undefined;
    let cursor = {};
    this.length / 2 >= index
      ? cursor = { dir: 'next', prop: this.head, n: 0, increment: 1 }
      : cursor = { dir: 'prev', prop: this.tail, n: this.length - 1, increment: -1 }
    while (cursor.n !== index) {
      cursor.prop = cursor.prop[cursor.dir];
      cursor.n += cursor.increment;
    }
    return cursor.prop;
  }

  set(index, val) {
    const nodeToUpdate = this.get(index);
    if (nodeToUpdate) {
      nodeToUpdate.val = val;
      return true;
    }
    return false;
  }

  insert(index, val) {
    if (index === 0) return !!this.unshift(val);
    if (index === this.length) return !!this.push(val);
    const foundNode = this.get(index - 1); // get the item at the index before where we want to insert
    if (foundNode) {
      const nodeForAfterNewNode = foundNode.next;
      const newNode = new Node(val);
      foundNode.next = newNode; // point found node at new node
      newNode.prev = foundNode; // point new node and found node
      newNode.next = nodeForAfterNewNode; // point new node at what used to the be the next of the found node
      nodeForAfterNewNode.prev = newNode; // point what used to be the next of the found node at the new node
      this.length += 1;
      return true;
    }
    return false;
  }

  remove(index) {
    if (index === 0) return this.shift();
    if (index === this.length - 1) return this.pop();
    const foundNode = this.get(index);
    if (foundNode) {
      const prevNode = foundNode.prev;
      const nextNode = foundNode.next;
      prevNode.next = nextNode;
      nextNode.prev = prevNode;
      foundNode.next = null;
      foundNode.prev = null;
      this.length -= 1;
      return foundNode;
    }
    return undefined;
  }

}

const dblLnkLst = new DoublyLinkedList();

dblLnkLst.push(3);
dblLnkLst.push(99);
dblLnkLst.push(44);
// dblLnkLst.shift();
dblLnkLst.unshift('Jacob');
// dblLnkLst.pop();



dblLnkLst.insert(5, 'yellow')

// console.log(dblLnkLst.get(2));
console.log(dblLnkLst.remove(3));


console.log(dblLnkLst.toArr())