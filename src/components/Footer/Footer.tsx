import { Link } from "react-router-dom";
import { FaFacebookF } from "react-icons/fa";
import { TbBrandGithubFilled } from "react-icons/tb";
import { TfiLinkedin } from "react-icons/tfi";
import logo from "../../assets/images/icon-light.svg";
import "./Footer.scss";

interface Props {
    pageName?: string;
}

const Footer = ({ pageName }: Props) => {
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
            <ul>
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
                <li className={pageName === "contact" ? "hide" : ""}>
                    <Link className="link" to="/contact" title="Contact Me">
                        CONTACT ME
                    </Link>
                </li>
                <li>
                    <a title="Download CV">RESUME</a>
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
                &copy; <time>{year}</time> Tivadar Debnar. All rights reserved.{" "}
            </p>
        </footer>
    );
};

export default Footer;
