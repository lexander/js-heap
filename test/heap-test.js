var assert = require('assert');
var Heap = require('../heap');

describe('Heap', function() {
  describe('#constructor', function() {
    it('should return an empty Heap when using the default constructor', function() {
      let h = new Heap();
      assert.equal(h.size, 0);
    });
    it('should have `undefined` max when using the default constructor', function() {
      let h = new Heap();
      assert.equal(h.max, undefined);
    });
    it('should have expected nodes when constructor is called with known initial values in an array', function() {
      let h = new Heap([3,2,1]);
      assert.ok(h.data.includes(3));
      assert.ok(h.data.includes(2));
      assert.ok(h.data.includes(1));
    });
    it('should have expected max when constructor is called with known initial values in an array', function() {
      let h = new Heap([3,2,1]);
      assert.equal(h.max, 3);
      // and with initial values that aren't already in heap order
      h = new Heap([2,1,3]);
      assert.equal(h.max, 3);
    });
    it('should have expected nodes when constructor is called with known initial values as multiple arguments', function() {
      let h = new Heap(3,2,1);
      assert.ok(h.data.includes(3));
      assert.ok(h.data.includes(2));
      assert.ok(h.data.includes(1));
    });
    it('should have expected max when constructor is called with known initial values as multiple arguments', function() {
      let h = new Heap(3,2,1);
      assert.equal(h.max, 3);
      // and with initial values that aren't already in heap order
      h = new Heap(2,1,3);
      assert.equal(h.max, 3);
    });
  });
  describe('#insert', function() {
    it('should insert the first element as max', function() {
      let h = new Heap();
      h.insert(1);

      assert.equal(h.max, 1);
      assert.equal(h.size, 1);
    });
    it('should insert the second element as max if larger then current max', function() {
      let h = new Heap();
      h.insert(1);
      h.insert(2);

      assert.equal(h.max, 2);
      assert.equal(h.size, 2);
    });
    it('should insert the second element as NOT max if smaller then current max', function() {
      let h = new Heap();
      h.insert(2);

      assert.equal(h.max, 2);
      assert.equal(h.size, 1);

      h.insert(1);

      assert.equal(h.max, 2);
      assert.equal(h.size, 2);
    });
  });
  describe('#sort', function() {
    it('should not error out on an empty set', function() {
      assert.doesNotThrow((()=> {
        let h = new Heap();
        h.sort();
      }));
    });
    it('should return the empty set when sorting an empty heap', function() {
      let h = new Heap();
      let sorted = h.sort();

      assert.deepEqual(sorted, []);
    })
    it('should return the nodes in sorted order', function() {
      let h = new Heap([6, 5, 2, 1]);
      let sorted = h.sort();

      assert.deepEqual(sorted, [1, 2, 5, 6]);
    })
    it('should return a COPY of the internal data', function () {
      let h = new Heap([6, 5, 2, 1]);
      let sorted = h.sort();

      // should start out as the same
      assert.deepEqual(sorted, [1, 2, 5, 6]);

      // but we can modify the copy without changing the source
      sorted.push(1, 2, 3);
      assert.notDeepEqual(sorted, [1, 2, 5, 6]);
    })
  });
  describe('#extractMax', function() {
    it('should return `undefined` when extracting from an empty set', function() {
      let h = new Heap();
      let max = h.extractMax();
      assert.deepStrictEqual(max, undefined, `found ${max} but expected 'undefined'`);
    });
    it('should return the expected max value when one exists', function() {
      let h = new Heap([5]);
      let max = h.extractMax();
      assert.equal(max, 5, `found ${max} but expected 5`);

      let h2 = new Heap([5, 3, 1]);
      let max2 = h2.extractMax();
      assert.equal(max2, 5, `found ${max} but expected 5`);

      // and with initial values that aren't already in heap order
      let h3 = new Heap([3, 5, 1]);
      let max3 = h3.extractMax();
      assert.equal(max3, 5, `found ${max} but expected 5`);

      // and if we extract repeatedly, results should be in the expected order
      let h4 = new Heap([3, 5, 1]);
      let max4 = h4.extractMax();
      assert.equal(max4, 5, `found ${max} but expected 5`);
      max4 = h4.extractMax();
      assert.equal(max4, 3, `found ${max} but expected 3`);
      max4 = h4.extractMax();
      assert.equal(max4, 1, `found ${max} but expected 1`);
      max4 = h4.extractMax();
      assert.deepStrictEqual(max4, undefined, `found ${max4} but expected 'undefined'`);
    });
    it('should maintain heap property after an `extract`', function() {
      let h = new Heap([3, 5, 1]);
      h.extractMax(); // result is checked in another unit test, ignore it here
      assert.equal(h._verifyHeap(), true, "heap property not maintained after extract");
    });
  });
  describe('#_verifyHeap', function() {
    it('should return `false` for an invalid heap', function() {
      let h = new Heap([1, 2, 3]);
      // haxor the internal representation
      h.data.reverse();

      assert.equal(h._verifyHeap(), false, 'expected invaid heap but _verifyHeap says it is valid!');
    });
    it('should return `true` for a valid heap', function() {
      let h = new Heap([1, 2, 3]);
      // haxor the internal representation
      h.data.reverse();
      
      // re-establish the heap property
      h.insert(4);

      assert.equal(h._verifyHeap(), true, 'expected valid heap but _verifyHeap says it is invalid!');
    });
  });
  describe('#_swap', function () {
    it('should swap the expected elements', function () {
      let h = new Heap([1, 2]);
      let originalOrder = h.toString();
      assert.equal(originalOrder, '2,1', `expected string like: "2,1", but saw ${originalOrder}`);
      h._swap(0, 1);
      let swappedOrder = h.toString();
      assert.equal(swappedOrder, '1,2', `expected string like: "1,2", but saw ${swappedOrder}`);
    })
  })
});