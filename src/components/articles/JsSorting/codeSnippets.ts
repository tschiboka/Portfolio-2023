const codeSnippets = {
    "basicExample": `const names = ["Happy", "Doc", "Grumpy", "Dopey", "Bashful", "Sleepy", "Sneezy"];
names.sort();        // Sorts the array in-place
console.log(names);  // Output: [ "Bashful", "Doc", "Dopey", "Grumpy", "Happy", "Sleepy", "Sneezy" ]`,
    "mutation":`const names = ["Happy", "Doc", "Grumpy", "Dopey", "Bashful", "Sleepy", "Sneezy"];
sorted = [...names].sort();
console.log(names);   // Original: ["Happy", "Doc", "Grumpy", "Dopey", "Bashful", "Sleepy", "Sneezy"]
console.log(sorted);  // Sorted:   ["Bashful", "Doc", "Dopey", "Grumpy", "Happy", "Sleepy", "Sneezy"] `,
    "sortingLetters": `const letters = ["Z", "a", "B", "D", "b", "d", "0"];
letters.sort();
console.log(letters); // Output: [ "0", "B", "D", "Z", "a", "b", "d" ]`,
    "sortingNumbers": `const numbers = [12, 11, 1, 3, 7, 71, 13, 33, 30];
numbers.sort();
console.log(numbers); // Output: [ 1, 11, 12, 13, 3, 30, 33, 7, 71 ]`,
    "sortOptions": `sort()                                     // Functionless
sort(compareFn)                            // Compare function
sort(function compareFn(a, b) { /* … */ }) // Inline compare function
sort((a, b) => { /* … */ } )               // Arrow function`,
    "sortNumberOptions": `const numbers = [100, 10, 1, 0, 1001, 1111, 111, -1, -11, -101];

// Separately Defined Comparator Function
function compareNumbers(a, b) { return a - b; }
numbers.sort(compareNumbers);
console.log(numbers); // Output: [ -101, -11, -1, 0, 1, 10, 100, 111, 1001, 1111 ]

// Inline Comparator Funtion
numbers.sort(function (a, b) {
        return a - b;
});
console.log(numbers); // Output: [ -101, -11, -1, 0, 1, 10, 100, 111, 1001, 1111 ]

// Arrow Comparator Function
numbers.sort((a, b) => a - b);
console.log(numbers); // Output: [ -101, -11, -1, 0, 1, 10, 100, 111, 1001, 1111 ]`,
    "comparator": `function compareFn(a, b) {
    if (a is less than b by some ordering criterion) {
        return -1;
    } else if (a is greater than b by the ordering criterion) {
        return 1;
    }
    // a must be equal to b
    return 0;
}`,
    reverse1: `const numbers = [3, 5, 7, 1, 0, 9, 2, 5, 4, 6, 8];
numbers.sort((a, b) => a - b).reverse(); // You can use chaining
console.log(numbers);                    // Output: [ 9, 8, 7, 6, 5, 5, 4, 3, 2, 1, 0 ]`,
    reverse2: `const numbers = [3, 5, 7, 1, 0, 9, 2, 5, 4, 6, 8];
numbers.sort((a, b) => b - a); // Just reverse the order of operands
console.log(numbers);          // Output: [ 9, 8, 7, 6, 5, 5, 4, 3, 2, 1, 0 ]`
}

export default codeSnippets;