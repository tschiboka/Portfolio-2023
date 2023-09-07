// Components
import Article from "../../sharedComponents/Article/Article";
import Figure from "../../sharedComponents/Figure/Figure";
import Code from "../../sharedComponents/Code/Code";
import { Link } from "react-router-dom";

// Images
import introImg from "../../../assets/images/blog/greenRooftop/intro.png";

// Other Assets
//import codeSnippets from "./codeSnippets";
import { getReferenceList } from "../references";

// Styles
import "./GreenRooftop.scss";
import InlineReference from "../../sharedComponents/InlineReference/InlineReference";

interface Props {
    pageName: string;
    path: string;
}

const GreenRooftop = ({ pageName, path }: Props) => {
    const references = getReferenceList(path);
    return (
        <Article pageName={pageName} path={path} title="JS Date Validation">
            <h1>Validating Dates with JavaScript</h1>
            <Figure
                image={introImg}
                className={"image--med bg--white"}
                alt={"Green Plant"}
                zoomAllowed={false}
            />
            <p>
                In this hands-on tutorial, you'll embark on a journey to create
                an intelligent rooftop garden system that can monitor
                environmental parameters such as temperature, humidity,
                moisture, and light. We will create a user-friendly interface
                featuring buttons, LCD, and a buzzer for easy interaction. This
                project offers an ideal learning experience for those looking to
                combine Arduino with an API, as we will also create a simple
                NodeJs server and a website. Let's begin this educational
                adventure with a greener, more sustainable future in mind.
            </p>
            <p>
                IoT has the potential to play a significant role in helping to
                address environmental challenges. By leveraging IoT devices and
                technologies, it is possible to gather data about various
                environmental factors such as air and water quality, weather
                patterns, and biodiversity. This data can then inform and
                improve conservation efforts, monitor and mitigate pollution,
                and support sustainable agriculture and energy practices.
                Through the collection and analysis of real-time data, IoT can
                help optimise resource use, reduce waste and pollution, and
                support the transition to a more sustainable and circular
                economy.
                <InlineReference reference={references[0]} />
            </p>
            {/* <Code
                fileName="validateDate.tsx"
                language="arduino"
                content={codeSnippets.dateOverFlow}
            /> */}
        </Article>
    );
};

export default GreenRooftop;
