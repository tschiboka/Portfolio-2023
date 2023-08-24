import { useAppContext } from "../../../context/AppContext";
import { TbZoomInFilled, TbZoomOutFilled } from "react-icons/tb";
import "./Figure.scss";
import ZoomedImage from "../ZoomedImage/ZoomedImage";

interface Props {
    image: string;
    className: string;
    alt: string;
    caption?: string;
    zoomAllowed?: boolean;
}

const Figure = ({
    image,
    className,
    alt,
    caption,
    zoomAllowed = true,
}: Props) => {
    const {
        setOverlayVisible,
        setOverlayContent,
        setMainMenuVisible,
        setSubMenuVisible,
    } = useAppContext();
    const displayZoomOverlay = () => {
        setOverlayVisible(true);
        setMainMenuVisible(false);
        setSubMenuVisible(false);

        const content: React.ReactNode = (
            <ZoomedImage>
                <img src={image} alt={alt} />
                <TbZoomOutFilled
                    className="Figure__icon Figure__icon--close"
                    onClick={() => {
                        setOverlayContent(null);
                        setOverlayVisible(false);
                        setMainMenuVisible(true);
                        setSubMenuVisible(true);
                    }}
                />
            </ZoomedImage>
        );

        setOverlayContent(content);
    };

    return (
        <figure className="Figure" onClick={() => displayZoomOverlay()}>
            <div className={className}>
                {zoomAllowed && <TbZoomInFilled className="Figure__icon" />}
                <img src={image} alt={alt} />
            </div>
            {caption && <figcaption>{caption}</figcaption>}
            <div className=""></div>
        </figure>
    );
};

export default Figure;
