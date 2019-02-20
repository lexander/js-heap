# js-heap
Heap data structure implemented in vanilla JS

Exports the `Heap` class for use by other packages.

## Example Usage
```javascript
let myHeap = new Heap();

```

## Running the Tests
* Clone the repository.
* `cd js-heap; npm test`

# API
## Classes

<dl>
<dt><a href="#Heap">Heap</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#sort">sort()</a> ⇒ <code>Array</code></dt>
<dd><p>Sort the nodes in the heap by the value of their contents, from smallest to largest.
Modifies the internal structure of the heap so that the nodes remain sorted until the next
insert or extract.</p>
</dd>
<dt><a href="#toString">toString()</a> ⇒ <code>String</code></dt>
<dd><p>Return a string representation of the data in the heap.</p>
</dd>
</dl>

<a name="Heap"></a>

## Heap
**Kind**: global class  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| size | <code>Number</code> | the count of items in the heap |
| max | <code>\*</code> | the largest value in the heap |


* [Heap](#Heap)
    * [new Heap(initialData)](#new_Heap_new)
    * [.size](#Heap+size)
    * [.max](#Heap+max)
    * [.insert(value)](#Heap+insert)
    * [.extractMax(value)](#Heap+extractMax) ⇒ <code>\*</code>
    * [.siftDown(index, [lastIndex])](#Heap+siftDown)

<a name="new_Heap_new"></a>

### new Heap(initialData)
Heap data structure. Supports efficient insertion and deletion of elements while maintaining
the "heap" property which makes it quick to repeatedly access / update the max value. Defaults to
numeric comparison to determine ordering but you can provide your own comparison method if you're
storing non-numeric values.


| Param | Type | Description |
| --- | --- | --- |
| initialData | <code>\*</code> | values to store in the new heap. Could be a single Array of values or multiple parameters. E.g. new Heap([1, 2]); OR new Heap(1, 2); |

<a name="Heap+size"></a>

### heap.size
The count of nodes in the heap.

**Kind**: instance property of [<code>Heap</code>](#Heap)  
<a name="Heap+max"></a>

### heap.max
The largest value in the heap.

**Kind**: instance property of [<code>Heap</code>](#Heap)  
<a name="Heap+insert"></a>

### heap.insert(value)
Insert the passed value to the heap and re-establish the heap
condition.

**Kind**: instance method of [<code>Heap</code>](#Heap)  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>\*</code> | to insert |

<a name="Heap+extractMax"></a>

### heap.extractMax(value) ⇒ <code>\*</code>
Extract the max value from the heap, re-heapify,
and return the max value.

**Kind**: instance method of [<code>Heap</code>](#Heap)  
**Returns**: <code>\*</code> - largest value in the heap  

| Param | Type |
| --- | --- |
| value | <code>\*</code> | 

<a name="Heap+siftDown"></a>

### heap.siftDown(index, [lastIndex])
**Kind**: instance method of [<code>Heap</code>](#Heap)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| index | <code>Number</code> | <code>0</code> | location to start the sift down from |
| [lastIndex] | <code>Number</code> |  | ignore child nodes that occur after this index. Used when sorting. |

<a name="sort"></a>

## sort() ⇒ <code>Array</code>
Sort the nodes in the heap by the value of their contents, from smallest to largest.
Modifies the internal structure of the heap so that the nodes remain sorted until the next
insert or extract.

**Kind**: global function  
**Returns**: <code>Array</code> - copy of the heap's content, sorted  
<a name="toString"></a>

## toString() ⇒ <code>String</code>
Return a string representation of the data in the heap.

**Kind**: global function  
**Returns**: <code>String</code> - string representation  
