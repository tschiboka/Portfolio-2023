import { FaFacebookF } from "react-icons/fa";
import { Link } from "react-router-dom";
import { TbBrandGithubFilled } from "react-icons/tb";
import { TfiLinkedin } from "react-icons/tfi";
import "./Menu.scss";
import { useAppContext } from "../../context/AppContext";

interface Props {
    pageName: string;
}

const Menu = ({ pageName }: Props) => {
    const { themeMode, setThemeMode, setMobileMenuVisible } = useAppContext();
    return (
        <menu className="Menu">
            <li className={pageName === "home" ? "active" : ""}>
                <Link
                    className="link"
                    to="/"
                    onClick={() => setMobileMenuVisible(false)}
                >
                    Home
                </Link>
            </li>
            <li className={pageName === "about" ? "active" : ""}>
                <Link
                    className="link"
                    to="/about"
                    onClick={() => setMobileMenuVisible(false)}
                >
                    About
                </Link>
            </li>
            <li className={pageName === "projects" ? "active" : ""}>
                <Link
                    className="link"
                    to="/projects"
                    onClick={() => setMobileMenuVisible(false)}
                >
                    Projects
                </Link>
            </li>
            <li className={pageName === "blog" ? "active" : ""}>
                <Link
                    className="link"
                    to="/blog"
                    onClick={() => setMobileMenuVisible(false)}
                >
                    Blog
                </Link>
            </li>
            <li className={pageName === "contact" ? "active" : ""}>
                <Link
                    className="link"
                    to="/contact"
                    onClick={() => setMobileMenuVisible(false)}
                >
                    Contact
                </Link>
            </li>
            <li
                className="link"
                onClick={() =>
                    setThemeMode(themeMode === "dark" ? "light" : "dark")
                }
            >
                Theme
            </li>

            <div className="languages">
                <a className="active" title="English">
                    En
                </a>
                |<a title="Hungarian">Hu</a>|<a title="Italian">It</a>
            </div>

            <div className="social-links">
                <a href="https://www.facebook.com/tschiboka/">
                    <FaFacebookF title="Facebook Link" />
                </a>
                <a href="https://github.com/tschiboka">
                    <TbBrandGithubFilled />
                </a>
                <a href="https://www.linkedin.com/in/tivadar-debnar/">
                    <TfiLinkedin />
                </a>
            </div>
        </menu>
    );
};

export default Menu;
