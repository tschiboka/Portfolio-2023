import Nav from "../Nav/Nav";
import Welcome from "../Welcome/Welcome";
import Menu from "../Menu/Menu";
import SubNav from "../SubNav/SubNav";
import Intro from "../Intro/Intro";
import Footer from "../Footer/Footer";
import { useAppContext } from "../../context/AppContext";
import Page from "../Page/Page";

interface Props {
    pageName: string;
    path: string;
}

const Home = ({ pageName, path }: Props) => {
    const { mobileMenuVisible, subMenuVisible } = useAppContext();

    return (
        <Page title="Tivadar Debnar | Home" path="/">
            <Nav pageName={pageName} />
            {mobileMenuVisible && <Menu pageName="home" />}
            <Welcome />
            {subMenuVisible && <SubNav />}
            <main>
                <Intro />
            </main>
            <Footer pageName={pageName} path={path} />
        </Page>
    );
};

export default Home;
