const codeSnippets = {
    immutability: `const mutableArray: number[] = [1, 2, 3]
mutableArray.push(4)                                // Modifies the original array

const immutableArray: number[] = [1, 2, 3]
const newArray = [...immutableArray, 4]             // Creates a new array`,
    characteristics: `const addFunction = (a: number, b: number) => a + b // Functions can be assigned to a variable
addFunction(5, 8)

const executeFunction = (func: Function) => { func() }

const sayHello = () => console.log('Hello world!')  // Functions can be passed as arguments
executeFunction(sayHello)

const returnFunction = () => {                      // Functions can be returned from functions
return () => console.log('Dynamic function!');
}`,
    pure: `let total:number = 0;
function addToTotal(value: number) {                // Non-pure function
    total += value                                  // Total is declared outside of function scope!
    return total 
}
    
function add(a: number, b: number) {                // Pure function
    return a + b                                    
}`,
    referencialTransparency: `const square = (x: number) => x * x                // Transparent: no external state is used in the funtion
console.log(square(5) === 25)                      // Given the input and the funtion, we can replace it with the actual value
    
const addToTotal = (x: number) => total + x        // Opaque: because of external dependency return value may change
let total = 0
console.log(addToTotal(5) === 5)                   // true
total = 7
console.log(addToTotal(5) === 5)                   // false`,
    recursive: `const getFactorial = (n: number): number =>
n === 0 ? 1 : n * getFactorial(n - 1)              // Function recursively calls itself
console.log(getFactorial(5))`,
    declarative: `const numbers = [1, 2, 3, 4, 5]
    
const evenNumbers: number[] = []
for (let i = 0; i < numbers.length; i++) {         // Imperative style
    if (numbers[i] % 2 === 0) evenNumbers.push(numbers[i])
}

const evens = numbers.filter((n) => n % 2 === 0)   // Declarative style`,
functors: `const arrayNum: number[] = [1, 2, 3]
const arrayStr: string[] = arrayNum.map((n) => n.toString())
const promiseNum: Promise<number> = Promise.resolve(5)
const promiseStr: Promise<string> = promiseNum.then((n: number) => n.toString())`,
map: `const double = Some(42).map((x) => x * 2)          // Some(84)`,
flatMap: `const increment = (x: number): Maybe<number> => Some(x + 1)  
const double = (x: number): Maybe<number> => Some(x * 2)     
const result = Some(10).flatMap(increment).flatMap(double)`,
constructor: `Maybe.of('a')    // Some('a')
Maybe.unit('a')  // Some('a')
Maybe.pure('a')  // Some('a')
Maybe.some('a')  // Some('a')`,
nullpointer: `let obj = null;
console.log(obj.property); //TypeError: Cannot read property 'property' of null
let func = null;
func();                    // TypeError: func is not a function
let value = undefined;
value();                   // TypeError: value is not a function`,
nullChecks: `if (user && user.address && user.address.street) { // Null check before accessing properties
    console.log(user.address.street);                           // Safe to access
} else {
    console.log("Street address is not available.");
}`,
}


export default codeSnippets