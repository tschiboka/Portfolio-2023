import headshot from "../../assets/headshot_placeholder.jpg";
import "./Welcome.scss";

const Welcome = () => {
    return (
        <div className="Welcome">
            <img src={headshot} />
            <p>
                Hello there! I'm pleased that you've found your way here.
                Whether you share my passion for coding and design or need a
                supporting hand with web development, you've come to the right
                place.
            </p>
            <p>
                I'm a dedicated web developer with a deep love for crafting
                beautiful and functional websites and web applications. I strive
                to create impressive digital experiences that leave an impact
                and projects I'm proud of.
            </p>
        </div>
    );
};

export default Welcome;
