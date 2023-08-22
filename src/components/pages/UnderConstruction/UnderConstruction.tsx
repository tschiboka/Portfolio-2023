import logo from "../../assets/images/icon-light.svg";
import { FaFacebookF } from "react-icons/fa";
import { TbBrandGithubFilled } from "react-icons/tb";
import { TfiLinkedin } from "react-icons/tfi";
import "./UnderConstruction.scss";

const UnderConstruction = () => {
    return (
        <div className="UnderConstruction">
            <h1>Coming Soon...</h1>
            <p>
                This site is under construction. I am working hard to make this
                website available again on Tuesday, the 1st of August. You will
                find a new design of my portfolio.
            </p>
            <p>Until then I look forward to seeing you!</p>
            <h2 className="name">
                <span>Tivadar</span>&nbsp;
                <span>Debnar</span>
            </h2>
            <div className="logo-wrapper">
                <img src={logo} alt="" />
            </div>
            <div className="social-links">
                <a href="https://www.facebook.com/tschiboka/">
                    <FaFacebookF title="Facebook Link" />
                </a>
                <a href="https://github.com/tschiboka">
                    <TbBrandGithubFilled title="Github Link" />
                </a>
                <a href="https://www.linkedin.com/in/tivadar-debnar/">
                    <TfiLinkedin title="LinkedIn Link" />
                </a>
            </div>
        </div>
    );
};

export default UnderConstruction;
