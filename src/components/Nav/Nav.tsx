import { RxHamburgerMenu } from "react-icons/rx";
import { CgClose } from "react-icons/cg";
import { BsThreeDotsVertical } from "react-icons/bs";
import iconDark from "../../assets/images/icon.svg";
import iconLight from "../../assets/images/icon-light.svg";
import "./Nav.scss";

interface Props {
    setMobileMenuVisible: (visible: boolean) => void;
    mobileMenuVisible: boolean;
    themeMode: string;
    setSubMenuVisible: (visible: boolean) => void;
    subMenuVisible: boolean;
}

const Nav = ({
    setMobileMenuVisible,
    mobileMenuVisible,
    themeMode,
    subMenuVisible,
    setSubMenuVisible,
}: Props) => {
    const getIcon = () => (themeMode === "dark" ? iconDark : iconLight);
    return (
        <header className="Header">
            <img
                className="t-logo"
                src={getIcon()}
                alt="Logo"
                title="Home Page"
            />
            {!mobileMenuVisible ? (
                <RxHamburgerMenu
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
                <li className="active">
                    <div className="active-dot"></div>
                    Home
                </li>
                <li>
                    <div className="active-dot"></div>
                    About
                </li>
                <li>
                    <div className="active-dot"></div>
                    Projects
                </li>
                <li>
                    <div className="active-dot"></div>Contact
                </li>
                <li onClick={() => setSubMenuVisible(!subMenuVisible)}>
                    <BsThreeDotsVertical title="Toggle Submenu Visibility" />
                </li>
            </ul>
        </header>
    );
};

export default Nav;
