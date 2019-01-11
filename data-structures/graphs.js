class Graph {
  constructor() {
    // this.data is just an adjacency list
    this.data = {};
  }

  addVertex(vName) {
    if (!this.data[vName]) {
      this.data[vName] = [];
    }
  }

  addEdge(v1, v2) {
    this.data[v1].push(v2);
    // if we're making a directed graph, we would skip the next line
    this.data[v2].push(v1);
  }

  removeEdge(v1, v2) {
    // reassign the key of v1 to be an array that does not contain v2
    this.data[v1] = this.data[v1].filter(v => v !== v2);
    // ...and vice versa
    this.data[v2] = this.data[v2].filter(v => v !== v1);
  }

  removeVertex(vToRemove) {
    let adjacentVertex;
    while (this.data[vToRemove].length) {
      adjacentVertex = this.data[vToRemove].pop();
      this.removeEdge(vToRemove, adjacentVertex);
    }
    delete this.data[vToRemove];
  }

  DFSRecursive(startVertex) {
    const results = [];
    const visited = {};
    (function recursiveHelper (vertex) {
      // this check isn't actually necessary because we are keeping track of which nodes we have visited
      // and we only recursively invoke this function if a node has not been visited...
      if (!vertex) return; 
      results.push(vertex);
      visited[vertex] = true;
      this.data[vertex].forEach(v => {
        if (!visited[v]) return recursiveHelper.call(this, v);
      });
    }).call(this, startVertex);
    return results;
  }

  DFSIterative(startVertex) {
    const stack = [startVertex]; // first in last out
    const results = [];
    const visited = {}; 
    visited[startVertex] = true;
    let vertex;
    while (stack.length) {
      vertex = stack.pop();
      results.push(vertex);
      this.data[vertex].forEach(neighbor => {
        if (!visited[neighbor]) {
          visited[neighbor] = true;
          // only neighbors that have not been visited are being pushed onto the stack :)
          stack.push(neighbor);
        }
      });
    }
    return results;
  }

  BFSIterative(startVertex) {
    const queue = [startVertex]; // first in first out
    const results = [];
    const visited = {};
    visited[startVertex] = true;
    let vertex;
    while (queue.length) {
      console.log(queue);
      vertex = queue.shift();
      results.push(vertex);
      this.data[vertex].forEach(neighbor => {
        if (!visited[neighbor]) {
          visited[neighbor] = true;
          queue.push(neighbor);
        }
      });
    }
    return results;
  }

}

const g = new Graph();

g.addVertex('Hong Kong');
g.addVertex('Tokyo');
g.addVertex('New York');
g.addVertex('Miami');
g.addVertex('Boston');
g.addVertex('Ohio');

g.addEdge('Tokyo', 'Hong Kong');
g.addEdge('Tokyo', 'Miami');
g.addEdge('Boston', 'New York');
g.addEdge('Boston', 'Tokyo');
g.addEdge('Miami', 'Hong Kong');
g.addEdge('Ohio', 'Hong Kong');
g.addEdge('Ohio', 'New York');
g.addEdge('Ohio', 'Boston');

console.log(g);


const dfsRecursiveResult = g.DFSRecursive('New York');
console.log(dfsRecursiveResult);
const dfsIterativeResult = g.DFSIterative('New York');
console.log(dfsIterativeResult)
const bfsIterativeResult = g.BFSIterative('New York');
console.log(bfsIterativeResult);
/*
  GRAPH TRAVERSAL

  Visiting/Updating/Checking earch vertex in a graph

  USES
  - Peer to peer networking
  - Web crawlers
  - Finding "closest" matches/recommendations
  - Shortest path problems
    - GPS navigation
    - Solving mazes
    - AI (shortest path to win game)

  DEPTH FIRST 
  with tree - a graph with clear parent child directional relationships
    - Explore as far as possible down one branch before "backtracking".
    - Prioritize visiting children before siblings.
  with graph - no guaranteed directional relationships
    - Find one neighbor of the starting point and visit all of its neighbors 
      and all of its neighbors' neighbors before visiting the other starting point's
      neighbors.
    - We MUST remember which neighbors (nodes/vetices) we have already visited
      lest we create an infinite loop of neighbor visits! 

  DFSRecursive(startVertex):
    if vertex is empty:
      return (this is the base case)
    add vertex to results list
    mark vertex as visited (use object to store visited vertices as key and bool(true) as value)
    for each neighbor in vertex's neighbors:
      if neighbor is not visited:
        recursively call DFS on neighbor

  DFSIterative(startVertex):
    let S be a stack
    S.push(start)
    while S is not empty:
      vertex S.pop()
      if vertex has not been visited:
        visit vertex (add to result list)
        label vertex as discovered
        for each of vertex's neighbors, N do
          S.push(N)
  
  
  BREADTH FIRST
  Visit neighbors at current depth first!
  
  In a graph, we can assign a "height" to any given node to denote its
  distance from another given node.
  Neighbors one edge away from a vertex have a height of 1; ones two edges away
  have a height of 2...

  BFSIterative(startNode):
    - accept a starting vertex
    - create a queue (you can use an array) and place the starting vertex in it
    - create an array to store the nodes visited
    - create an object to store nodes visited
    - loop as long as there is anything in the queue
    - remove the first vertex from te queue and push it into the array that stores nodes visited
    - loop over each vertex in the adjacency list for the vertex you are visiting
    - once you've finished looping, return the array of visited nodes

*/