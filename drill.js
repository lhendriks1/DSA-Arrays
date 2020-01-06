const Array = require('./implement-array');

function main() {
    Array.SIZE_RATIO = 3;
    let arr = new Array();//The length is 6, one memory block for each item in the array.

// 1. The capacity ratio is 3x; hence it starts at 3 and once it is exceed the new size (4) is multiplied by 3 resulting in a capacity of 12

// 2. Exploring the push method:
    arr.push(3);
    //length: 1
    // capacity: 3
    // ptr: 0
    arr.push(5);
    //length: 2
    // capacity: 3
    // ptr: 0
    arr.push(15);
    //length: 3
    // capacity: 3
    // ptr: 0
    arr.push(19);
    //length: 4
    // capacity: 12
    // ptr: 3
    arr.push(45);
    //length: 6
    // capacity: 12
    // ptr: 3
    arr.push(10);

//3. Exploring the pop() method:
    arr.pop();
    //length: 5
    // capacity: 12
    // ptr: 3
    arr.pop()
    //length: 4
    // capacity: 12
    // ptr: 3
    arr.pop()
    //length: 3
    // capacity: 12
    // ptr: 3

    //The length decrease by one each time

    // 4. Understanding more about how arrays work:
    // console.log(arr.get(0)); => prints 3
    // arr.length = 0;
    // arr.push("tauhida")
    // console.log(arr)
    // the _resize function allocaets a new, larger chunk of memory. Then copies each item of data to a new block and lastly frees the old chunk.
}


// 5. URLify a string
// Write a method that takes in a string and replaces all its empty spaces with a %20. 
// Your algorithm can only make 1 pass through the string.

function URLify(string) {
    return string.trim().replace(/ /g, "%20")
}

// console.log(URLify(' www. hi-there you'));

//6. Filtering an array
// Write an algorithm to remove all numbers less than 5 from the array. 
// DO NOT use Array's built-in .filter() method here; write the algorithm from scratch.

function myFilter(arr, n) {
    // assumes not supposed to manipulate original array:
    let result = []
    arr.forEach(ele => ele > n ? result.push(ele) : null)
    return result
}

// 

// 7. Max sum in the array
// You are given an array containing positive and negative integers. 
// Write an algorithm which will find the largest sum in a continuous sequence.

function largestSum(arr) {
    let maxValue = Math.max(...arr);
    let sum = 0;

    for (let i = 0; i < arr.length; i++) {
        sum+=arr[i];

        if (sum > maxValue) {
            maxValue = sum;
        }

        if (sum < 0) {
            sum = 0;
        }
    }

    return maxValue

}

// console.log(largestSum([1, -1, 4, -1, 6, -100, 5, 2]))

//8. Merge Arrays
// Imagine you have 2 arrays which have already been sorted. 
// Write an algorithm to merge the 2 arrays into a single array, which should also be sorted.

function merge(arr1, arr2) {
return arr1.concat(arr2).sort((a, b) => a-b)
}

// console.log(merge([1, 3, 6, 8, 11], [2, 3, 5, 8, 9, 10]))

// 9. Remove Characters
// Write an algorithm that deletes given characters from a string. 
// For example, given a string of "Battle of the Vowels: Hawaii vs. Grozny" and the characters to be removed are "aeiou", 
// the algorithm should transform the original string to "Bttl f th Vwls: Hw vs. Grzny". 
// Do not use Javascript's filter, split, or join methods.

function removeChar(string, remove) {
    let newString = "";
    
    for (let i = 0; i < string.length; i++ ) {
            for (let j = 0; j < remove.length; j++) {
                if (string.charAt(i) !== remove.charAt(j)) {
                    newString += string.charAt(i);
                }
            }
    }
    return newString;
}

const str1 = "Battle of the Vowels: Hawaii vs. Grozny";
const vowels = "aeiou"
console.log(removeChar(str1, vowels))