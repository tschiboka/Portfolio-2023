// Components
import Article from "../../sharedComponents/Article/Article";
// import Figure from "../../sharedComponents/Figure/Figure";
// import Code from "../../sharedComponents/Code/Code";
// import InlineReference from "../../sharedComponents/InlineReference/InlineReference";

// Images

// Other Assets
//import codeSnippets from "./codeSnippets";
//import { getReferenceList } from "../references";

// Styles
//import "./";

interface Props {
    pageName: string;
    path: string;
}

const __ArticleTemplate__ = ({ pageName, path }: Props) => {
    //const references = getReferenceList(path);
    return (
        <Article pageName={pageName} path={path} title="">
            <h1>Template Header</h1>
            {/* <Figure
                image={calendarImg}
                className={"image--med bg--white"}
                alt={"Calendar"}
                zoomAllowed={false}
            /> */}
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet
                itaque explicabo corrupti! Distinctio placeat repellat, fugiat
                amet autem temporibus quis officia nobis aperiam accusamus
                sapiente, aspernatur, molestiae nostrum velit possimus.
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

export default __ArticleTemplate__;
