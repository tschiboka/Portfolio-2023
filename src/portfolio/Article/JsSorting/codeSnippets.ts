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
console.log(numbers);          // Output: [ 9, 8, 7, 6, 5, 5, 4, 3, 2, 1, 0 ]`,
    users:`const users = [
    {
      id: 1,
      name: "John Smith",
      dob: "1980-05-15",
      registrationDate: "2022-03-10",
      active: true,
    },
    { id: 2, name: "Mary Johnson", dob: "1975-11-21", registrationDate: "2021-09-28", active: false, },
    { id: 3, name: "William Brown", dob: "1992-08-04", registrationDate: "2023-01-17", active: true, },
    ...
];`,
    sortByName: `function sortByName(a, b) {
    return a.name.localeCompare(b.name); // String Comparision
}

console.log(users.sort(sortByName));

// Output
//     0: Object { id: 9, name: "David Jones", dob: "1990-12-12", … }
//     1: Object { id: 8, name: "Elizabeth Taylor", dob: "1979-03-25", … }
//     2: Object { id: 7, name: "James Miller", dob: "1982-09-08", … }
//     3: Object { id: 1, name: "John Smith", dob: "1980-05-15", … }
//     ...`,
localeCompare: `// LocalCompare (string, language, options)

// Sorts Names in Spanish Language Rules
const names = ["Juan", "José", "Maria", "Çınar", "Zoe"];
names.sort((a, b) => a.localeCompare(b, "es"));
// Output: [ "Çınar", "José", "Juan", "Maria", "Zoe" ]

// Sort Numbers Numerically
const numbers = ["1", "15", "3", "100"];
numbers.sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
// Output: ["1", "3", "15", "100"]

// Case-insensitive Sorting
const caseInsensitive = ["apple", "Banana", "cherry", "Date"];
caseInsensitive.sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }));
// Output: ["apple", "Banana", "cherry", "Date"]`,
    sortByDate: `function sortByDob(a, b) {
    return new Date(a.dob) - new Date(b.dob);
}
users.sort(sortByDob);
console.log(users);
// Output:
//    0: Object { id: 5, name: "Robert Wilson", dob: "1973-07-30", … } 
//    1: Object { id: 2, name: "Mary Johnson", dob: "1975-11-21", … }
//    2: Object { id: 8, name: "Elizabeth Taylor", dob: "1979-03-25", … }
//    3: Object { id: 1, name: "John Smith", dob: "1980-05-15", … }
//    ...`,
    edgeCases: `// Strings
const stringsWith0 = ["Peter", "Ann", "Walter", 0];
console.log(stringsWith0.sort());            // Output: [ 0, "Ann", "Peter", "Walter" ]
const stringsWithFalse = ["Peter", "Ann", "Walter", false];
console.log(stringsWithFalse.sort());        // Output: [ "Ann", "Peter", "Walter", false ]
const stringsWithUndefined = ["Peter", "Ann", "Walter", undefined];
console.log(stringsWithUndefined.sort());    // Output: [ "Ann", "Peter", "Walter", undefined ]
const stringsWithEmptyString = ["Peter", "Ann", "Walter", ""];
console.log(stringsWithEmptyString.sort());  // Output: [ "", "Ann", "Peter", "Walter" ]
const stringsWithNull = ["Peter", "Ann", "Walter", null];
console.log(stringsWithNull.sort());         // Output: [ "Ann", "Peter", "Walter", null ]
const stringsWithNaN = ["Peter", "Ann", "Walter", NaN];
console.log(stringsWithNaN.sort());          // Output: [ "Ann", NaN, "Peter", "Walter" ]
const falsyValues = [0, false, undefined, "", null, NaN];
console.log(falsyValues.sort());             // Output: [ "", 0, NaN, false, null, undefined ]

// Numbers
const specialNumbers = [-Infinity, -2, -1, 0, -0, 1, Infinity];
specialNumbers.sort((a, b) => a - b);
console.log(specialNumbers);                 // Output: [ -Infinity, -2, -1, 0, -0, 1, Infinity ]
const numbersWithNaN = [NaN, 2, 1, 0, -1, -2, NaN];
numbersWithNaN.sort((a, b) => a - b);
console.log(numbersWithNaN);                 // Output: [ NaN, -2, -1, 0, 1, 2, NaN ]`,
    timSort: `const timsort = (arr) => {
    const RUN = 64;                             // 32 or 64
    const n = arr.length;
    
    for (let i = 0; i < n; i += RUN) {          // Sorting the Runs with Insertion Sort
        insertionSort(arr, i, Math.min(i + RUN - 1, n - 1));
    }

    for (let size = RUN; size < n; size *= 2) { // Merging Runs
      for (let left = 0; left < n; left += 2 * size) {
          const mid = left + size - 1;
          const right = Math.min(left + 2 * size - 1, n - 1);
          mergeSort(arr, left, mid, right);
      }
    }

    return arr;
}`
  }
export default codeSnippets;