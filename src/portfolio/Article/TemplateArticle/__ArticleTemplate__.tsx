import { Paragraph } from '@common-ux/Typography/Paragraph'
import { Heading } from '@common-ux/Typography/Heading'
import { Article } from '../Article'
// Components
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
    pageName: string
    path: string
}

export const __ArticleTemplate__ = ({ pageName, path }: Props) => {
    //const references = getReferenceList(path);
    return (
        <Article pageName={pageName} path={path} title="">
            <Heading as="h1">Template Header</Heading>
            {/* <Figure
                image={calendarImg}
                className={"image--med bg--white"}
                alt={"Calendar"}
                zoomAllowed={false}
            /> */}
            <Paragraph>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet itaque explicabo
                corrupti! Distinctio placeat repellat, fugiat amet autem temporibus quis officia
                nobis aperiam accusamus sapiente, aspernatur, molestiae nostrum velit possimus.
            </Paragraph>
            {/* <Code
                fileName="validateDate.tsx"
                language="arduino"
                content={codeSnippets.basicDateValidation}
              /> */}
            {/* <InlineReference reference={references[0]} /> */}
        </Article>
    )
}
