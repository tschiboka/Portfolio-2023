import Footer from "../Footer/Footer";
import Menu from "../Menu/Menu";
import Nav from "../Nav/Nav";
import SubNav from "../SubNav/SubNav";
import buildGiutarStockImg from "../../assets/images/RiffMaster/BuildGuitarStockPhoto.png";
import "./RiffMaster.scss";

interface Props {
    pageName: string;
    mobileMenuVisible: boolean;
    setMobileMenuVisible: (visible: boolean) => void;
    themeMode: string;
    setThemeMode: (mode: string) => void;
    subMenuVisible: boolean;
    setSubMenuVisible: (visible: boolean) => void;
}

const RiffMaster = ({
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
            {subMenuVisible && (
                <SubNav themeMode={themeMode} setThemeMode={setThemeMode} />
            )}
            {mobileMenuVisible && (
                <Menu
                    pageName="PrivacyPolicy"
                    themeMode={themeMode}
                    setThemeMode={setThemeMode}
                    setMobileMenuVisible={setMobileMenuVisible}
                />
            )}
            <main>
                <h1>Project RiffMaster</h1>
                <h2>
                    Building a Digital Guitar Instrument with an Application
                </h2>
                <img
                    className="image-lrg"
                    src={buildGiutarStockImg}
                    alt="Guitar Building"
                />
                <p>
                    We all know the pain when it comes to choosing a
                    dissertation topic, and it is exponentially more
                    excruciating when our project must also be implemented for
                    more practical disciplines, such as computer science and
                    software engineering. While originality is encouraged,
                    graduates must also consider the feasibility and the
                    relatively short deadline. This digital guitar project idea
                    was born in my internal struggle to be innovative and create
                    a project that might contribute to the greater good with
                    some educational and entertainment aspects.
                </p>
                <h3>Project Outline</h3>
                <p>
                    Create a bespoke music experience by developing a hardware
                    device and accompanying software that offers a naturalistic
                    guitar layout for learning and playing. The device's
                    minimalistic design ensures affordability while connecting
                    via USB to an online platform. This comprehensive solution
                    aims to enhance guitar skill development through playful
                    learning of riffs, chords, and songs.
                </p>
            </main>
            <Footer />
        </>
    );
};

export default RiffMaster;
