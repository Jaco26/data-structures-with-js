/*
  Objectives:
  1: Define what recursion is and how it can be used
  2: Understand the two essential components of a recursive function
  3: Visualize the call stack to better debug and understand recursive functions
  4: Use helper method recursion and pure recursion to solve more difficult problems
*/

/*
  WHAT IS RECURSION:
    - A process (a function) that calls itself

  WHY SHOULD WE USE IT?
    - It is good for object traversal
    - Writing our own data structures and accompanying parse functions
    - It can be cleaner than iterations

  WHAT HAPPENS BEHIND THE SCENES OF FUNCION CALLS IN JAVASCRIPT?
    - In almost all programing languages, there is a built in data structure
      that manages what happens when functions are invoked
    - THE CALL STACK:
      - When a function is invoked, it is placed on the TOP of the call stack
      - First in last out
      - Like a stack of papers on a desk...or toy blocks
  
  WHY IS THE CALL STACK IMPORTANT?
    - We're used to functions being pushed on the call stack and popped off
      when they are done.
    - When we write recursive functions, we keep pushing new functions onto
      the call stack (the same function)
    - It has to end somewhere...


*/

/*
  SUCCESSFUL RECURSIVE FUNCTION MUST INCLUDE THESE TWO ELEMENTS:
    - A Base Case - the condition when recursion ends
    - Different Input - each call should be passed different data than the 
      previous calls
*/

function countDown(num) {
  if (num <= 0) {
    // console.log('All done!');
    return 'All done!';
  }
  console.log(num);
  num--;
  return countDown(num);
}
// console.log(countDown(10));

function sumRange(num) {
  if (num === 1) return num;
  return num + sumRange(num - 1);
}
// console.log(sumRange(10));

function factorial(num) {
  if (num === 1) return num;
  return num * factorial(num - 1);
}

console.log(factorial(10));

/*
  COMMON PITFALLS:
    - No Base Case
    - Not returning when the base case is reached - function is not popped off 
      of call stack and max call stack size is eventaully exceeded 
      STACK OVERFLOW!!!
     
*/

/*
  HELPER METHOD RECURSION
  - A common design pattern with:
    - An "outer" function containing "outer scoped" variable(s)
    - An "inner" recursive function that mutates the outer scoped variable(s)
*/


function collectOddValues(arr) {
  let result = [];
  function helper(helperInput) {
    if (helperInput.length === 0) return;
    if (helperInput[0] % 2 !== 0) result.push(helperInput[0]);
    helper(helperInput.slice(1))
  }
  helper(arr);
  return result;
}

const oddValues = collectOddValues([1,2,3,4,5,6,7,8,9,10]);
console.log(oddValues);


function pureCollectOddValues(arr) {
  let newArr = [];
  if (arr.length === 0) {
    return newArr;
  }
  if (arr[0] % 2 !== 0) {
    newArr.push(arr[0]);
  }
  newArr = newArr.concat(pureCollectOddValues(arr.slice(1)));
  return newArr;
}

const purlyOddValues = pureCollectOddValues([1,2,3,4,5]);
console.log(purlyOddValues);
