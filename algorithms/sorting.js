/*

  Intro To Sorting

  Sorting is the process of rearranging the items in a collection (e.g. an array) so that 
  the items are in some kind of order.

  Examples:
    - sorting numbers from smallest to largest,
    - sorting names alphabetically,
    - sorting movies based on release year,
    - sorting movies based on revenue

  Why:
    - Sorting is an incredibly common task in programming so it's good to know how it works
    - There are many different ways to sort things, and different techniques have their own advantages
      and disadvantages
    - Interviews

  Objectives:
    - Implement bubble sort
    - Implement selection sort
    - Implement insertion sort
    - Understand why it is important to learn these simpler sorting algorithms
*/

// JavaScript built-in Array.sort()
const names = ['Jacob', 'Caroline', 'Ilana', 'Darius'];
const nums = [11, 4, 2, 14, 9];

console.log(names.sort()); // Works the way we would expect
console.log(nums.sort()); // What the heck?!?!?!

// "The default sort order is according to Unicode code points." - MDN
// It accepts an optional 'comparitor' function as an argument
//  - if this function returns a negative number, 'a' should come before 'b'
//  - if this function returns a positive number, 'b' should come before 'a'
//  - if 0 is returned, no change in order happens

console.log(nums.sort((a, b) => a - b)); // sort by numerical value ascending
console.log(names.sort((a, b) => a.length - b.length)); // sort by string length ascending



/*
  BUBBLE SORT
  - generally inefficient (in some rare cases, it is)
  - good to understand so as to see how other algorithms improve upon it

  Why called bubble sort?
    - The idea is that, with an array, the larger items will bubble to the top one at a time
    - compare adjacent elements
      - if a > b: swap a and b
*/
function bubbleSort(arr) {
  let noSwaps = true; // colt optimization
  for (let i = arr.length - 1; i >= 0; i--) {
    for (let j = 0; j <= i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]; // swap using es6 array destructuring
        noSwaps = false;
      }
    }
    if (noSwaps) { // colt optimization
      break;
    }
  }
  return arr;
}

console.log('bubble sort:', bubbleSort([4,7,3,2,9,4,8]))


/*
  SELECTION SORT
  - Similar to bubble sort, but instead of first placing large values into 
    sorted position, it places small values into sorted position.
  
    ...
*/