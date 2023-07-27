import { ReactNode } from "react";
import "./ProgressBar.scss";

interface Props {
    title: string;
    percentage: number;
    icon: ReactNode;
    color: string;
}

const ProgressBar = ({ title, percentage, icon, color }: Props) => {
    return (
        <div className="ProgressBar">
            <div className="ProgressBar__title-wrapper">
                {icon && <div className="ProgressBar__icon">{icon}</div>}
                <h3 className="ProgressBar__title">{title}</h3>
            </div>
            <div className="ProgressBar__inner">
                <div className="ProgressBar__track">
                    <div
                        className="ProgressBar__thumb"
                        style={{
                            width: `${percentage}%`,
                            backgroundColor: `${color}`,
                        }}
                    ></div>
                </div>
            </div>
        </div>
    );
};

export default ProgressBar;
