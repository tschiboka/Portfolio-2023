// Components
import Article from "../../sharedComponents/Article/Article";
import Figure from "../../sharedComponents/Figure/Figure";
// import Code from "../../sharedComponents/Code/Code";
// import InlineReference from "../../sharedComponents/InlineReference/InlineReference";

// Images
import ReactTitleImg from "../../../assets/images/blog/react_anatomy/react.jpg";

// Other Assets
//import codeSnippets from "./codeSnippets";
//import { getReferenceList } from "../references";

// Styles
//import "./";

interface Props {
    pageName: string;
    path: string;
}

const ReactAnatomy = ({ pageName, path }: Props) => {
    //const references = getReferenceList(path);
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
                React.js is a free, open-source frontend JavaScript library
                extensively used for designing web UI interfaces. As React lacks
                the completeness or restrictions of large ecosystems; hence, it
                is more commonly considered a library rather than a framework.
                Even though it is often listed as one of the most popular web
                development frameworks, it relies on third-party libraries for
                many features, like routing or server-side rendering (SSR),
                otherwise provided by other frameworks, like Next.js. One great
                advantage of React.js is that it offers freedom for structuring
                and customising our application architecture.
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
