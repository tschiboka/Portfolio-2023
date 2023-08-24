import { useAppContext } from "../../../context/AppContext";
import { Link } from "react-router-dom";
import { HiMenuAlt3 } from "react-icons/hi";
import { CgClose } from "react-icons/cg";
import { BsThreeDotsVertical } from "react-icons/bs";
import iconDark from "../../../assets/images/icon.svg";
import iconLight from "../../../assets/images/icon-light.svg";
import "./Nav.scss";

interface Props {
    pageName: string;
}

const Nav = ({ pageName }: Props) => {
    const {
        themeMode,
        mainMenuVisible,
        mobileMenuVisible,
        setMobileMenuVisible,
        subMenuVisible,
        setSubMenuVisible,
    } = useAppContext();
    const getIcon = () => (themeMode === "dark" ? iconDark : iconLight);
    if (mainMenuVisible)
        return (
            <header className="Header">
                <img
                    className="t-logo"
                    src={getIcon()}
                    alt="Logo"
                    title="Home Page"
                />
                {!mobileMenuVisible ? (
                    <HiMenuAlt3
                        className="burger"
                        title="Extend Mobile Menu"
                        onClick={() => setMobileMenuVisible(true)}
                    />
                ) : (
                    <CgClose
                        title="Close Mobile Menu"
                        className="burger"
                        onClick={() => setMobileMenuVisible(false)}
                    />
                )}
                <ul className="nav_links">
                    <li className={pageName === "home" ? "active" : ""}>
                        <div className="active-dot"></div>
                        <Link className="link" to="/">
                            Home
                        </Link>
                    </li>
                    <li className={pageName === "about" ? "active" : ""}>
                        <div className="active-dot"></div>
                        <Link className="link" to="/about">
                            About
                        </Link>
                    </li>
                    <li className={pageName === "projects" ? "active" : ""}>
                        <div className="active-dot"></div>
                        <Link className="link" to="/projects">
                            Projects
                        </Link>
                    </li>
                    <li className={pageName === "blog" ? "active" : ""}>
                        <div className="active-dot"></div>
                        <Link className="link" to="/blog">
                            Blog
                        </Link>
                    </li>
                    <li className={pageName === "contact" ? "active" : ""}>
                        <div className="active-dot"></div>
                        <Link className="link" to="/contact">
                            Contact
                        </Link>
                    </li>
                    <li onClick={() => setSubMenuVisible(!subMenuVisible)}>
                        <BsThreeDotsVertical title="Toggle Submenu Visibility" />
                    </li>
                </ul>
            </header>
        );
};

export default Nav;
