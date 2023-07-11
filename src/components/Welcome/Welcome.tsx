import headshot from "../../assets/images/headshot_placeholder.png";
import "./Welcome.scss";

interface Props {
    subMenuVisible: boolean;
}

const Welcome = ({ subMenuVisible }: Props) => {
    return (
        <div className={"Welcome" + (!subMenuVisible ? " extended" : "")}>
            <img src={headshot} />
            <h1>
                <strong>Tivadar Debnar</strong> | Web Developer
            </h1>
        </div>
    );
};

export default Welcome;
