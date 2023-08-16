import riffmasterHardwareImg from "../../assets/images/blog/riffmasterHardware.png";
import "./BlogCard.scss";

const BlogCard = () => {
    return (
        <article className="BlogCard">
            <div className="BlogCard__img-wrapper">
                <span className="badge yellow">JavaScript</span>
                <img src={riffmasterHardwareImg} alt="guitar" />
            </div>
            <div className="BlogCard__text-wrapper">
                <header className="BlogCard__title">
                    Digital Guitar - Hardware
                </header>

                <p className="BlogCard__abstract">
                    Let's create a guitar console with Arduino that sends data
                    through a USB cable using a keyboard library to build a
                    guitar web application. Discover matrix wiring and keyboard
                    debounce handling.
                </p>
            </div>
        </article>
    );
};

export default BlogCard;
