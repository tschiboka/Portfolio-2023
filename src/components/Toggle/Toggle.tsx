import { ReactNode } from "react";
import "./Toggle.scss";

interface Props {
    children: ReactNode;
}

const Toggle = ({ children }: Props) => {
    return (
        <div className="Toggle">
            <button className="Toggle__thumb"></button>
            {children}
        </div>
    );
};

export default Toggle;
