// Components
import Article from "../../sharedComponents/Article/Article";
import Figure from "../../sharedComponents/Figure/Figure";
import Code from "../../sharedComponents/Code/Code";
import InlineReference from "../../sharedComponents/InlineReference/InlineReference";

// Images
import ReactTitleImg from "../../../assets/images/blog/react_anatomy/react.jpg";
import DOMImg from "../../../assets/images/blog/react_anatomy/DOM.png";
import VDOMImg from "../../../assets/images/blog/react_anatomy/virtual-dom.png";
import StackReconciliationImg from "../../../assets/images/blog/react_anatomy/stack-reconciliation.jpg";
import FiberImg from "../../../assets/images/blog/react_anatomy/fiber.png";
import LifeCycleMethodsImg from "../../../assets/images/blog/react_anatomy/component-lifecycle-methods.webp";

// Other Assets
import codeSnippets from "./codeSnippets";
import { getReferenceList } from "../references";

// Styles
//import "./";

interface Props {
    pageName: string;
    path: string;
}

const ReactAnatomy = ({ pageName, path }: Props) => {
    const references = getReferenceList(path);
    return (
        <Article pageName={pageName} path={path} title="Brief React Anatomy">
            <h1>Brief Anatomy of React</h1>
            <Figure
                image={ReactTitleImg}
                className={"image--med bg--white"}
                alt={"React Screenshot"}
                zoomAllowed={false}
            />
            <p>
                This article is an extract of my research on React fundamentals.
                After tackling some React interview questions, I realised that
                my theoretical understanding had gaps that needed an immediate
                fix. Here are some of my findings that may prove helpful in a
                React interview and definitely will deepen your confidence as a
                developer if you are at the beginning of your journey to
                mastery.
            </p>

            <h3>Library or Framework</h3>

            <p>
                React.js is a free, open-source frontend JavaScript library
                extensively used for designing web UI interfaces. However, React
                is often mentioned as a framework in statistics and job
                listings. Framework and library as terminologies may be
                interchangeable in certain circumstances, as both refer to
                reusable code that simplifies complex functionalities.
            </p>

            <h4>Library</h4>
            <p>
                A library is a collection of pre-defined methods and classes
                developers can use to ease their work and accelerate
                development.
                <InlineReference reference={references[0]} />
                Additionally, libraries often target specific functionalities of
                an application.
            </p>
            <h4>Framework</h4>
            <p>
                A framework gives the fundamental structure while indicating the
                required customisation from the coder. The framework defines the
                workflow of a software application, informs the developer of
                what he needs, and invokes the developer's code when necessary.
            </p>
            <p>
                React lacks the completeness or restrictions of large
                ecosystems, so it is more commonly considered a library rather
                than a framework. Even though it is often listed as one of the
                most popular web development frameworks, it relies on
                third-party libraries for many features, like routing or
                server-side rendering (SSR), otherwise provided by other
                frameworks, like Next.js. One great advantage of React.js is
                that it offers freedom for structuring and customising our
                application architecture.{" "}
            </p>
            <h3>DOM vs Virtual DOM</h3>
            <p>
                To better understand how React renders a UI in the browser, we
                need to distinguish between DOM and Virtual DOM. The Document
                Object Model (DOM) is an application programming interface (API)
                for HTML and XML documents. The DOM is a structural
                representation of the web document as nodes and objects, which
                defines the logical structure of documents and how a UI document
                is accessed and manipulated.
                <br></br>
                Normally, whenever a user requests a webpage, the browser
                receives an HTML document for that page from the server. The
                browser then constructs a logical, tree-like structure from the
                HTML to show the user the requested page in the client.
                <InlineReference reference={references[1]} />
                With the DOM, programmers can build documents, navigate their
                structure, and add, modify, or delete elements and content.
                Anything found in an HTML or XML document can be accessed,
                changed, deleted, or added using the DOM.
                <InlineReference reference={references[2]} />
                The DOM represents the HTML page as a tree of elements called
                nodes and serves as an interface for the browser to enable
                interaction with JavaScript. The document is the root node, and
                the child nodes form the subtree.
            </p>
            <Figure
                image={DOMImg}
                className={"image--sml bg--white"}
                alt={"DOM"}
                zoomAllowed={true}
            />
            <h3>Virtual DOM</h3>
            <p>
                The virtual DOM (VDOM) is a programming concept where an ideal,
                or "virtual", representation of a UI is kept in memory and
                synced with the "real" DOM by a library such as ReactDOM. As the
                name implies, the virtual DOM is a much lighter in-memory
                replica of the actual DOM in the form of objects. This process
                is called reconciliation.
                <InlineReference reference={references[3]} />
            </p>
            <p>
                When a change occurs in a real DOM element, the DOM has to
                re-render not only that element but also all of its child
                elements. This traditional approach can be slow and inefficient,
                especially in complex web applications with high interactivity
                and frequent state changes. In contrast, React adopts the
                virtual DOM concept during the rendering process, aligning with
                its declarative approach: you tell React what state you want the
                UI to be in, and it makes sure the DOM matches that state. With
                this method, developers can specify the desired UI state, and
                React takes care of the rest.
            </p>
            <p>
                After updating the virtual DOM, React compares it to a previous
                snapshot, identifying the exact element that changed. It then
                optimises performance by updating only that specific element in
                the real DOM. We will delve deeper into this optimisation
                technique shortly. By abstracting manual DOM manipulations, the
                virtual DOM simplifies the development process, allowing
                developers to focus on creating components and writing code that
                is more predictable and less error-prone.
            </p>
            <Figure
                image={VDOMImg}
                className={"image--lrg bg--white"}
                alt={"Virtual DOM"}
                zoomAllowed={true}
                caption="Virtual DOM"
                reference={references[4]}
            />
            <p>
                Thanks to the virtual DOM, developers are relieved from the
                burden of managing state transitions. Once the state is updated,
                React ensures that the DOM reflects that updated state
                seamlessly. The only disadvantage of VDOM is the higher memory
                usage, as the diffing algorithms need to keep comparing the
                elements to know which components need to be updated or changed.
            </p>
            <h3>Rendering Components</h3>
            <p>
                In React, the rendering occurs when a React component's render
                method is called. This method returns a representation of the
                user interface as a Virtual DOM (a lightweight copy of the
                actual DOM). React then compares this Virtual DOM to the
                previous one, identifying the differences or updates needed.
                These updates are calculated efficiently, and only the necessary
                changes are applied to the HTML DOM. This process, called
                reconciliation, is a key part of what makes React efficient and
                performant. It ensures the application's UI stays in sync with
                its underlying data, providing a smooth and responsive user
                experience.
            </p>
            <h3>How Reconciliation Works</h3>
            <p>
                The reconciliation algorithm works by comparing the current
                virtual DOM tree to the updated virtual DOM tree, and making the
                minimum number of changes necessary to bring the virtual DOM in
                line with the updated state.
                <InlineReference reference={references[5]} />
                <br />
                <strong>Element in different types:</strong> Whenever the type
                of the element changes in the root, react will scrap the old
                tree and build a new one i.e a full rebuild of the tree.
                <br />
                <strong>Elements of the same type:</strong> When the type of
                changed element is the same, React then checks for attributes of
                both versions and then only updates the node which has changes
                without any changes in the tree. The component will be updated
                in the next lifecycle call.
                <br />
                <strong>Batching:</strong> React batches multiple changes into a
                single update, reducing the number of updates to the virtual DOM
                and, in turn, the real DOM.
            </p>
            <h3>Reconciliation Algorithms</h3>
            <p>
                A good example of when Stack Reconciling might become
                problematic is when we want to render something, and there are
                unfinished processes. Let's see the steps:
                <br />
                <strong>Initialisation:</strong> When the ReactDOM.render()
                function is called for the first time, we will create a virtual
                DOM by iterating the first element, usually the App component.
                <br />
                <strong>Rendering:</strong> While creating VDOM, we will make
                the corresponding DOM nodes and append the element to its
                parent.
                <br />
                <strong>State Change:</strong> When calling the setState()
                function, it marks the VDOM as dirty, passing the execution to
                the reconciler.
                <br />
                <strong>Reconciliation:</strong> The reconcile() function
                accepts the current node as its parameter and recursively
                reconciles every child of the current node tree to detect
                changes and update the real DOM.
                <br />
                <strong>DOM/VDOM Alignment:</strong> If the current node has
                changed, we align (modify, add, delete) its attributes to both
                DOMs (virtual and real). Additionally, shouldComponentUpdate(),
                React.memo(), and PureComponent checks will be handled in this
                phase.
                <br />
                <strong>Traverse Nodes:</strong> Iterate through every child of
                the current node and reconcile them.
                <InlineReference reference={references[6]} />
            </p>

            <Figure
                image={StackReconciliationImg}
                className={"image--lrg bg--white"}
                alt={"Stack Reconciliation"}
                zoomAllowed={true}
                caption="Stack Reconciliation"
                reference={references[6]}
            />

            <p>
                Consider a web application with a long list of items, such as a
                product catalogue, where each item corresponds to a list
                element. When a user interacts with the application, the
                following issues can arise:
                <br />
                <strong>UI Responsiveness:</strong> If each list item takes
                significant time to reconcile and render, the main thread will
                be occupied with these rendering tasks, leading to noticeable
                delays in responding to user interactions, such as typing or
                clicking.
                <br />
                <strong>Blocking User Input:</strong> While the main thread is
                busy reconciling and rendering items, it may not respond
                promptly to user input, resulting in a frustrating user
                experience, as users expect real-time or near-real-time
                responsiveness to their actions.
                <br />
                <strong>High-Priority Updates:</strong> In scenarios with
                critical, high-priority updates that users need to see
                immediately (e.g., error messages, alerts, or dynamic search
                results), the stack reconciliation process can cause delays in
                rendering these updates.
            </p>
            <h3>Fiber Reconciler</h3>
            <p>
                While Fiber has significant performance improvements, it also
                makes React development easier. Every Fiber is a plain old
                JavaScript object, and a Fiber also represents a unit of work.
                React processes Fibers ending with finished works and commits
                them by rendering them to the visible DOM. This process has two
                phases: rendering and committing. In the render phase, React
                does all kinds of asynchronous tasks, which can be prioritised,
                paused or discarded. The commit phase is a synchronous phase
                that cannot be interrupted.
            </p>
            <p>
                Every Fiber has a one-to-one relationship to things, like
                components or DOM nodes. The type of Fiber is stored in the tag
                property, which accepts a number between 0 and 24 and represents
                a type, like function component, class component, fragment, etc.
                The state node property represents the element's reference to
                access the state associated with the Fiber.{" "}
            </p>
            <p>
                The difference between Fiber and React elements is that React
                elements are continuously recreated, while Fibers are primarily
                created during the initial mount and constantly reused. Fibers
                form a tree structure, and the child, sibling and return
                properties handle the relationship between Fibres. In a Fiber,
                the child refers to the first child, all other elements will be
                connected through the sibling property, and the return is the
                reference to the parent.{" "}
            </p>

            <Figure
                image={FiberImg}
                className={"image--sml bg--white"}
                alt={"Fiber Child and Sibling"}
                zoomAllowed={true}
                caption="Fiber Child and Sibling"
                reference={references[7]}
            />

            <p>
                Fibers also represent a unit of work, and these works can be the
                following: state changes, lifecycle functions, DOM changes, and
                react can handle these works directly or scheduled. Using time
                slicing, React can split work into chunks, and high-priority
                works, such as user interaction or animations, can be scheduled
                directly using the requestAnimationFrame() function.
                Low-priority works, like a network request, can be delayed and
                scheduled with the requestIdleCallback for an idle period.
            </p>
            <p>
                In fact, two trees are used in the reconciliation process: the
                current tree that is visible on the screen and the
                work-in-progress tree. The Fiber alternate property refers to
                the Fiber pair on the work-in-progress tree to help reuse
                Fibers. React steps into a Fiber with the beginWork() function
                and keeps stepping in children until there are none, calling the
                completeWork() function. After React completes the final or root
                Fiber, the commitWork() function is called, and the changes are
                flushed to the DOM. There is only one child per node, so the
                traversal is not recursive but uses a while loop.
            </p>

            <h3>Batching</h3>
            <p>
                React can face challenges in keeping pace with user inputs or
                actions, mainly when several state updates are in play. For
                instance, when a component needs to update two or more state
                variables in response to user interactions, React may initiate
                multiple rerenders, potentially leading to a less-than-smooth or
                sluggish user experience. React uses a technique called
                batching, which means that it groups together multiple state
                updates into a single re-render for better performance.
                <InlineReference reference={references[8]} />
            </p>
            <Code
                fileName="batching.js"
                language="javascript"
                content={codeSnippets.batching}
            />
            <p>
                Before React 18, not all state updates were batched, though. For
                example, state updates using asynchronous code (e.g. Promise) or
                third-party APIs (e.g. setTimeout) weren't batched and therefore
                triggered two re-renderings (for two respective state updates)
                of the component. However, with React's additions in React 18,
                automatic batching became the default. If there are situations
                where a React developer would want to opt out of batching, one
                could use the flushSync top-level API of React.
                <InlineReference reference={references[9]} />
            </p>
            <Code
                fileName="flush.js"
                language="javascript"
                content={codeSnippets.flushedRender}
            />

            <h3>JSX</h3>
            <p>
                JavaScript XML (JSX) is a syntax extension for JavaScript often
                used with the React library.
                <InlineReference reference={references[10]} />
                It allows you to write HTML-like code within JavaScript files.
                JSX provides a more concise and readable way to describe the
                structure of user interfaces. React components use JSX to define
                the user interface's layout, structure, and appearance by
                creating a hierarchy of virtual DOM elements that are later
                rendered to the actual DOM. JSX code is transpiled into regular
                JavaScript using tools like Babel, making it compatible with web
                browsers. This approach simplifies the creation of dynamic and
                interactive web applications, making it easier for developers to
                work with the React library.
            </p>

            <p>
                Fundamentally, JSX provides syntactic sugar for the
                React.createElement(component, props, ...children) function.
                React components use capitalised JSX tags, and native, built-in
                components, such as a div, must be lowercase. Also, JSX accepts
                dot notation; therefore, MyComponents.ColourPicker is a valid
                JSX syntax and can be used to modularise complex components. A
                closing tag can also be applied if a JSX component has no
                children. Note that JSX must return a single root element, and
                multiple root elements must be wrapped with a container
                component or a fragment.
            </p>

            <p>
                JSX also accepts any JavaScript expression to assign dynamic
                properties using bracket notation. The default property value is
                true if only the property name is applied. In JSX, JavaScript
                expressions enclosed in curly braces can evaluate to strings,
                React elements, or lists of these values, providing a versatile
                way to define the structure and content of React components.
                Additionally, the props.children prop works like any other prop,
                allowing the passing of various data types, not limited to what
                React typically renders. For instance, custom components can
                receive callback functions or custom JSX structures as children,
                adding flexibility and composability to React applications.
            </p>
            <h3>Babel and JSX Transpilation</h3>
            <p>
                Babel is a JavaScript compiler that is often used in React
                development. It is crucial in transforming modern JavaScript
                code, including JSX, into versions compatible with older
                browsers and environments. Babel is essential in the React
                ecosystem for the following reasons:
                <br />
                <strong>JSX Transformation: </strong>Babel is used to transpile
                JSX code, allowing developers to write JSX syntax in their React
                components. It converts JSX into standard JavaScript code that
                browsers can understand.
                <br />
                <strong>ES6/ESNext Support: </strong>Babel enables modern
                JavaScript features (ECMAScript 6 and beyond) in React
                applications. It transforms code into ES5 or other compatible
                versions, ensuring broad browser compatibility.
                <br />
                <strong>Optimising Code: </strong>Babel can optimise and
                minimise the code, reducing its size and improving application
                performance.
                <br />
                <strong>Plugin Ecosystem: </strong>Babel has a rich ecosystem of
                plugins that can be added to tailor the transformation process
                to specific project requirements. Developers can customise
                Babel's behaviour with plugins and presets.
            </p>

            <h3>Class vs Functional Components</h3>
            <p>
                We can declare React components in two different ways, using
                classes or functions. Functional components are some of the more
                common components encountered while working in React. These are
                simple JavaScript functions that return JSX. A class component
                is a JavaScript class that extends React.Component which has a
                render method.
            </p>
            <Code
                fileName="component.js"
                language="javascript"
                content={codeSnippets.funtionalVsClass}
            />
            <p>
                A class component requires you to import and extend the
                Component class from React.Component and create a render
                function which returns a React element. Using classes results in
                additional boilerplate injected into the output compared to the
                function example. Stateless components are the simplest
                components in the React ecosystem; however, if we want to use
                functional components statefully, we must use hooks. Transpiling
                the hook-enabled function component adds significantly less
                boilerplate to the transpiled code.
            </p>
            <h3>Hooks</h3>
            <p>
                With React Hooks, we can use state and other React features in a
                functional component. It empowers developers to do functional
                programming in React.
                <InlineReference reference={references[11]} />
                React Hooks let you "hook into" state and lifecycle features in
                functional components. They were introduced in React 16.8 to
                provide a way to use state, context, refs, and other React
                features without the need for class components. React Hooks
                offer several built-in functions, each designed for a specific
                purpose:
                <br />
                <strong>useState: </strong>Allows functional components to
                manage local state. It takes an initial state value and returns
                an array with the current state and a function to update it.
                <br />
                <strong>useEffect:</strong>Enables functional components to
                perform side effects, like data fetching or DOM manipulation,
                after rendering. It replaces lifecycle methods like
                componentDidMount and componentDidUpdate.
                <br />
                <strong>useContext: </strong>Provides access to the context API,
                allowing components to consume context values.
                <br />
                <strong>useRef: </strong>Creates a mutable ref object that can
                be used to directly access and interact with DOM elements or
                store mutable values.
                <br />
                <strong>useReducer: </strong>Provides an alternative to useState
                for managing more complex state logic using a reducer function.
                <br />
                <strong>useMemo and useCallback: </strong>Memorisation functions
                that optimise performance by memorising values and functions to
                prevent unnecessary re-renders.
                <br />
                Hooks allow functional components to maintain their state, side
                effects, and other features previously only available in class
                components. They make it easier to reuse stateful logic and
                encourage the development of smaller, more focused components,
                leading to cleaner, more maintainable code.
            </p>

            <h3>Component Lifecycle Methods</h3>
            <p>
                In React class components, there are several lifecycle methods
                that you can override to add functionality to your components at
                different stages of their existence. Here is a list of the main
                React lifecycle methods:
                <br />
                <strong>componentDidMount: </strong>This method is called after
                the component is inserted into the DOM. It is often used for
                initiating AJAX requests, adding event listeners, or setting up
                timers.
                <br />
                <strong>componentDidUpdate: </strong>This method is called after
                a component's updates are flushed to the DOM. It helps handle
                updates or perform actions after a re-render.
                <br />
                <strong>componentWillUnmount: </strong>This method is called
                just before the component is removed from the DOM. It's
                typically used for cleanup, such as removing event listeners or
                cancelling timers.
                <br />
                <strong>shouldComponentUpdate: </strong>This method allows you
                to control whether the component should re-render. It returns a
                Boolean value that determines whether the re-render should
                proceed.
            </p>
            <p>
                In a React class component, the order in which the lifecycle
                methods are called follows a specific sequence. Here is the
                typical order of component lifecycle methods:
            </p>
            <p>
                <strong>Constructor: </strong>This method is called when an
                instance of the component is created. It's used for initializing
                state and setting up initial values.
                <br />
                <strong>static getDerivedStateFromProps: </strong>This is a
                static method that's called before `render`. It allows you to
                update the component's state based on changes in props.
                <br />
                <strong>render: </strong>This is the core method for rendering
                the component's UI. It should be a pure function without side
                effects.
                <br />
                <strong>componentDidMount: </strong>This method is called after
                the component is inserted into the DOM. It's often used for
                initiating AJAX requests, adding event listeners, or setting up
                timers.
                <br />
                <strong>shouldComponentUpdate: </strong>This method is called
                before re-rendering to determine whether the component should
                update. The subsequent lifecycle methods will not be invoked if
                it returns' false'.
                <br />
                <strong>render: </strong>If `shouldComponentUpdate` allows the
                update, `render` is called again to re-render the component's
                UI.
                <br />
                <strong>componentDidUpdate: </strong>This method is called after
                the component's updates are flushed to the DOM. It helps handle
                updates or perform actions after a re-render.
                <br />
                <strong>componentWillUnmount: </strong>This method is called
                just before the component is removed from the DOM. It's
                typically used for cleanup, such as removing event listeners or
                cancelling timers.
            </p>
            <Figure
                image={LifeCycleMethodsImg}
                className={"image--lrg bg--white"}
                alt="Component Lifecycle Methods in Order"
                caption="Component Lifecycle Methods in Order"
                zoomAllowed={true}
                reference={references[12]}
            />
            <p>
                It's important to note that with the introduction of function
                components and React Hooks, these lifecycle methods have
                evolved. Function components rely on the `useEffect` hook for
                handling side effects and state management. If you're using
                function components, the order and usage of lifecycle methods
                are quite different from class components.
            </p>
            <h3>Synthetic Events</h3>
            <p>
                JavaScript events serve as the means for users to engage with a
                web application, enabling actions like capturing clicks, focus,
                mouseover, and keypress interactions when they occur within the
                web browser. Each JavaScript event is paired with an event
                handler, which collaborates with an event listener. The event
                listener's role is to observe a specific event's occurrence,
                while the event handler is a function containing executable code
                that triggers once the event is detected or activated.{" "}
            </p>
            <p>
                React Synthetic Events are very similar to Native Events;
                however, with Synthetic Events, the same API interface is
                implemented across multiple browsers.
                <InlineReference reference={references[13]} />
                Both Synthetic Events and Native Events can implement the
                preventDefault and stopPropagation methods. Synthetic events are
                cross-browser, as they wrap the browser's native event through
                the nativeEvent attribute and provide a uniform API and
                consistent behaviour. Additionally, they perform better than
                native events as synthetic events are delegated to document
                through bubbling.
            </p>
            <h3>useCallback and useMemo</h3>
            <p>
                Both useCallback and useMemo are hooks in React that help
                optimize performance by memoizing values and functions. They are
                often used when you want to avoid unnecessary calculations or
                re-renders. UseCallback is used to memorise functions. It
                returns a memorised version of the function that only changes if
                one of the dependencies passed to it has changed. UseCallback is
                particularly useful when you pass functions as props to child
                components to prevent unnecessary re-renders of those
                components. We must remember that every time a component
                re-renders, its functions get recreated. Because of this, our
                function has changed because of the referential equality.
            </p>
            <Code
                fileName="useCallback.js"
                language="javascript"
                content={codeSnippets.useCallbackSnippet}
            />
            <p>
                UseMemo is used to memoize values. It takes a function and an
                array of dependencies. It returns a memoized value recalculated
                when a dependency has changed; it is useful when you want to
                optimise expensive calculations in terms of time or computation.
            </p>
            <Code
                fileName="useMemo.js"
                language="javascript"
                content={codeSnippets.useMemo}
            />
            <p>
                The useCallback and useMemo Hooks are similar. The main
                difference is that useMemo returns a memoized value and
                useCallback returns a memoized function.
                <InlineReference reference={references[14]} />
            </p>
            <h3>Context API</h3>
            <p>
                Effectively handling state is a fundamental aspect of building
                applications with React. One prevalent method of state
                management involves passing props between components. However,
                when you find yourself repeatedly passing the same data to
                numerous components or dealing with components scattered across
                your application, it can become cumbersome and potentially lead
                to performance issues, making your application less efficient
                and more challenging to maintain. Passing props through multiple
                levels of child components in React is called prop drilling or
                prop threading. Context API allows data to be passed through a
                component tree without having to pass props manually at every
                level. This makes it easier to share data between components.
                <InlineReference reference={references[15]} />
            </p>
            <p>
                You start by creating a Context using the React.createContext()
                function. This function returns an object with two properties:
                Provider and Consumer. The Provider component wraps the part of
                your component tree where you want to make certain data
                available. It accepts a value prop: the data you want to share.
                The Consumer component is used to access the data provided by
                the Provider. It can be placed in any component that needs
                access to the data, and it will automatically subscribe to
                updates when the data changes.
            </p>
            <Code
                fileName="context.js"
                language="javascript"
                content={codeSnippets.context}
            />
            <h3>Conclusion</h3>
            <p>
                In this journey through React, we've explored the core concepts
                of rendering, delving into the virtual DOM, reconciliation,
                component lifecycles and JSX. We've also uncovered the power of
                React Hooks and introduced some state management techniques like
                the Context API. This article is far from finished, and I will
                extend its content as I go along on my personal learning
                journey. I hope you found it useful.
            </p>
        </Article>
    );
};

export default ReactAnatomy;
