/*
  WHAT IS A STACK
  - A LIFO data structure

  The last element added to the stack will be the first element
  remove from the stack

  WHERE ARE STACKS USED
  - Managing function invocations
  - Undo / Redo functionality (like in photoshop)
  - Routing (the history object) is treated like a stack
  - We'll use Stacks in Trees and Graphs
*/

// THERE IS MORE THAN ONE WAY TO IMPLEMENT A STACK

// Here it is with an Array...FIFO
const arrayStack = [];
arrayStack.push('gym');
arrayStack.push('store');
arrayStack.push('restaurant');
arrayStack.pop();
arrayStack.pop();
arrayStack.push('bookstore');

// could use shift() and unshift() but these would require 
// all elements in the array to be re-indexed

// HERE IS A CUSTOM IMPLEMENTATION
// ...with a Linked List
class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

class Stack {
  constructor() {
    this.first = null;
    this.last = null;
    this.size = 0;
  }

  toArr(full = false) {
    const accum = [];
    let current = this.first;
    for (let i = 0; i < this.size; i++) {
      const value = full ? current : current.val;
      accum.push(value);
      current = current.next;
    }
    return accum;
  }


  push(val) {
    const newNode = new Node(val);
    if (this.size === 0) {
      this.first = newNode;
      this.last = newNode;
    } else {
      newNode.next = this.first;
      this.first = newNode;
    }
    this.size += 1;
  }

  pop() {
    if (this.size === 0) return null;
    const popped = this.first;
    if (this.size === 1) {
      this.first = null;
      this.last = null;
    } else {
      this.first = popped.next;
    }
    this.size -= 1;
    return popped;
  }
}

const stack = new Stack();
stack.push(9);
stack.push('hello');

console.log(stack.toArr())
console.log(stack);
console.log(stack.pop());

