import { useEffect, useState } from "react";
import Nav from "./components/Nav/Nav";
import Welcome from "./components/Welcome/Welcome";
import Menu from "./components/Menu/Menu";
import SubNav from "./components/SubNav/SubNav";
import Intro from "./components/Intro/Intro";
import "./styles/palette.scss";
import "./App.scss";

function App() {
    const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
    const [themeMode, setThemeMode] = useState("dark");
    const [subMenuVisible, setSubMenuVisible] = useState(true);

    useEffect(() => {
        const body = document.getElementsByTagName("body")[0];
        body.className = themeMode;
    }, [themeMode]);

    return (
        <>
            <Nav
                subMenuVisible={subMenuVisible}
                setSubMenuVisible={setSubMenuVisible}
                setMobileMenuVisible={setMobileMenuVisible}
                mobileMenuVisible={mobileMenuVisible}
                themeMode={themeMode}
            />
            {mobileMenuVisible && (
                <Menu themeMode={themeMode} setThemeMode={setThemeMode} />
            )}
            <Welcome subMenuVisible={subMenuVisible} />
            {subMenuVisible && (
                <SubNav themeMode={themeMode} setThemeMode={setThemeMode} />
            )}
            <main>
                <Intro />
            </main>
        </>
    );
}

export default App;
