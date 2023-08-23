import { Link } from "react-router-dom";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
import { FaFacebookF } from "react-icons/fa";
import { TbBrandGithubFilled } from "react-icons/tb";
import { TfiLinkedin } from "react-icons/tfi";
import { MdCopyright } from "react-icons/md";
import cv from "../../../assets/files/Tivadar_Debnar_CV_2023.pdf";
import logo from "../../../assets/images/icon-light.svg";
import "./Footer.scss";

interface Props {
    pageName?: string;
    path: string;
}

const Footer = ({ pageName, path }: Props) => {
    const date = new Date();
    const year = date.getFullYear();

    return (
        <footer className="Footer">
            <div className="logo-wrapper">
                <img src={logo} alt="" />
            </div>
            <span className="name">
                <span>Tivadar&nbsp;</span>
                <span>Debnar</span>
            </span>
            <Breadcrumb path={path} />
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
            <ul className="link-list">
                <li className={pageName === "home" ? "hide" : ""}>
                    <Link className="link" to="/" title="Home Page">
                        HOME
                    </Link>
                </li>
                <li className={pageName === "about" ? "hide" : ""}>
                    <Link className="link" to="/about" title="About Page">
                        ABOUT
                    </Link>
                </li>
                <li className={pageName === "projects" ? "hide" : ""}>
                    <Link className="link" to="/projects" title="Projects Page">
                        PROJECTS
                    </Link>
                </li>
                <li className={pageName === "blog" ? "hide" : ""}>
                    <Link className="link" to="/blog" title="Blog Page">
                        BLOG
                    </Link>
                </li>
                <li className={pageName === "contact" ? "hide" : ""}>
                    <Link className="link" to="/contact" title="Contact Me">
                        CONTACT ME
                    </Link>
                </li>
                <li>
                    <a title="Download CV" href={cv} download>
                        R&Egrave;SUM&Egrave;
                    </a>
                </li>
                <li>
                    <Link to="/privacy-policy" title="Privacy Policy">
                        PRIVACY POLICY
                    </Link>
                </li>
            </ul>
            <div className="languages">
                <a className="active" title="English">
                    En
                </a>
                |<a title="Hungarian">Hu</a>|<a title="Italian">It</a>
            </div>

            <p className="copyright">
                <MdCopyright className="copyright__icon" />
                <time>{year}</time>
                <span className="copyright__pipe">|</span>
                Tivadar Debnar. All rights reserved.{" "}
            </p>
        </footer>
    );
};

export default Footer;
