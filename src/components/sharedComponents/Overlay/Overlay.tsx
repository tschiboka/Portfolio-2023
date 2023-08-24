import "./Overlay.scss";
import { useAppContext } from "../../../context/AppContext";

const Overlay = () => {
    const { overlayVisible, overlayContent } = useAppContext();

    if (overlayVisible) return <div className="Overlay">{overlayContent}</div>;
};

export default Overlay;
