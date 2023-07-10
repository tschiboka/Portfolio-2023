import { RxHamburgerMenu } from "react-icons/rx";
import { CgClose } from "react-icons/cg";
import icon from "../../assets/images/icon.svg";
import "./Nav.scss";

interface Props {
    setMobileMenuVisible: (visible: boolean) => void;
    mobileMenuVisible: boolean;
}

const Nav = ({ setMobileMenuVisible, mobileMenuVisible }: Props) => {
    return (
        <header>
            <img className="t-logo" src={icon} alt="" />
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
