// Components
import Article from "../../sharedComponents/Article/Article";
import Figure from "../../sharedComponents/Figure/Figure";
// import Code from "../../sharedComponents/Code/Code";
import InlineReference from "../../sharedComponents/InlineReference/InlineReference";

// Images
import ReactTitleImg from "../../../assets/images/blog/react_anatomy/react.jpg";
import DOMImg from "../../../assets/images/blog/react_anatomy/DOM.png";
import VDOMImg from "../../../assets/images/blog/react_anatomy/virtual-dom.png";
import StackReconciliationImg from "../../../assets/images/blog/react_anatomy/stack-reconciliation.jpg";
import FiberImg from "../../../assets/images/blog/react_anatomy/fiber.png";

// Other Assets
//import codeSnippets from "./codeSnippets";
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
        <Article pageName={pageName} path={path} title="JS Date Validation">
            <h1>Template Header</h1>
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
                its declarative approach. With this method, developers can
                specify the desired UI state, and React takes care of the rest.
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
                seamlessly.
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

            {/* <Code
                fileName="validateDate.tsx"
                language="arduino"
                content={codeSnippets.basicDateValidation}
              /> */}
            {/* <InlineReference reference={references[0]} /> */}
        </Article>
    );
};

export default ReactAnatomy;
