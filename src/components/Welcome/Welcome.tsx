import headshot from "../../assets/images/headshot_placeholder.png";
import {
    SiHtml5,
    SiCss3,
    SiJavascript,
    SiReact,
    SiMongodb,
    SiAdobephotoshop,
    SiAdobeillustrator,
} from "react-icons/si";
import { FaNodeJs } from "react-icons/fa";
import "./Welcome.scss";

interface Props {
    subMenuVisible: boolean;
}

const Welcome = ({ subMenuVisible }: Props) => {
    return (
        <div className={"Welcome" + (!subMenuVisible ? " extended" : "")}>
            <img src={headshot} />
            <h1>
                <strong>Tivadar Debnar</strong>
                <span>|</span>
                <span>Web Developer</span>{" "}
            </h1>
            <div className="line"></div>
            <ul className="dev-tools">
                <li>
                    <SiHtml5 title="HTML5" />
                </li>
                <li>
                    <SiCss3 title="CSS3" />
                </li>
                <li>
                    <SiReact title="React" />
                </li>
                <li>
                    <FaNodeJs title="NodeJs" />
                </li>
                <li>
                    <SiMongodb title="MongoDB" />
                </li>
                <li>
                    <SiAdobephotoshop title="Adobe Photoshop" />
                </li>
                <li>
                    <SiAdobeillustrator title="Adobe Ill" />
                </li>
            </ul>
        </div>
    );
};

export default Welcome;
