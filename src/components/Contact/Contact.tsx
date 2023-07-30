import Nav from "../Nav/Nav";
import Menu from "../Menu/Menu";
import SubNav from "../SubNav/SubNav";
import Footer from "../Footer/Footer";
import { MdAlternateEmail } from "react-icons/md";
import { FiPhone } from "react-icons/fi";
import "./Contact.scss";
import { Link } from "react-router-dom";

interface Props {
    pageName: string;
    mobileMenuVisible: boolean;
    setMobileMenuVisible: (visible: boolean) => void;
    themeMode: string;
    setThemeMode: (mode: string) => void;
    subMenuVisible: boolean;
    setSubMenuVisible: (visible: boolean) => void;
}

const Contact = ({
    pageName,
    mobileMenuVisible,
    setMobileMenuVisible,
    themeMode,
    setThemeMode,
    subMenuVisible,
    setSubMenuVisible,
}: Props) => {
    const mail = "tibi.aki.tivadar@gmail.com";
    const tel = "07474999334";
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
            {mobileMenuVisible && (
                <Menu
                    pageName="contact"
                    themeMode={themeMode}
                    setThemeMode={setThemeMode}
                    setMobileMenuVisible={setMobileMenuVisible}
                />
            )}
            {subMenuVisible && (
                <SubNav themeMode={themeMode} setThemeMode={setThemeMode} />
            )}
            <main className="contact">
                <h1>Get in Touch</h1>
                <ul className="contacts">
                    <li>
                        <MdAlternateEmail className="icon" />
                        <Link className="link" to={`mailto:${mail}`}>
                            Tibi.Aki.Tivadar@Gmail.Com
                        </Link>
                    </li>
                    <li>
                        <FiPhone className="icon" />
                        <a href={`tel:${tel}`} className="link">
                            07474999334
                        </a>
                    </li>
                </ul>
                <hr />
                <form>
                    <fieldset>
                        <label htmlFor="name">
                            Name<span>*</span>
                        </label>
                        <input id="name" type="text" />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="name">
                            Email<span>*</span>
                        </label>
                        <input id="email" type="text" />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="name">Phone</label>
                        <input id="phone" type="text" />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="message">
                            Message<span>*</span>
                        </label>
                        <textarea id="name" />
                    </fieldset>
                    <button className="submit-message" type="button">
                        Send Your Message
                    </button>
                </form>
            </main>
            <Footer pageName={pageName} />
        </>
    );
};

export default Contact;
