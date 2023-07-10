import { AiOutlineHome } from "react-icons/ai";
import { TbInfoHexagon } from "react-icons/tb";
import { BiMessageDetail, BiCodeAlt } from "react-icons/bi";
import { BsSun, BsMoonStars } from "react-icons/bs";
import "./Menu.scss";

const Menu = () => {
    return (
        <menu className="Menu">
            <li className="active">
                <AiOutlineHome className="menu-icon" />
                <div className="text-wrapper">Home</div>
            </li>
            <li>
                <TbInfoHexagon className="menu-icon" />
                <div className="text-wrapper">About</div>
            </li>
            <li>
                <BiCodeAlt className="menu-icon" />
                <div className="text-wrapper">Projects</div>
            </li>
            <li>
                <BiMessageDetail className="menu-icon" />
                <div className="text-wrapper">Contact</div>
            </li>
            <li>
                <BsSun className="menu-icon" />
                <div className="text-wrapper">Theme</div>
            </li>
        </menu>
    );
};

export default Menu;
