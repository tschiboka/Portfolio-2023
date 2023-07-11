import { RxHamburgerMenu } from "react-icons/rx";
import { CgClose } from "react-icons/cg";
import iconDark from "../../assets/images/icon.svg";
import iconLight from "../../assets/images/icon-light.svg";
import "./Nav.scss";

interface Props {
    setMobileMenuVisible: (visible: boolean) => void;
    mobileMenuVisible: boolean;
    themeMode: string;
}

const Nav = ({ setMobileMenuVisible, mobileMenuVisible, themeMode }: Props) => {
    const getIcon = () => (themeMode === "dark" ? iconDark : iconLight);
    return (
        <header className="Header">
            <img className="t-logo" src={getIcon()} alt="Logo" />
            {!mobileMenuVisible ? (
                <RxHamburgerMenu
                    className="burger"
                    onClick={() => setMobileMenuVisible(true)}
                />
            ) : (
                <CgClose
                    className="burger"
                    onClick={() => setMobileMenuVisible(false)}
                />
            )}
            <ul className="nav_links">
                <li className="active">Home</li>
                <li>About</li>
                <li>Projects</li>
                <li>Contact</li>
            </ul>
        </header>
    );
};

export default Nav;
