import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import UnderConstruction from "./components/UnderConstruction/UnderConstruction";
import Page from "./components/Page/Page";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Projects from "./components/Projects/Projects";
import Contact from "./components/Contact/Contact";
import PrivacyPolicy from "./components/PrivacyPolicy/PrivacyPolicy";
import RiffMaster from "./components/RiffMaster/RiffMaster";
import "./styles/palette.scss";

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
                path="/blog/riffmaster"
                element={
                    <Page
                        title="Tivadar Debnar | RiffMaster"
                        path="/blog/riffmaster"
                    ></Page>
                }
            />
        </Routes>
    );
}

export default App;
