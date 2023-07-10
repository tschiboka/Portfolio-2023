import Welcome from "./components/Welcome/Welcome";
import { RxHamburgerMenu } from "react-icons/rx";
import { PiHamburgerDuotone } from "react-icons/pi";
import "./styles/palette.scss";
import "./App.scss";

function App() {
    return (
        <>
            <header>
                <PiHamburgerDuotone className="logo" />
                <RxHamburgerMenu className="logo" />
            </header>
            <Welcome />
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
