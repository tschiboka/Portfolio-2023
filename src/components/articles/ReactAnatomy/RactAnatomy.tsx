// Components
import Article from "../../sharedComponents/Article/Article";
import Figure from "../../sharedComponents/Figure/Figure";
// import Code from "../../sharedComponents/Code/Code";
import InlineReference from "../../sharedComponents/InlineReference/InlineReference";

// Images
import ReactTitleImg from "../../../assets/images/blog/react_anatomy/react.jpg";
import DOMImg from "../../../assets/images/blog/react_anatomy/DOM.png";

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
                need to distinguish between DOM and Virtual DOM.
            </p>
            <p>
                The Document Object Model (DOM) is an application programming
                interface (API) for HTML and XML documents. The DOM is a
                structural representation of the web document as nodes and
                objects, which defines the logical structure of documents and
                how a UI document is accessed and manipulated. With the DOM,
                programmers can build documents, navigate their structure, and
                add, modify, or delete elements and content. Anything found in
                an HTML or XML document can be accessed, changed, deleted, or
                added using the DOM.
                <InlineReference reference={references[1]} />
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
                synced with the "real" DOM by a library such as ReactDOM. This
                process is called reconciliation.
                <InlineReference reference={references[2]} />
            </p>
            <h3>React Rendering</h3>
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
