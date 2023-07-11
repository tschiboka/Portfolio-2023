import { FaFacebookF } from "react-icons/fa";
import { TbBrandGithubFilled } from "react-icons/tb";
import { TfiLinkedin } from "react-icons/tfi";
import { BsSun, BsMoonStars } from "react-icons/bs";
import Toggle from "../Toggle/Toggle";
import "./SubNav.scss";

const SubNav = () => {
    return (
        <div className="SubNav">
            <div className="theme-toggle">
                <span className="sublogo-text">Welcome to my website!</span>
            </div>
            <div className="social-links">
                <div className="theme-toggle">
                    <Toggle>
                        <BsSun className="theme-icon" />
                    </Toggle>
                </div>
                <FaFacebookF />
                <TbBrandGithubFilled />
                <TfiLinkedin />
            </div>
        </div>
    );
};

export default SubNav;
