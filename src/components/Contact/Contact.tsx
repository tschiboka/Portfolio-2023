import Nav from "../Nav/Nav";
import Menu from "../Menu/Menu";
import SubNav from "../SubNav/SubNav";
import Footer from "../Footer/Footer";
import { MdAlternateEmail } from "react-icons/md";
import { FiPhone } from "react-icons/fi";
import "./Contact.scss";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";

interface Props {
    pageName: string;
    mobileMenuVisible: boolean;
    setMobileMenuVisible: (visible: boolean) => void;
    themeMode: string;
    setThemeMode: (mode: string) => void;
    subMenuVisible: boolean;
    setSubMenuVisible: (visible: boolean) => void;
}

interface ValidationResult {
    valid: boolean;
    error: string;
}

const MAX_MESSAGE_CHARACTERS = 1000;

const validateName = (name: string): ValidationResult => {
    const nameRegex = /^[a-z \-']+$/i;
    if (name.length === 0) return { valid: false, error: "Cannot be Empty!" };
    if (name.length > 50) return { valid: false, error: "Too Long!" };
    if (!nameRegex.test(name))
        return { valid: false, error: "No Special Characters!" };
    return { valid: true, error: "" };
};

const validateEmail = (email: string): ValidationResult => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (email.length === 0) return { valid: false, error: "Cannot be Empty!" };
    if (!emailRegex.test(email))
        return { valid: false, error: "Invalid Email Format!" };
    return { valid: true, error: "" };
};

const validateTel = (tel: string): ValidationResult => {
    if (tel.length > 0) {
        // Let through empty tel nums
        if (!/^[0-9 ]+$/.test(tel))
            return { valid: false, error: "Only Numbers and Spaces Allowed!" };
        if (tel.length < 10) return { valid: false, error: "Too Short!" };
        if (tel.length > 16) return { valid: false, error: "Too Long!" };
    }
    return { valid: true, error: "" };
};

const validateMessage = (message: string): ValidationResult => {
    const allowedCharactersRegex = /^[a-zA-Z0-9,.!?()\[\]:;@'"-\s]*$/;
    if (message.length === 0)
        return { valid: false, error: "Cannot be Empty!" };
    if (message.length < 10)
        return { valid: false, error: "Min 10 Characters!" };
    if (message.length > MAX_MESSAGE_CHARACTERS)
        return { valid: false, error: "Too Long!" };
    if (!allowedCharactersRegex.test(message))
        return { valid: false, error: "Illegal Characters in Text!" };
    return { valid: true, error: "" };
};

const Contact = ({
    pageName,
    mobileMenuVisible,
    setMobileMenuVisible,
    themeMode,
    setThemeMode,
    subMenuVisible,
    setSubMenuVisible,
}: Props) => {
    const nameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const telRef = useRef<HTMLInputElement>(null);
    const messageRef = useRef<HTMLTextAreaElement>(null);
    const charCounterRef = useRef<HTMLSpanElement>(null);

    const [nameError, setNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [telError, setTelError] = useState("");
    const [messageError, setMessageError] = useState("");
    const [charatersLeft, setCharactersLeft] = useState(MAX_MESSAGE_CHARACTERS);

    const countCharacters = () => {
        const message = messageRef.current?.value ?? "";
        const left = MAX_MESSAGE_CHARACTERS - message.length;
        setCharactersLeft(left);
    };

    const handleSubmit = () => {
        const name = nameRef.current?.value ?? "";
        const email = emailRef.current?.value ?? "";
        const tel = telRef.current?.value ?? "";
        const message = messageRef.current?.value ?? "";

        // Validate
        setNameError(validateName(name).error);
        setEmailError(validateEmail(email).error);
        setTelError(validateTel(tel).error);
        setMessageError(validateMessage(message).error);

        // Submit Form
    };

    const mail = "tibi.aki.tivadar@gmail.com";
    const tel = "+44 7474 999 334";
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
                <h1>Get in Touch!</h1>
                <section>
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
                                {tel}
                            </a>
                        </li>
                    </ul>
                    <form>
                        <fieldset>
                            <input
                                id="name"
                                type="text"
                                placeholder="Full Name *"
                                ref={nameRef}
                                onBlur={() =>
                                    setNameError(
                                        validateName(
                                            nameRef.current?.value || ""
                                        ).error
                                    )
                                }
                            />
                        </fieldset>
                        {nameError && (
                            <span
                                className="error-message"
                                id="error-message--name"
                            >
                                {nameError}
                            </span>
                        )}
                        <fieldset>
                            <input
                                id="email"
                                type="text"
                                placeholder="Email Address *"
                                ref={emailRef}
                                onBlur={() =>
                                    setEmailError(
                                        validateEmail(
                                            emailRef.current?.value || ""
                                        ).error
                                    )
                                }
                            />
                        </fieldset>
                        {emailError && (
                            <span
                                className="error-message"
                                id="error-message--email"
                            >
                                {emailError}
                            </span>
                        )}
                        <fieldset>
                            <input
                                id="phone"
                                type="text"
                                placeholder="Phone"
                                ref={telRef}
                                onBlur={() =>
                                    setTelError(
                                        validateTel(telRef.current?.value || "")
                                            .error
                                    )
                                }
                            />
                        </fieldset>
                        {telError && (
                            <span
                                className="error-message"
                                id="error-message--tel"
                            >
                                {telError}
                            </span>
                        )}
                        <fieldset>
                            <textarea
                                id="name"
                                placeholder="Your Message *"
                                ref={messageRef}
                                maxLength={MAX_MESSAGE_CHARACTERS}
                                onChange={countCharacters}
                                onBlur={() =>
                                    setMessageError(
                                        validateMessage(
                                            messageRef.current?.value || ""
                                        ).error
                                    )
                                }
                            />
                        </fieldset>
                        <span
                            className="character-counter"
                            ref={charCounterRef}
                        >
                            {charatersLeft} Characters Left
                        </span>
                        {messageError && (
                            <span
                                className="error-message"
                                id="error-message--message"
                            >
                                {messageError}
                            </span>
                        )}
                        <button
                            className="submit-message"
                            type="button"
                            onClick={() => handleSubmit()}
                        >
                            Send Your Message
                        </button>
                    </form>
                </section>
            </main>
            <Footer pageName={pageName} />
        </>
    );
};

export default Contact;
