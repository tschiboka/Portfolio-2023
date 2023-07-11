import { FaFacebookF } from "react-icons/fa";
import { TbBrandGithubFilled } from "react-icons/tb";
import { TfiLinkedin } from "react-icons/tfi";
import "./Menu.scss";

interface Props {
    themeMode: string;
    setThemeMode: (themeMode: string) => void;
}

const Menu = ({ themeMode, setThemeMode }: Props) => {
    return (
        <menu className="Menu">
            <li className="active">Home</li>
            <li>About</li>
            <li>Projects</li>
            <li>Contact</li>
            <li
                onClick={() =>
                    setThemeMode(themeMode === "dark" ? "light" : "dark")
                }
            >
                Theme
            </li>

            <div className="social-links">
                <FaFacebookF />
                <TbBrandGithubFilled />
                <TfiLinkedin />
            </div>
        </menu>
    );
};

export default Menu;
