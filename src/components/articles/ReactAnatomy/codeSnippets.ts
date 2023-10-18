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
}

export default codeSnippets;