/**
 * Heap data structure. Supports efficient insertion and deletion of elements while maintaining
 * the "heap" property which makes it quick to repeatedly access / update the max value. Defaults to
 * numeric comparison to determine ordering but you can provide your own comparison method if you're
 * storing non-numeric values.
 * @class Heap
 * @param {*} initialData values to store in the new heap. Could be a single Array of values
 * or multiple parameters. E.g. new Heap([1, 2]); OR new Heap(1, 2);
 * @property {Number} size the count of items in the heap
 * @property {*} max the largest value in the heap
 */
class Heap {
  constructor(initialData) {
    if(!Array.isArray(initialData)) {
      initialData = arguments.length === 0 ? [] : Array.from(arguments);
    }

    this.data = [];
    initialData.forEach(value => {
      this.insert(value);
    });
  }
  /**
   * The count of nodes in the heap.
   */
  get size () {
    return this.data.length;
  }

  /**
   * The largest value in the heap.
   */
  get max () {
    return this.data[0];
  }

  /**
   * Insert the passed value to the heap and re-establish the heap
   * condition.
   * @param {*} value to insert
   */
  insert(value) {
    // add to last position
    let nodeIndex = this.data.push(value);
    nodeIndex--; // get actual index, not length

    // only 1 node in the heap
    if (nodeIndex === 0) {
      return;
    }
    
    let parentIndex = Math.floor((nodeIndex - 1) / 2);
    // no need for recursion b/c we can just traverse the internal array of data.
    // compare to parent; correct order? done
    while (this.data[parentIndex] < this.data[nodeIndex]) {
      // else swap parent / child
      this._swap(parentIndex, nodeIndex);

      nodeIndex = parentIndex;
      parentIndex = Math.floor((nodeIndex - 1) / 2);
    }
  }

  /**
   * Extract the max value from the heap, re-heapify,
   * and return the max value.
   * @param {*} value 
   * @returns {*} largest value in the heap
   */
  extractMax(value) {
    // replace w/ last element from last level
    let max = this.data.shift();
    let last = this.data.pop();
    
    // `insert` re-establishes the heap
    this.insert(last);
    return max;
  }

  /**
   * 
   * @param {Number} index location to start the sift down from
   * @param {Number} [lastIndex] ignore child nodes that occur after this index. Used when sorting.
   */
  siftDown (index = 0, lastIndex = Infinity) {
    let val = this.data[index];
    let lChild = 2 * index + 1;
    let lVal = lChild < lastIndex ? (this.data[lChild] || -Infinity) : -Infinity;
    let rChild = 2 * index + 2;
    let rVal = rChild < lastIndex ? (this.data[rChild] || -Infinity) : -Infinity;

    while(val < lVal || val < rVal) {
      if(val < lVal) {
        this._swap(index, lChild);
        index = lChild;
        val = this.data[index];
        lChild = 2 * index + 1;
        lVal = lChild < lastIndex ? (this.data[lChild] || -Infinity) : -Infinity;
        continue;
      }

      // else
      this._swap(index, rChild);
      index = rChild;
      val = this.data[index];
      rChild = 2 * index + 2;
      rVal = rChild < lastIndex ? (this.data[rChild] || -Infinity) : -Infinity;
    }
  }

  /**
   * Sort the nodes in the heap by the value of their contents, from smallest to largest.
   * Modifies the internal structure of the heap so that the nodes remain sorted until the next
   * insert or extract.
   * @method sort
   * @returns {Array} copy of the heap's content, sorted
   */
  sort() {
    for (let i = this.data.length - 1; i > 0; i--) {
      // largest to last index
      this._swap(0, i);

      // re-heapify
      this.siftDown(0, i);
    }

    return [...this.data];
  }

  /**
   * Return a string representation of the data in the heap.
   * @method toString
   * @returns {String} string representation
   */
  toString() {
    return this.data.toString();
  }

  // swap the values of two indexes quickly
  _swap (iOne, iTwo) {
      // 1 liner, no temp var swap adapted from https://medium.com/@frontman/how-swap-two-values-without-temporary-variables-using-javascript-8bb28f96b5f6
      this.data[iOne] = this.data[iOne] ^ this.data[iTwo] ^ (this.data[iTwo] ^= (this.data[iOne] ^ this.data[iTwo]));
  }

  /**
   * Helpful for unit tests. Returns `true` if the heap property is currently valid for the instance, else `false`.
   * @private
   * @method _verifyHeap
   * @returns {Boolean}
   */
  _verifyHeap () {
    let index = this.data.length - 1;

    while (index >= 0) {
      let parentValue = this.data[index];
      let lChildValue = this.data[(2 * index + 1)];
      let rChildValue = this.data[(2 * index + 2)];
      
      // curr parent must be larger than its children
      if (parentValue < lChildValue || parentValue < rChildValue) {
        return false;
      }

      --index;
    }

    return true;
  }
}

if (typeof module !== 'undefined') {
  module.exports = Heap;
}
