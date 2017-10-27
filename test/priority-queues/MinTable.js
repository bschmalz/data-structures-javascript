const expect = require('chai').expect;

let MinPQTable;
let minPQ;

try {
  MinPQTable = require('../../structures/priority-queues/MinTable');
  minPQ = new MinPQTable();
} catch (e) {
  throw new Error('MinPQTable could not be tested due to faulty import, likely ' +
  'from an incorrect file path or exporting a non-constructor from the file.');
}

describe('MinPQTable', () => {
  beforeEach(() => {
    minPQ = new MinPQTable();
  });

  it('should be extensible', () => {
    expect(minPQ).to.be.extensible;
  });

  it('should have a heap property pointing to an array with one null value', () => {
    expect(minPQ.heap).to.deep.equal([null]);
  });

  describe('#deleteMin()', () => {
    it('should remove the minimum key from the heap', () => {
      minPQ.insert(14, 6);
      minPQ.insert(13, 8);
      minPQ.insert(12, 9);
      minPQ.insert(10, 10);
      minPQ.insert(9, 12);
      minPQ.insert(8, 13);
      minPQ.insert(6, 14);

      minPQ.deleteMin();

      expect(minPQ.heap[1].key).to.equal(8);
    });

    it('should return the deleted min value', () => {
      minPQ.insert(0, 0);

      expect(minPQ.deleteMin().key).to.equal(0);
    });

    it('should throw an error for empty heap', () => {
      expect(() => minPQ.deleteMin()).to.throw(Error);
    });
  });

  describe('#insert()', () => {
    it('should correctly insert keys when called in descending order', () => {
      minPQ.insert(14, 'dog');
      minPQ.insert(13, 'cat');
      minPQ.insert(12, 'woof');
      minPQ.insert(10, 'meow');
      minPQ.insert(9, 'pig');
      minPQ.insert(8, 'oink');
      minPQ.insert(6, 'unicorn');

      /*
        14
        13 14
        12 14 13
        10 12 13 14
        9 10 13 14 12
        8 10 9 14 12 13
        6 10 8 14 12 13 9
      */

      expect(minPQ.heap.slice(1).map(o => o.key)).to.deep.equal([6, 10, 8, 14, 12, 13, 9]);
    });

    it('should correctly insert keys when called in ascending order', () => {
      minPQ.insert(6, 'unicorn');
      minPQ.insert(8, 'oink');
      minPQ.insert(9, 'pig');
      minPQ.insert(10, 'meow');
      minPQ.insert(12, 'woof');
      minPQ.insert(13, 'cat');
      minPQ.insert(14, 'dog');

      expect(minPQ.heap.slice(1).map(o => o.key)).to.deep.equal([6, 8, 9, 10, 12, 13, 14]);
    });
    
    it('should throw an error for NaN input', () => {
      expect(() => minPQ.insert(NaN)).to.throw(Error);
    });

    it('should throw an error for non-string non-numeric input', () => {
      expect(() => minPQ.insert({})).to.throw(Error);
    });
  });

  describe('#isEmpty()', () => {
    it('should return true if heap is empty', () => {
      expect(minPQ.isEmpty()).to.equal(true);
    });

    it('should return false if heap contains values', () => {
      minPQ.insert(0, 0);

      expect(minPQ.isEmpty()).to.equal(false);
    });
  });

  describe('#peekMin', () => {
    it('should return the minimum value from the tree', () => {
      minPQ.insert(6, 'dog');
      minPQ.insert(8, 'woof');

      expect(minPQ.peekMin().key).to.equal(6);
    });
  });
});