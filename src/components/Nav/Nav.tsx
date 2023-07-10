import { RxHamburgerMenu } from "react-icons/rx";
import { PiHamburgerDuotone } from "react-icons/pi";
import "./Nav.scss";

const Nav = () => {
    return (
        <header>
            <PiHamburgerDuotone className="logo" />
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
