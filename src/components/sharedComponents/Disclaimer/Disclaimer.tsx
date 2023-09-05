import "./Disclaimer.scss";
import faceImg from "../../../assets/images/headshot_placeholder.png";
import { Link } from "react-router-dom";

const Disclaimer = () => {
    return (
        <div className="Disclaimer">
            <img src={faceImg} alt="Profile Photo" />
            <p>
                I welcome constructive suggestions. If you spot any errors or
                have ideas to improve this content, I'd love to hear from you.
                Feel free to reach out!
                <br />
                Thank you, and happy coding!
            </p>
            <Link to="/contact" className="contact-link">
                Contact Tivadar
            </Link>
        </div>
    );
};

export default Disclaimer;
