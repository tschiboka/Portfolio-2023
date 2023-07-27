import Nav from "../Nav/Nav";
import Menu from "../Menu/Menu";
import "./Projects.scss";
import SubNav from "../SubNav/SubNav";

interface Props {
    pageName: string;
    mobileMenuVisible: boolean;
    setMobileMenuVisible: (visible: boolean) => void;
    themeMode: string;
    setThemeMode: (mode: string) => void;
    subMenuVisible: boolean;
    setSubMenuVisible: (visible: boolean) => void;
}

const Projects = ({
    pageName,
    mobileMenuVisible,
    setMobileMenuVisible,
    themeMode,
    setThemeMode,
    subMenuVisible,
    setSubMenuVisible,
}: Props) => {
    return (
        <>
            <Nav
                pageName={pageName}
                subMenuVisible={subMenuVisible}
                setSubMenuVisible={setSubMenuVisible}
                setMobileMenuVisible={setMobileMenuVisible}
                mobileMenuVisible={mobileMenuVisible}
                themeMode={themeMode}
            />
            {mobileMenuVisible && (
                <Menu
                    pageName="projects"
                    themeMode={themeMode}
                    setThemeMode={setThemeMode}
                    setMobileMenuVisible={setMobileMenuVisible}
                />
            )}
            {subMenuVisible && (
                <SubNav themeMode={themeMode} setThemeMode={setThemeMode} />
            )}
        </>
    );
};

export default Projects;
