import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
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

    useEffect(() => {
        const body = document.getElementsByTagName("body")[0];
        body.className = themeMode;
    }, [themeMode]);

    return (
        <Routes>
            <Route
                path="/"
                element={
                    <Home
                        pageName="home"
                        mobileMenuVisible={mobileMenuVisible}
                        setMobileMenuVisible={setMobileMenuVisible}
                        themeMode={themeMode}
                        setThemeMode={setThemeMode}
                        subMenuVisible={subMenuVisible}
                        setSubMenuVisible={setSubMenuVisible}
                    />
                }
            />

            <Route
                path="/about"
                element={
                    <About
                        pageName="about"
                        mobileMenuVisible={mobileMenuVisible}
                        setMobileMenuVisible={setMobileMenuVisible}
                        themeMode={themeMode}
                        setThemeMode={setThemeMode}
                        subMenuVisible={subMenuVisible}
                        setSubMenuVisible={setSubMenuVisible}
                    />
                }
            />

            <Route
                path="/projects"
                element={
                    <Projects
                        pageName="projects"
                        mobileMenuVisible={mobileMenuVisible}
                        setMobileMenuVisible={setMobileMenuVisible}
                        themeMode={themeMode}
                        setThemeMode={setThemeMode}
                        subMenuVisible={subMenuVisible}
                        setSubMenuVisible={setSubMenuVisible}
                    />
                }
            />

            <Route
                path="/contact"
                element={
                    <Contact
                        pageName="contact"
                        mobileMenuVisible={mobileMenuVisible}
                        setMobileMenuVisible={setMobileMenuVisible}
                        themeMode={themeMode}
                        setThemeMode={setThemeMode}
                        subMenuVisible={subMenuVisible}
                        setSubMenuVisible={setSubMenuVisible}
                    />
                }
            />

            <Route
                path="/privacy-policy"
                element={
                    <PrivacyPolicy
                        pageName="privacy-policy"
                        mobileMenuVisible={mobileMenuVisible}
                        setMobileMenuVisible={setMobileMenuVisible}
                        themeMode={themeMode}
                        setThemeMode={setThemeMode}
                        subMenuVisible={subMenuVisible}
                        setSubMenuVisible={setSubMenuVisible}
                    />
                }
            />
        </Routes>
    );
}

export default App;
