import { ReactNode, useEffect, useRef } from "react";
import "./ZoomedImage.scss";

interface Props {
    children: ReactNode;
    handleClick: () => void;
    handleEscKeyPress: () => void;
}

const ZoomedImage = ({ children, handleClick, handleEscKeyPress }: Props) => {
    const ref = useRef<HTMLDivElement>(null);
    const escHandler = (event: KeyboardEvent) => {
        if (event.key === "Escape") handleEscKeyPress();
    };

    useEffect(() => {
        window.addEventListener("keydown", escHandler);
        return () => window.removeEventListener("keydown", escHandler);
    }, []);

    return (
        <div className="ZoomedImage" onClick={handleClick} ref={ref}>
            {children}
        </div>
    );
};

export default ZoomedImage;
