import { RxHamburgerMenu } from "react-icons/rx";
import { PiHamburgerDuotone } from "react-icons/pi";
import "./Nav.scss";

const Nav = () => {
    return (
        <header>
            <PiHamburgerDuotone className="logo" />
            <RxHamburgerMenu className="logo" />
        </header>
    );
};

export default Nav;
