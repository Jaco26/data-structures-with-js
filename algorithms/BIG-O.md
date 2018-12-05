# Introducing Big O

### Big O Notation is a way to formalize fuzzy, generalizing, counting

## It allows us to talk formally about how the runtime of an algorithm grows as the inputs grow


We say that an algorithm is O(f(n)) if the number of simple oporations the computer
has to do is eventually less than a constant times f(n), as n increases

f(n) means: a function with an input of 'n'

* f(n) could be linear (f(n) = n) ............. runtime grows as n grows
* f(n) could be quadratic (f(n) = n^2) ...... runtime squares as n grows
* f(n) could be constant (f(n) = 1) ........... runtime stays constant regardless of n
* f(n) could be something entirly different!


# Simplifying Big O Expressions

Proportionality relative to n, not quantity of oportaions

O(2n) ----> O(n)  No matter the value of n, the number of oporations will ALWAYS increase proportionally to n
O(500) ---> O(1)  There are always 500 operations ALWAYS. It's constant, so let's call it 1
O(13n2) --> O(n^2) No matter the constant, the number of oporations will always increase at the rate of n squared

### Analyzing complexity with big O can get complicated.
### There are several rules of thumb that can help.
### These rules do NOT ALWAYS work, but they are a good starting point

## 1: Arithmetic operations are constant

## 2: Variable assignment is constant

## 3: Accessing elements in an array (by the index) or object (by key) is constant

## 4: In a loop, the complexity is the length of the loop times the complexity of whatever happens inside of the loop


# Space Complexity

Above discusses Big O as a way of describing algorithm runtime. Here we will discuss Big O as a 
way of describing the amount of space (computer memory) an algorithm takes up. 

## Here we use the idea of Auxiliary Space Complexity
That means that we will only focus on describing the space required by the algorithm, not including space taken up by the inputs.

* So, unless otherwise noted, when we talk about space complexity, technically we'll be talking about auxiliary space complexity.

### Space Complexity in JS (general rules)

- Most primitives (booleans, numbers, undefined, null) are constant space
- Strings require O(n) space (where n is the string length)
- Reference types are generally O(n), where n is the length (for arrays) or the number of keys (for objects)


# Logarithms
- Some algorithms will have big Os other than O(1), O(n), O(n^2)
- Sometimes big O expressions involve more complex mathematical expressions
- Logarithms are not uncommon :(

## What is a log?
A logarithm is the inverse of exponentiation.

- In the way that division and multiplation are inverse pairs, logarithms and exponents are inverse pairs

log2(8) = 3 ---> Log base 2 of 8 equals 3
- Question being answered: 2 to what power, equals 8?

log2(value) = exponent ----> 2^exponent = value

### For big O notation with logs, we'll omit the 2 (or whatever base). 
- In the big picture, base doesn't matter. We care about the trend

## Rule of thumb:
The logarithm of a number roughly measures the number of times you vcan divide that number by 2 before you get a value that's less than or equal to one

## Where do logarithms come up?
- Certain searching algorithms have logarithmic time complexity
- Efficient sorting algorithms
- Reqursion sometimes involves logarithmic space complexity

