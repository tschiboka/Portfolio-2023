import { FaFacebookF } from "react-icons/fa";
import { TbBrandGithubFilled } from "react-icons/tb";
import { TfiLinkedin } from "react-icons/tfi";
import { BsSun, BsMoonStars } from "react-icons/bs";
import Toggle from "../Toggle/Toggle";
import "./SubNav.scss";
import { useAppContext } from "../../../context/AppContext";

const SubNav = () => {
    const { themeMode, setThemeMode } = useAppContext();
    return (
        <div className="SubNav">
            <div className="sublogo">
                <span className="sublogo-text">
                    <span>Tivadar&nbsp;</span>
                    <span>Debnar</span>
                </span>
                {/* Welcome to tschiboka.co.uk */}
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
                <a href="https://www.facebook.com/tschiboka/">
                    <FaFacebookF title="Facebook Link" />
                </a>
                <a href="https://github.com/tschiboka">
                    <TbBrandGithubFilled title="Github Link" />
                </a>
                <a href="https://www.linkedin.com/in/tivadar-debnar/">
                    <TfiLinkedin title="LinkedIn Link" />
                </a>
            </div>
        </div>
    );
};

export default SubNav;
