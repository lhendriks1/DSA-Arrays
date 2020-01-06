const Memory = require('./memory');
let memory = new Memory()

class Array {
    constructor() {
        this.length = 0;
        this._capacity = 0;
        this.ptr = memory.allocate(this.length);
    }

    push(value) {
        //resizes the array, increases length and set a single memory address (both O(1) operations) so push is O(n)
        // you can trade off allocating more space than you need so you only need to resize for every push
        // with this trade off, best and average -case are O(1), worst-case is O(n)
        if (this.length >= this._capacity) {
            this._resize((this.length + 1) * Array.SIZE_RATIO);
        }
        memory.set(this.ptr + this.length, value)
        this.length++;
    }

    _resize(size) {
        const oldPtr = this.ptr;
        this.ptr = memory.allocate(size);
        if (this.ptr === null) {
            throw new Error('Out of memory');
        }
        memory.copy(this.ptr, oldPtr, this.length)
        memory.free(oldPtr);
        this._capacity = size;
    }

    get(index) {
        // adds an index offset and gets the value stored at the memory address - both are O(1) operations
        // best, worst, and average-case performance of O(1)
        if (index < 0 || index >=this.length) {
            throw new Error('Index Error');
        }
        return memory.get(this.ptr + index)
    }

    pop() {
        // just pointer arithmetic and memory access, O(1)
        if (this.length === 0) {
            throw new Error('Index Error');
        }
        const value = memory.get(this.ptr + this.length -1 );
        this.length --;
        return value;
    }

    insert(index, value) {
        //best performance case is inserting at the back (same as pushing), O(1)
        // worst case is inserting at the start which requires every value to shift back 1 memory address, O(n)
        // average case is inserting to the middle, half of the values would have to shift back 1 memory address, O(n)
        if (index < 0 || index >= this.length) {
            throw new Error('Index error');
        }

        if (this.length >= this._capacity) {
            this._resize((this.length + 1) * Array.SIZE_RATIO);
        }

        memory.copy(this.ptr + index + 1, this.ptr + index, this.length - index);
        memory.set(this.ptr + index, value);
        this.length++
    }

    remove(index) {
        // best-case performance is O(1) (the same as popping)
        // average-case performance and worst-case performance are O(n)
        if (index < 0 || index >=this.length) {
            throw new Error('Index error');
        }
        memory.copy(this.ptr + index, this.ptr + index + 1, this.length - index -1 );
        this.length--;
    }
}

Array.SIZE_RATIO = 3;

module.exports = Array;
