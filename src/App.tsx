import { useEffect, useState } from "react";
import Nav from "./components/Nav/Nav";
import Welcome from "./components/Welcome/Welcome";
import Menu from "./components/Menu/Menu";
import SubNav from "./components/SubNav/SubNav";
import "./styles/palette.scss";
import "./App.scss";

function App() {
    const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
    const [themeMode, setThemeMode] = useState("dark");
    useEffect(() => {
        const body = document.getElementsByTagName("body")[0];
        body.className = themeMode;
    }, [themeMode]);

    return (
        <>
            <Nav
                setMobileMenuVisible={setMobileMenuVisible}
                mobileMenuVisible={mobileMenuVisible}
                themeMode={themeMode}
            />
            {mobileMenuVisible && <Menu />}
            <Welcome />
            <SubNav themeMode={themeMode} setThemeMode={setThemeMode} />
            <div className="hero">
                <p>
                    <strong>Hello there!&nbsp;</strong>
                    <br />
                    <br />
                    I'm pleased that you've found your way here. Whether you
                    share my passion for coding and design or need a supporting
                    hand with web development, you've come to the right place.
                </p>
            </div>
            {/* <p>
                I'm a dedicated web developer with a deep love for crafting
                beautiful and functional websites and web applications. I strive
                to create impressive digital experiences that leave an impact
                and projects I'm proud of.
            </p> */}
        </>
    );
}

export default App;
