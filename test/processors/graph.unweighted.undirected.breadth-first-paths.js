const expect = require('chai').expect;

let UndirectedGraph;
let graph;

let BreadthFirstPaths;
let paths;

const SOURCE_VERTEX = 0;
const TEST_EDGES = [
  [0, 5],
  [4, 3],
  [0, 1],
  [9, 12],
  [6, 4],
  [5, 4],
  [0, 2],
  [11, 12],
  [9, 10],
  [0, 6],
  [7, 8],
  [9, 11],
  [5, 3],
  [5, 5],
  [14, 14],
];

try {
  UndirectedGraph = require('../../structures/graph.unweighted.undirected');
  graph = new UndirectedGraph(TEST_EDGES);

  BreadthFirstPaths = require('../../processors/graph.unweighted.breadth-first-paths');
  paths = new BreadthFirstPaths(graph, SOURCE_VERTEX);
} catch (e) {
  throw new Error('Undirected BreadthFirstPaths could not be tested due to ' +
  'faulty import, likely from an incorrect file path or exporting a ' + 
  'non- constructor from the processor or graph files.');
}

describe('BreadthFirstPaths', () => {
  beforeEach(() => {
    graph = new UndirectedGraph(TEST_EDGES);
    paths = new BreadthFirstPaths(graph, SOURCE_VERTEX);
  });

  it('should be extensible', () => {
    expect(paths).to.be.extensible;
  });

  it('should have properties granted from constructor call', () => {
    expect(paths).to.have.all.keys(
      'distanceFromSource',
      'graph',
      'parent',
      'sourceVertex',
      'visited',
    );
  });

  it('should set a string data type for source vertex', () => {
    expect(paths.sourceVertex).to.equal(String(SOURCE_VERTEX));
  });

  it('should process only vertices connected to the source vertex', () => {
    expect(paths.visited.has('0')).to.be.true;
    expect(paths.visited.has('5')).to.be.true;
    expect(paths.visited.has('4')).to.be.true;
    expect(paths.visited.has('3')).to.be.true;
    expect(paths.visited.has('6')).to.be.true;
    expect(paths.visited.has('1')).to.be.true;
    expect(paths.visited.has('2')).to.be.true;
    expect(paths.visited.has('7')).to.be.false;
    expect(paths.visited.has('8')).to.be.false;
    expect(paths.visited.has('9')).to.be.false;
    expect(paths.visited.has('11')).to.be.false;
    expect(paths.visited.has('12')).to.be.false;
    expect(paths.visited.has('14')).to.be.false;
  });

  it('should throw an error if the source vertex is not in the graph', () => {
    graph = new UndirectedGraph();
    
    expect(() => new BreadthFirstPaths(graph, SOURCE_VERTEX)).to.throw(Error);
  });

  it('should work for number and string data types', () => {
    // Arrange
    const edges = [
      ['dog', 'woof'],
      ['dog', 'bark'],
      [0, 'meow'],
      ['meow', 'cat'],
      [14, 'dog'],
    ];
    
    graph = new UndirectedGraph(edges);

    // Act
    paths = new BreadthFirstPaths(graph, SOURCE_VERTEX);
        
    // Assert
    expect(paths.visited.has('0')).to.be.true;
    expect(paths.visited.has('meow')).to.be.true;
    expect(paths.visited.has('cat')).to.be.true;
    expect(paths.visited.has('14')).to.be.false;
    expect(paths.visited.has('dog')).to.be.false;
    expect(paths.visited.has('woof')).to.be.false;
    expect(paths.visited.has('bark')).to.be.false;
  });

  describe('#distanceTo', () => {
    it('should return the distance if one level from the source vertex', () => {
      expect(paths.distanceTo(6)).to.equal(1);
    });

    it('should return the distance if two levels from the source vertex', () => {
      expect(paths.distanceTo(4)).to.equal(2);
    });

    it('should return null if the input vertex is not connected to the source', () => {
      expect(paths.distanceTo(14)).to.equal(null);
    });
  });

  describe('#hasPathTo', () => {
    it('should return true if the input vertex is connected to the source vertex', () => { 
      expect(paths.hasPathTo('6')).to.be.true;
    });
 
    it('should return false if the input vertex is not connected to the source vertex', () => {
      expect(paths.hasPathTo('11')).to.be.false;
    });
 
    it('should throw an error if the input vertex is not in the graph', () => {
      expect(() => paths.hasPathTo('not in graph')).to.throw(Error);
    });
  });

  describe('#shortestPathTo', () => {
    it('should return null if a path to the source vertex does not exist', () => {
      expect(paths.shortestPathTo(11)).to.equal(null);
    });
 
    it('should return the shortest path to the source vertex if a path exists', () => {
      expect(paths.shortestPathTo(6)).to.deep.equal(['6', '0']);
    });
  });
});
