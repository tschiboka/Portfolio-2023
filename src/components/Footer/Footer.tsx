import { Link } from "react-router-dom";
import { FaFacebookF } from "react-icons/fa";
import { TbBrandGithubFilled } from "react-icons/tb";
import { TfiLinkedin } from "react-icons/tfi";
import logo from "../../assets/images/icon-light.svg";
import "./Footer.scss";

const Footer = () => {
    const date = new Date();
    const year = date.getFullYear();

    return (
        <footer className="Footer">
            <div className="logo-wrapper">
                <img src={logo} alt="" />
            </div>
            <Link className="link" to="/about">
                ABOUT
            </Link>
            <Link className="link" to="/projects">
                PROJECTS
            </Link>
            <Link className="link" to="/contact">
                CONTACT
            </Link>
            <a>RESUME</a>
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
            <Link>TERMS AND CONDITIONS</Link>

            <p className="copyright">
                &copy; <time>{year}</time> Tivadar Debnar. All rights reserved.{" "}
            </p>
        </footer>
    );
};

export default Footer;
