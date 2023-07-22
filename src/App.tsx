import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import UnderConstruction from "./components/UnderConstruction/UnderConstruction";
import Page from "./components/Page/Page";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Projects from "./components/Projects/Projects";
import Contact from "./components/Contact/Contact";
import PrivacyPolicy from "./components/PrivacyPolicy/PrivacyPolicy";
import "./styles/palette.scss";
import "./App.scss";

function App() {
    const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
    const [themeMode, setThemeMode] = useState("dark");
    const [subMenuVisible, setSubMenuVisible] = useState(true);
    const underConstruction = true;

    useEffect(() => {
        const body = document.getElementsByTagName("body")[0];
        body.className = themeMode;
    }, [themeMode]);

    if (underConstruction) return <UnderConstruction />;

    return (
        <Routes>
            <Route
                path="/"
                element={
                    <Page title="Tivadar Debnar | Home">
                        <Home
                            pageName="home"
                            mobileMenuVisible={mobileMenuVisible}
                            setMobileMenuVisible={setMobileMenuVisible}
                            themeMode={themeMode}
                            setThemeMode={setThemeMode}
                            subMenuVisible={subMenuVisible}
                            setSubMenuVisible={setSubMenuVisible}
                        />
                    </Page>
                }
            />

            <Route
                path="/about"
                element={
                    <Page title="Tivadar Debnar | About">
                        <About
                            pageName="about"
                            mobileMenuVisible={mobileMenuVisible}
                            setMobileMenuVisible={setMobileMenuVisible}
                            themeMode={themeMode}
                            setThemeMode={setThemeMode}
                            subMenuVisible={subMenuVisible}
                            setSubMenuVisible={setSubMenuVisible}
                        />
                    </Page>
                }
            />

            <Route
                path="/projects"
                element={
                    <Page title="Tivadar Debnar | Projects">
                        <Projects
                            pageName="projects"
                            mobileMenuVisible={mobileMenuVisible}
                            setMobileMenuVisible={setMobileMenuVisible}
                            themeMode={themeMode}
                            setThemeMode={setThemeMode}
                            subMenuVisible={subMenuVisible}
                            setSubMenuVisible={setSubMenuVisible}
                        />
                    </Page>
                }
            />

            <Route
                path="/contact"
                element={
                    <Page title="Tivadar Debnar | Contact">
                        <Contact
                            pageName="contact"
                            mobileMenuVisible={mobileMenuVisible}
                            setMobileMenuVisible={setMobileMenuVisible}
                            themeMode={themeMode}
                            setThemeMode={setThemeMode}
                            subMenuVisible={subMenuVisible}
                            setSubMenuVisible={setSubMenuVisible}
                        />
                    </Page>
                }
            />

            <Route
                path="/privacy-policy"
                element={
                    <Page title="Tivadar Debnar | Privacy Policy">
                        <PrivacyPolicy
                            pageName="privacy-policy"
                            mobileMenuVisible={mobileMenuVisible}
                            setMobileMenuVisible={setMobileMenuVisible}
                            themeMode={themeMode}
                            setThemeMode={setThemeMode}
                            subMenuVisible={subMenuVisible}
                            setSubMenuVisible={setSubMenuVisible}
                        />
                    </Page>
                }
            />
        </Routes>
    );
}

export default App;
