import headshot from "../../assets/images/headshot_placeholder.png";
import "./Welcome.scss";

const Welcome = () => {
    return (
        <div className="Welcome">
            <img src={headshot} />
            <h1>
                <strong>Tivadar Debnar</strong> | Web Developer
            </h1>
        </div>
    );
};

export default Welcome;
