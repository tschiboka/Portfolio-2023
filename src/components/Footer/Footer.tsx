import "./Footer.scss";
import { FaFacebookF } from "react-icons/fa";
import { TbBrandGithubFilled } from "react-icons/tb";
import { TfiLinkedin } from "react-icons/tfi";
import logo from "../../assets/images/icon-light.svg";

const Footer = () => {
    const date = new Date();
    const year = date.getFullYear();

    return (
        <footer className="Footer">
            <div className="logo-wrapper">
                <img src={logo} alt="" />
            </div>
            <a>ABOUT</a>
            <a>PROJECTS</a>
            <a>CONTACT</a>
            <a>RESUME</a>
            <div className="social-links">
                <FaFacebookF title="Facebook Link" />
                <TbBrandGithubFilled title="Github Link" />
                <TfiLinkedin title="LinkedIn Link" />
            </div>
            <a>TERMS AND CONDITIONS</a>

            <p className="copyright">
                &copy; <time>{year}</time> Tivadar Debnar. All rights reserved.{" "}
            </p>
        </footer>
    );
};

export default Footer;
