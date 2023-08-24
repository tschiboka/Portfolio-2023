import { ReactNode } from "react";
import "./ZoomedImage.scss";

interface Props {
    children: ReactNode;
}

const ZoomedImage = ({ children }: Props) => {
    return <div className="ZoomedImage">{children}</div>;
};

export default ZoomedImage;
