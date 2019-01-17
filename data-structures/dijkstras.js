/*
  DIJKSTRA'S ALGORITHM (the path-finding one)

  WHAT IS IT:
  - One of the most famous and widly used algorithms

  WHAT DOES IT DO:
  - Find the shortest path between two vertices on a graph
  - "What is the fast way to get from point A to point B"

  WHO WAS DIJKSTRA:
  - He was a Dutch programmer, physicist, essayist, all around smarty-pants
  - He helped to advance the field of computer science from an "art" to an academic discipline
  - Many of his discoveries and algorithms are still commonly used today

  WHY IS IT USEFUL:
  - GPS: finding fastest route
  - Network Routing: finds open shortest path for data
  - Biology: Used to model the spread of viruses among humans
  - Airline Tickets: Finding cheapest route to your distination
  - Many more...
*/

/*
  First, we need a Weighted Graph...
*/

// class WeightedGraph {
//   constructor() {
//     this.adjacencyList = {};
//   }
//   addVertex(vertex) {
//     if (!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
//   }
//   addEdge(vertex1, vertex2, weight) {
//     this.adjacencyList[vertex1].push({ node: vertex2, weight });
//     this.adjacencyList[vertex2].push({ node: vertex1, weight });
//   }
// }

// const graph = new WeightedGraph();

// graph.addVertex("A");
// graph.addVertex("B");
// graph.addVertex("C");
// graph.addVertex("D");
// graph.addVertex("E");
// graph.addVertex("F");

// graph.addEdge("A", "B", 4);
// graph.addEdge("A", "C", 2);
// graph.addEdge("B", "E", 3);
// graph.addEdge("E", "D", 3);
// graph.addEdge("E", "F", 1);
// graph.addEdge("F", "D", 1);
// graph.addEdge("F", "C", 4);
// graph.addEdge("C", "D", 2);

// console.log(graph);

/*
  Now, on to Dijkstra's

  The Approach:
  1: Every time we look to visit a new node, we pick the node with the smallest
     known distance to visit first
  2: Once we've moved to the node we're going to visit, we look at each of its
     neighbors
  3: For each neighboring node, we calculate the distance by summing the total
     edges that lead from the starting node to the node we're checking
  4: If the new total distance to a node is less than the previous total, we store
     the new shorter distance for that node
  
  We will implement a priotity queue to organize our nodes.
  In this case, they will be ordered in terms of distance.

*/

// NAIVE PriorityQueue
class NaivePriorityQueue {
  constructor() {
    this.values = [];
  }
  enqueue(val, priority) {
    this.values.push({ val, priority });
    this.sort();
  }
  dequeue() {
    return this.values.shift();
  }
  sort() {
    this.values.sort((a, b) => a.priority - b.priority);
  }
}

const q = new NaivePriorityQueue();

q.enqueue('b', 3);
q.enqueue('c', 5);
q.enqueue('d', 2);
q.enqueue('q', 20);

console.log(q);
//////////////////////////////////////////////////////////////////////////
// Priority Queue implemented with much more efficient Min Binary Heap ///
//////////////////////////////////////////////////////////////////////////
class PQNode {
  constructor(val, priority) {
    this.value = val;
    this.priority = priority;
  }
}

class MinBinaryHeapPriorityQueue {
  constructor() {
    this.values = [];
  }

  enqueue(val, priority) {
    const newNode = new PQNode(val, priority);
    this.values.push(newNode);
    this.bubbleUp();
  }

  bubbleUp() {
    let idx = this.values.length - 1;
    const element = this.values[idx];
    while (idx > 0) {
      let parentIdx = Math.floor((idx - 1) / 2);
      let parent = this.values[parentIdx];
      if (element.priority >= parent.priority) break; // The >= (as opposed to <=) makes this a minBinaryHeap
      this.values[parentIdx] = element;
      this.values[idx] = parent;
      idx = parentIdx;
    }
  }

  dequeue() {
    const min = this.values[0];
    const end = this.values.pop();
    if (this.values.length) {
      this.values[0] = end;
      this.sinkDown();
    }
    return min;
  }

  sinkDown() {
    let index = 0;
    const length = this.values.length;
    const element = this.values[0];
    while (true) {
      let leftChildIdx = 2 * index + 1;
      let rightChildIdx = 2 * index + 2;
      let leftChild, rightChild;
      let swap = null;
      if (leftChildIdx < length) {
        leftChild = this.values[leftChildIdx];
        if (leftChild.priority < element.priority) { // The < (as opposed to >) makes this a minBinaryHeap
          swap = leftChildIdx;
        }
      } 
      if (rightChildIdx < length) { 
        rightChild = this.values[rightChildIdx];
        if (
            (!swap && rightChild.priority < element.priority) || // The <(as opposed to >) makes this a minBinaryHeap
            (swap && rightChild.priority < leftChild.priority) // The < (as opposed to >) makes this a minBinaryHeap
          ) {
            swap = rightChildIdx;
        }
      }
      if (!swap) break;
      this.values[index] = this.values[swap];
      this.values[swap] = element;
      index = swap;
    }
  }

}


class WeightedGraph {
  constructor() {
    this.adjacencyList = {};
  }
  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
  }
  addEdge(vertex1, vertex2, weight) {
    this.adjacencyList[vertex1].push({ nodeVal: vertex2, weight });
    this.adjacencyList[vertex2].push({ nodeVal: vertex1, weight });
  } 
/*
  Dijkstra's Pseudocode
  1 This function should accept a starting and ending vertex
  2 Create an object (we'll call it "distances") and for each vertex in the adjacency
    list, set a key on distances with a value of "infinity" except for the starting vertex
    which should have a value of 0
  3 After setting a vlaue in the distances object, add each vertex with a priority of Infinity to
    the priority queue, except the starting vertex, which should have a priority of 0 because that's
    where we begin
  4 Create another object called "previous" and using each vertex in the adjacency list, set a key
    with a value of null
  5 Start looping as long as there is anything in the priority queue
    5.1 Dequeue a vertex from the priority queue---get the node with the smallest known distance
    5.2 If that vertex is the same as the ending vertex - we are done!
    5.3 Otherwise, loop trhough each value in the adjacency list at that vertex
      5.31 Calculate the distance to that vertex from the starting vertex
      5.32 If the distance is less than what is currently stored in our distances object
        5.32.1 Update the distances object with the new lower distance
        5.32.2 Update the previous object to contain that vertex
        5.32.3 Enqueue the vertex with the total distance from the start node
*/  
  dijkstras(start, end) { // 1
    // const priorityQueue = new NaivePriorityQueue();
    const priorityQueue = new MinBinaryHeapPriorityQueue();
    const distances = {}; // Store the current shortest distances between "start" and all other nodes.
    const pathSteps = {}; // Hold a key for each vertex in this.adjacencyList. the values are initialized as "null"
                          // but they will be updated to be other verticies as we go...
    const finalPath = []; // Use this to build the final shortest path between "start" and "end" 
    
    Object.keys(this.adjacencyList).forEach(vertex => {      
      distances[vertex] = vertex === start ? 0 : Infinity; // 2
      priorityQueue.enqueue(vertex, distances[vertex]); // 3
      pathSteps[vertex] = null; // 4
    });    

    let currentNode;
    while(priorityQueue.values.length) {       // 5
      currentNode = priorityQueue.dequeue().value;  // 5.1
      if (currentNode === end) { // 5.2
        while(pathSteps[currentNode]) {
          finalPath.push(currentNode);
          currentNode = pathSteps[currentNode];
        }
        return finalPath.concat(currentNode).reverse();
      }            
      if (currentNode || distances[currentNode] !== Infinity) {
        let iOfcurrentNodeNeighbor, neighborOfCurrentNode, testDistance;
        for (iOfcurrentNodeNeighbor in this.adjacencyList[currentNode]) { // 5.3
          // Using a for...in loop to iterate over an array, each <prop> ("neighbor" here), is actually
          // just the array index. We use this to...
          // Find a neighboring node of the node popped off of the priority queue
          neighborOfCurrentNode = this.adjacencyList[currentNode][iOfcurrentNodeNeighbor]; // "currentNode" is a letter, "neighbor" is an index
          // Calculate the distance to the neighboring node
          testDistance = distances[currentNode] + neighborOfCurrentNode.weight;  // 5.31 
          if (testDistance < distances[neighborOfCurrentNode.nodeVal]) {         // 5.32
            // updating new smallest distance to neighbor
            distances[neighborOfCurrentNode.nodeVal] = testDistance;             // 5.32.1
            // updating pathSteps - how we got to neighbor
            pathSteps[neighborOfCurrentNode.nodeVal] = currentNode;                       // 5.32.2
            priorityQueue.enqueue(neighborOfCurrentNode.nodeVal, testDistance);
          }
        }
      }
    }
  }
}

const graph = new WeightedGraph();

graph.addVertex("A");
graph.addVertex("B");
graph.addVertex("C");
graph.addVertex("D");
graph.addVertex("E");
graph.addVertex("F");

graph.addEdge("A", "B", 4);
graph.addEdge("A", "C", 2);
graph.addEdge("B", "E", 3);
graph.addEdge("E", "D", 3);
graph.addEdge("E", "F", 1);
graph.addEdge("F", "D", 1);
graph.addEdge("F", "C", 4);
graph.addEdge("C", "D", 2);

console.log(graph);

const dijkstrasResult = graph.dijkstras('A', 'F')
console.log(dijkstrasResult);