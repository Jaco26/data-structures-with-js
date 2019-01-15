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

  When we pick the smallest value, we'll need a Priority Queue to find it.

*/

// NAIVE PriorityQueue
class PriorityQueue {
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

const q = new PriorityQueue();

q.enqueue('b', 3);
q.enqueue('c', 5);
q.enqueue('d', 2);
q.enqueue('q', 20);

console.log(q);


class WeightedGraph {
  constructor() {
    this.adjacencyList = {};
  }
  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
  }
  addEdge(vertex1, vertex2, weight) {
    this.adjacencyList[vertex1].push({ node: vertex2, weight });
    this.adjacencyList[vertex2].push({ node: vertex1, weight });
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
    5.1 Dequeue a vertex from the priority queue
    5.2 If that vertex is the same as the ending vertex - we are done!
    5.3 Otherwise, loop trhough each value in the adjacency list at that vertex
      5.31 Calculate the distance to that vertex from the starting vertex
      5.32 If the distance is less than what is currently stored in our distances object
        5.32.1 Update the distances object with the new lower distance
        5.32.2 Update the previous object to contain that vertex
        5.32.3 Enqueue the vertex with the total distance from the start node
*/  
  dijkstras(start, end) { // 1
    const priorityQueue = new PriorityQueue();
    const distances = {}; // Store the current shortest distances between "start" and all other nodes.
    const previous = {}; // Hold a key for each vertex in this.adjacencyList. the values are initialized as "null"
                         // but they will be updated to be other verticies as we go...
    
    Object.keys(this.adjacencyList).forEach(vertex => {      
      distances[vertex] = vertex === start ? 0 : Infinity; // 2
      priorityQueue.enqueue(vertex, distances[vertex]); // 3
      previous[vertex] = null; // 4
    });    

    let smallest;
    while(priorityQueue.values.length) {       // 5
      smallest = priorityQueue.dequeue().val;  // 5.1
      if (smallest === end) break;             // 5.2
      let neighborIndex, nextNeighbor, candidateDistance;
      for (neighborIndex in this.adjacencyList[smallest]) { // 5.3
        // Using a for...in loop to iterate over an array, each <prop> ("neighbor" here), is actually
        // just the array index. We use this to...
        // Find a neighboring node of the node popped off of the priority queue
        nextNeighbor = this.adjacencyList[smallest][neighborIndex]; // "smallest" is a letter, "neighbor" is an index
        // Calculate the distance to the neighboring node
        candidateDistance = distances[smallest] + nextNeighbor.weight;  // 5.31 
        if (candidateDistance < distances[nextNeighbor.node]) {         // 5.32
          // updating new smallest distance to neighbor
          distances[nextNeighbor.node] = candidateDistance;             // 5.32.1
          // updating previous - how we got to neighbor
          previous[nextNeighbor.node] = smallest;                       // 5.32.2
          priorityQueue.enqueue(nextNeighbor.node, candidateDistance);
        }
        

      }
      // this.adjacencyList[smallest].forEach(neighbor => { 
      //   newDistance = distances[smallest] + this.adjacencyList[neighbor.node].weight; // 5.31
      //   console.log(this.adjacencyList[neighbor.node]);
      //   if (newDistance < distances[neighbor.node]) {      // 5.32
           
            
      //     distances[neighbor.node] = newDistance;          // 5.32.1
      //     previous[neighbor.node] = smallest;            // 5.32.2
      //     console.log('Previous', previous, smallest);

      //     priorityQueue.enqueue(neighbor.node, newDistance);
      //   }        
      // });
    }
    return previous;
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

console.log(graph.dijkstras('A', 'D'))

