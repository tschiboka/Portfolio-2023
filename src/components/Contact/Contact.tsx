import Nav from "../Nav/Nav";
import Menu from "../Menu/Menu";
import SubNav from "../SubNav/SubNav";
import Footer from "../Footer/Footer";
import MessageAcknowledgement from "../MessageAcknowledgement/MessageAcknowledgement";
import { MdAlternateEmail } from "react-icons/md";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FiPhone } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import "./Contact.scss";
import { useAppContext } from "../../context/AppContext";
import Page from "../Page/Page";

interface Props {
    pageName: string;
    path: string;
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

const validatePhone = (tel: string): ValidationResult => {
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
    const allowedCharactersRegex = /^[a-zA-Z0-9,.!?()&£$*\\\[\]:;@'"-\s]*$/;
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

const Contact = ({ pageName, path }: Props) => {
    const { mobileMenuVisible, subMenuVisible } = useAppContext();
    const nameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const phoneRef = useRef<HTMLInputElement>(null);
    const messageRef = useRef<HTMLTextAreaElement>(null);
    const charCounterRef = useRef<HTMLSpanElement>(null);

    const [nameError, setNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [telError, setTelError] = useState("");
    const [messageError, setMessageError] = useState("");
    const [charatersLeft, setCharactersLeft] = useState(MAX_MESSAGE_CHARACTERS);
    const [submitDisabled, setSubmitDisabled] = useState(false);
    const [userMessage, setUserMessage] = useState("");
    const [showMessageAck, setShowMessageAck] = useState(false);

    const countCharacters = () => {
        const message = messageRef.current?.value ?? "";
        const left = MAX_MESSAGE_CHARACTERS - message.length;
        setCharactersLeft(left);
    };

    const handleSubmit = async () => {
        const name = nameRef.current?.value ?? "";
        const email = emailRef.current?.value ?? "";
        const phone = phoneRef.current?.value ?? "";
        const message = messageRef.current?.value ?? "";

        // Validate
        const nameValidation = validateName(name);
        const emailValidation = validateEmail(email);
        const phoneValidation = validatePhone(phone);
        const messageValidation = validateMessage(message);
        setNameError(nameValidation.error);
        setEmailError(emailValidation.error);
        setTelError(phoneValidation.error);
        setMessageError(messageValidation.error);

        const inputValid =
            nameValidation.valid &&
            emailValidation.valid &&
            phoneValidation.valid &&
            messageValidation.valid;

        if (inputValid) {
            // Disable Submit Button
            setSubmitDisabled(true);
            setUserMessage("Sending Message...");

            // Submit Form
            //const URLLocal = "http://localhost:5000/message";
            const URLLive = "https://drab-rose-wombat-shoe.cyclic.app/message";
            const URL = URLLive;
            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    email,
                    phone: phone.replace(/\D/g, ""),
                    message,
                }),
            };

            try {
                const response = await fetch(URL, options);
                const responseJSON = await response.json();
                console.log("RESPONSE", responseJSON);
                if (responseJSON.success) {
                    setUserMessage("Message Sent!");
                    setShowMessageAck(true);
                } else setUserMessage("Error While Sending Message! ");
            } catch (err) {
                setUserMessage("Error While Sending Message!");
            } finally {
                setSubmitDisabled(false);
            }
        }
    };

    const mail = "Dev@Tschiboka.Co.Uk";
    const tel = "+44 7474 999 334";
    return (
        <Page title={"Tivadar Debnar | Contact"} path={path}>
            <Nav pageName={pageName} />
            {mobileMenuVisible && <Menu pageName="contact" />}
            {subMenuVisible && <SubNav />}

            {showMessageAck && <MessageAcknowledgement />}

            <main className="contact">
                <h1>Get in Touch!</h1>
                <section>
                    <ul className="contacts">
                        <li>
                            <MdAlternateEmail className="icon" />
                            <Link className="link" to={`mailto:${mail}`}>
                                {mail}
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
                                ref={phoneRef}
                                onBlur={() =>
                                    setTelError(
                                        validatePhone(
                                            phoneRef.current?.value || ""
                                        ).error
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
                        {submitDisabled && (
                            <AiOutlineLoading3Quarters className="loading-indicator" />
                        )}
                        {userMessage && (
                            <span className="user-message">{userMessage}</span>
                        )}
                        <button
                            className="submit-message"
                            type="button"
                            disabled={submitDisabled}
                            onClick={() => handleSubmit()}
                        >
                            Send Your Message
                        </button>
                    </form>
                </section>
            </main>
            <Footer pageName={pageName} path={path} />
        </Page>
    );
};

export default Contact;
