const codeSnippets = {
    batching: `const [variable_1, setVariable_1] = React.useState(false);
const [variable_2, setVariable_2] = React.useState(false);
  
const handleClick = () => {
    setTimeout(() => {
      setVariable_1(true);
      setVariable_2(true);            // Render
    }, 0);
};
    
// Versus

const [variable_1, setVariable_1] = React.useState(false);
const [variable_2, setVariable_2] = React.useState(false);
  
const handleClick = () => {
    setTimeout(() => {
      setVariable_1(true);            // Render
    }, 0);
    setVariable_2(true);              // Render
};`,
    flushedRender: `import * as React from 'react';
import { flushSync } from 'react-dom';

const MyComponent = () => {
    const [variable_1, setVariable_1] = React.useState(false);
    const [variable_2, setVariable_2] = React.useState(false);


    const handleClick = () => {
        flushSync(() => {
            setVariable_1(true);          // Render
        });
        setVariable_2(true);              // Render
    };
};`,
    funtionalVsClass: `import React, { Component } from "react";
    
// Functional Components
const FunctionalComponent = () => { // ES6 Arrow Functions
 return <h1>Happy Coding!</h1>;
};

function FunctionalComponent() {    // Regular Funtions
 return <h1>Happy Coding!</h1>;
}

// Class Components
class ClassComponent extends Component {
 render() {
   return <h1>Happy Coding!</h1>;
 }
}`,
    useCallbackSnippet: `import React, { useState, useCallback } from 'react';

function ParentComponent() {
    const [count, setCount] = useState(0);

    const increment = useCallback(() => {
        setCount(count + 1);
    }, [count]); // Dependency array

    return (
        <div>
            <p>Count: {count}</p>
            <ChildComponent onIncrement={increment} />
        </div>
    );
}

function ChildComponent({ onIncrement }) {
    return (
      <button onClick={onIncrement}>Increment</button>
    );
}`,
    useMemo: `import React, { useMemo, useState } from 'react';

function ExampleComponent() {
    const [data, setData] = useState([1, 2, 3, 4, 5]);

    const sum = useMemo(() => {
        return data.reduce((acc, val) => acc + val, 0);
    }, [data]); // Dependency array

    return (
        <div>
            <p>Data: {data.join(', ')}</p>
            <p>Sum: {sum}</p>
        </div>
    );
}`,
    context: `import React, { createContext, useContext } from 'react';

// Step 1: Create a Context
const MyContext = createContext();

// Step 2: Create a Provider
function ParentComponent() {
    const sharedData = "This data is shared";

    return (
        <MyContext.Provider value={sharedData}>
            <ChildComponent />
        </MyContext.Provider>
    );
}

// Step 3: Use the Consumer
function ChildComponent() {
    const data = useContext(MyContext);
    return <div>{data}</div>;
}`
}

export default codeSnippets;