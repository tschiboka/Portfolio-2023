import { ReactNode } from "react";
import "./Toggle.scss";

interface Props {
    children: ReactNode;
    handleClick: () => void;
    active: boolean;
}

const Toggle = ({ children, handleClick, active }: Props) => {
    return (
        <div className="Toggle" onClick={handleClick}>
            {active ? (
                <>
                    <button className="Toggle__thumb"></button>
                    {children}
                </>
            ) : (
                <>
                    {children}
                    <button className="Toggle__thumb"></button>
                </>
            )}
        </div>
    );
};

export default Toggle;
