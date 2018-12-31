/*
  GRAPHS
  
  OBJECTIVES:
  - explain what a graph is
  - compare and contrast different types of graphs and their use cases in the real world
  - implement a graph using an adjacency list
  - traverse through a graph using BFS and DFS
  - compare and contrast graph traversal algorithms

  WHAT IS IT?
  "A graph data stucture consists of a finite (and possibly mutable) set of vertices or points,
  together with a set of unordered pairs of these verticies for an undirected graph or a set
  of ordered pairs for a directed graph" - Wikipedia

  It's a collection of nodes and connections between those nodes.

  USES FOR GRAPHS?
  - social networks
  - location / mapping
  - routing algorithms
  - visual hierarchy
  - file system optimizations
  - etc, etc, etc,

  TYPES OF GRAPHS?

  Essential Vocab:
  - Vertex: a node
  - Edge: connection between nodes
  - Directed/Undirected:
    Undirected: 
      - no "polarity" between edges; they represent two-way connections (A to B and B to A)
      - Facebook friends
    Directed: 
      - one-way connection (A to B but not B to A)
      - Instagram followers
  - Weighted/Unweighted:
    Weighted:
      - edges (connections) have values associated with them
    Unweighted:
      - edges (connections) have no values
  
*/

/*
  REPRESENTING GRAPHS WITH CODE

  Fundamentally, we only need to store vertecies and edges; nodes and their connections.

  We will explore two common solutions:
    Adjacency Matrix:
      - a two-dimensional structure (usually implemented with nested arrays)
      - it stores information in rows and columns

    Adjacency List:
      - a two-dimensional array or list that stores edges with the outer indices as keys and inner elements as connections
      [
        index 0 [1,5],
        index 1 [0, 2],
        index 2 [1, 9],
      ]
      - OR a hash-table; key-value pairs
      {
        A: [B, F],
        B: [A, C],
        C: [B, I],
      }

  

  BIG O of ADJACENCY LISTS & MATRICES:

  |V| - number of verticies
  |E| - number of edges

  Operation         Adjacency List    Adjacency Matrix
  - Add vertex      - O(1)            - O(|V^2|)
  - Add edge        - O(1)            - O(1)
  - Remove Vertex   - O(|V| + |E|)    - O(|V^2|)
  - Remove Edge     - O(|E|)          - O(1)
  - Query           - O(|V| + |E|)    - O(1)
  - Storage         - O(|V| + |E|)    - O(|V^2|)

  SOME KEY POINTS

      Adjacency List          Adjacency Matrix
      - Can take up less      - Takes up more space
        space (in sparce        (in sparce graphs)
        graphs)

      - Faster to iterate     - Slower to iterate over
        over all edges          all edges

      - Can be slower to      - Faster to lookup specific
        lookup specific         edge
        edge

  
  WE WILL USE AN ADJACENY LIST
  - Because it takes up less space
  - It lends itself better to real-world data
    because it tends to be sparse; it tends to have 
    a lot of nodes, each with only a few connections.
*/


// methods will take "v" arguments as shorthand for "vertex"
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
    // MY FIRST SOLUTION
    // this.data = Object.keys(this.data).reduce((a, key) => {
    //   if (key !== vToRemove) {
    //     a[key] = this.data[key].filter(v => v !== vToRemove);
    //   }
    //   return a;
    // }, {});
    // MY SECOND SOLUTION
    // const verticies = Object.keys(this.data);
    // let i, vertex;
    // for (i = 0; i < verticies.length; i++) {
    //   vertex = verticies[i];
    //   this.removeEdge(vToRemove, vertex);
    // }
    // delete this.data[vToRemove];
    // COLT STEELS MORE EFFICIENT SOLUTION (not iterating through whole this.data)
    let adjacentVertex;
    while (this.data[vToRemove].length) {
      adjacentVertex = this.data[vToRemove].pop();
      this.removeEdge(vToRemove, adjacentVertex);
    }
    delete this.data[vToRemove];
  }

}

const g = new Graph();

g.addVertex('Hong Kong');
g.addVertex('Tokyo');
g.addVertex('New York');
g.addVertex('Miami');
g.addVertex('Boston');

g.addEdge('Tokyo', 'Hong Kong');
g.addEdge('Tokyo', 'Miami');
g.addEdge('Boston', 'New York');
g.addEdge('Boston', 'Tokyo');
g.addEdge('Miami', 'Hong Kong');


console.table(g);
