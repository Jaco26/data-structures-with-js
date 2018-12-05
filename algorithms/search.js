/*
  OBJECTIVES:
    - Describe what a searching algoithm is
    - Implement linear search on arrays
    - Implement binary search on sorted arrays
    - Implement a naive string searching algorithm
    - Implement the KMP string searching algorithm
*/

var data = [1,2,3,4,5,6,7,8,9,11,13,14,15,16,18,19,20,22,25,27,28,29,31,33,34,47,52];

function prt(item) {
  console.log(item);
}

// O(n)
function lenearSearch(val, arr) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === val) {
      return i;
    }
  }
  return -1
}

// prt(lenearSearch('Caroline', ['Jacob', 'Caroline', 'Ilana', 'Darius']))

// Data MUST be sorted
function binarySearchIncludes(val, arr) {
  console.log(arr)
  if (arr.length === 1) return false;
  const guessIndex = Math.floor(arr.length / 2);
  const guess = arr[guessIndex];
  if (guess === val) return true;
  if (guess > val) return binarySearch(val, arr.slice(0, guessIndex));
  return binarySearch(val, arr.slice(guessIndex));
}
// binarySearch(21, data);


// // MY IMPLEMENTATION
// function binarySearchIndexOf(val, inputArr) {
//   let lower = 0;
//   let upper = inputArr.length - 1;
//   let guessIndex = middle(lower, upper);

//   function middle(low, high) {
//     const difference = high - low;
//     return Math.floor(high - (difference / 2))
//   }

//   function helper(arr) {
//     console.log(upper, lower, guessIndex)
//     if (guessIndex === lower) return -1;
//     if (arr[guessIndex] === val) return guessIndex;
//     if (arr[guessIndex] > val) {
//       upper = guessIndex;
//       guessIndex = middle(lower, upper);
//       return helper(arr);
//     }
//     lower = guessIndex;
//     guessIndex = middle(lower, upper);
//     return helper(arr);
//   }
//   return helper(inputArr);
// }
// console.log(binarySearchIndexOf(52, data));

// MY MODIFIED IMPLEMENTATION
function binarySearchIndexOf2(val, inputArr) {
  let lower = 0;
  let upper = inputArr.length - 1;
  let midpoint = (upper + lower) / 2;
  function helper(arr) {
    console.log(lower, upper, midpoint, val);
    if (arr[midpoint] === val) return midpoint;
    if (lower >= upper) return -1;
    if (arr[midpoint] > val) upper = midpoint - 1;
    else lower = midpoint + 1;
    midpoint = Math.floor((upper + lower) / 2);
    return helper(arr);
  }
  return helper(inputArr);
}
// console.log(binarySearchIndexOf2(52, data));


function coltBinarySearch(arr, elem) {
  let start = 0;
  let end = arr.length - 1;
  let middle = Math.floor((start + end) / 2);
  while (arr[middle] !== elem && start <= end) {
    console.log(start, middle, end);
    if (elem < arr[middle]) {
      end = middle - 1;
    } else {
      start = middle + 1;
    }
    middle = Math.floor((start + end) / 2);
  }
  return arr[middle] === elem ? middle : -1;
}
// console.log(coltBinarySearch(data, 15))

// console.log(data.length); 

// console.log(Math.log2(data.length))



function naiveStringSearch(str, substr) {
  let count = 0;
  for (let i = 0; i < str.length; i++) {
    if (str[i] === substr[0]) {
      for (let j = 0; j < substr.length; j++) {
        if (substr[j] === str[i + j]) {
          if (j === substr.length - 1) {
            count++;
          }
          continue;
        } else {
          break;
        }
      }
    }
  }
  return count;
}

console.log(naiveStringSearch('hahah how are you ya pirate arr!', 'ar'))