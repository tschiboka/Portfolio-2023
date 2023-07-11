import { FaFacebookF } from "react-icons/fa";
import { TbBrandGithubFilled } from "react-icons/tb";
import { TfiLinkedin } from "react-icons/tfi";
import { BsSun, BsMoonStars } from "react-icons/bs";
import Toggle from "../Toggle/Toggle";
import "./SubNav.scss";

interface Props {
    themeMode: string;
    setThemeMode: (theme: string) => void;
}

const SubNav = ({ themeMode, setThemeMode }: Props) => {
    return (
        <div className="SubNav">
            <div className="sublogo">
                <span className="sublogo-text">Welcome to my website!</span>
            </div>
            <div className="social-links">
                <div className="theme-toggle" title="Toggle Colour Theme">
                    <Toggle
                        handleClick={() =>
                            setThemeMode(
                                themeMode === "dark" ? "light" : "dark"
                            )
                        }
                        active={themeMode === "dark"}
                    >
                        {themeMode === "dark" ? (
                            <BsSun className="theme-icon" />
                        ) : (
                            <BsMoonStars className="theme-icon" />
                        )}
                    </Toggle>
                </div>
                <FaFacebookF title="Facebook Link" />
                <TbBrandGithubFilled title="Github Link" />
                <TfiLinkedin title="LinkedIn Link" />
            </div>
        </div>
    );
};

export default SubNav;
