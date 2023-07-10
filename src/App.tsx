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
        </>
    );
}

export default App;
