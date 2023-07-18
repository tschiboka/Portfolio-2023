import Nav from "../Nav/Nav";
import Welcome from "../Welcome/Welcome";
import Menu from "../Menu/Menu";
import SubNav from "../SubNav/SubNav";
import Intro from "../Intro/Intro";
import Footer from "../Footer/Footer";

interface Props {
    pageName: string;
    mobileMenuVisible: boolean;
    setMobileMenuVisible: (visible: boolean) => void;
    themeMode: string;
    setThemeMode: (mode: string) => void;
    subMenuVisible: boolean;
    setSubMenuVisible: (visible: boolean) => void;
}

const Home = ({
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
                    pageName="home"
                    themeMode={themeMode}
                    setThemeMode={setThemeMode}
                    setMobileMenuVisible={setMobileMenuVisible}
                />
            )}
            <Welcome subMenuVisible={subMenuVisible} />
            {subMenuVisible && (
                <SubNav themeMode={themeMode} setThemeMode={setThemeMode} />
            )}
            <main>
                <Intro />
            </main>
            <Footer />
        </>
    );
};

export default Home;
