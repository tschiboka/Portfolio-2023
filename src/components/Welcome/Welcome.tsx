import headshot from "../../assets/images/headshot_placeholder.png";
import { FaFacebookF } from "react-icons/fa";
import { TbBrandGithubFilled } from "react-icons/tb";
import { TfiLinkedin } from "react-icons/tfi";
import "./Welcome.scss";

const Welcome = () => {
    return (
        <div className="Welcome">
            <img src={headshot} />
            <h1>
                <strong>Tivadar Debnar</strong> | Web Developer
            </h1>
            <div className="welcome-links">
                <FaFacebookF />
                <TbBrandGithubFilled />
                <TfiLinkedin />
            </div>
        </div>
    );
};

export default Welcome;
