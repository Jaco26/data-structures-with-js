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

// It's an adjacency list
class Graph {
  constructor() {
    this.adjacencyList = {};
  }

  addVertex(vertexName) {
    this.adjacencyList[vertexName] = [];
  }

}