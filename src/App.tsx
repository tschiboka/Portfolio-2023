import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import UnderConstruction from "./components/UnderConstruction/UnderConstruction";
import Page from "./components/Page/Page";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Projects from "./components/Projects/Projects";
import Contact from "./components/Contact/Contact";
import PrivacyPolicy from "./components/PrivacyPolicy/PrivacyPolicy";
import RiffMaster from "./components/RiffMaster/RiffMaster";
import "./styles/palette.scss";
import "./App.scss";

function App() {
    const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
    const [themeMode, setThemeMode] = useState("dark");
    const [subMenuVisible, setSubMenuVisible] = useState(true);
    // NOTE: Set Under Construction Display Manually
    const underConstruction = false;

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
                    <Page title="Tivadar Debnar | Home" path="/">
                        <Home
                            pageName="home"
                            mobileMenuVisible={mobileMenuVisible}
                            setMobileMenuVisible={setMobileMenuVisible}
                            themeMode={themeMode}
                            setThemeMode={setThemeMode}
                            subMenuVisible={subMenuVisible}
                            setSubMenuVisible={setSubMenuVisible}
                            path="/"
                        />
                    </Page>
                }
            />

            <Route
                path="/about"
                element={
                    <Page title="Tivadar Debnar | About" path="/about">
                        <About
                            pageName="about"
                            mobileMenuVisible={mobileMenuVisible}
                            setMobileMenuVisible={setMobileMenuVisible}
                            themeMode={themeMode}
                            setThemeMode={setThemeMode}
                            subMenuVisible={subMenuVisible}
                            setSubMenuVisible={setSubMenuVisible}
                            path="/about"
                        />
                    </Page>
                }
            />

            <Route
                path="/projects"
                element={
                    <Page title="Tivadar Debnar | Projects" path="/projects">
                        <Projects
                            pageName="projects"
                            mobileMenuVisible={mobileMenuVisible}
                            setMobileMenuVisible={setMobileMenuVisible}
                            themeMode={themeMode}
                            setThemeMode={setThemeMode}
                            subMenuVisible={subMenuVisible}
                            setSubMenuVisible={setSubMenuVisible}
                            path="/projects"
                        />
                    </Page>
                }
            />

            <Route
                path="/contact"
                element={
                    <Page title="Tivadar Debnar | Contact" path="/contact">
                        <Contact
                            pageName="contact"
                            mobileMenuVisible={mobileMenuVisible}
                            setMobileMenuVisible={setMobileMenuVisible}
                            themeMode={themeMode}
                            setThemeMode={setThemeMode}
                            subMenuVisible={subMenuVisible}
                            setSubMenuVisible={setSubMenuVisible}
                            path="/contact"
                        />
                    </Page>
                }
            />

            {/* Nested Subpages */}

            <Route
                path="/privacy-policy"
                element={
                    <Page
                        title="Tivadar Debnar | Privacy Policy"
                        path="/privacy-policy"
                    >
                        <PrivacyPolicy
                            pageName="privacy-policy"
                            mobileMenuVisible={mobileMenuVisible}
                            setMobileMenuVisible={setMobileMenuVisible}
                            themeMode={themeMode}
                            setThemeMode={setThemeMode}
                            subMenuVisible={subMenuVisible}
                            setSubMenuVisible={setSubMenuVisible}
                            path="/privacy-policy"
                        />
                    </Page>
                }
            />

            <Route
                path="/blog/riffmaster"
                element={
                    <Page
                        title="Tivadar Debnar | RiffMaster"
                        path="blog/riffmaster"
                    >
                        <RiffMaster
                            pageName="riffmaster"
                            mobileMenuVisible={mobileMenuVisible}
                            setMobileMenuVisible={setMobileMenuVisible}
                            themeMode={themeMode}
                            setThemeMode={setThemeMode}
                            subMenuVisible={subMenuVisible}
                            setSubMenuVisible={setSubMenuVisible}
                            path="/blog/riffmaster"
                        />
                    </Page>
                }
            />
        </Routes>
    );
}

export default App;
