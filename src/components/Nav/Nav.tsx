import { RxHamburgerMenu } from "react-icons/rx";
import { PiHamburgerDuotone } from "react-icons/pi";
import icon from "../../assets/images/icon.svg";
import "./Nav.scss";

const Nav = () => {
    return (
        <header>
            <img className="t-logo" src={icon} alt="" />
            <RxHamburgerMenu className="burger" />
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
