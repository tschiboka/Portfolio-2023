import { Achievement } from "./Achievements";
import { TbCertificate } from "react-icons/tb";
import "./AchievementListItem.scss";

interface Props {
    achievement: Achievement;
}

const AchievementListItem = ({ achievement }: Props) => {
    return (
        <li className="AchievementListItem">
            <img src={achievement.image} alt={achievement.image_alt} />

            <span>
                <span className="AchievementListItem__title">
                    {achievement.title},{" "}
                </span>
                {achievement.details?.map((detail) => (
                    <span key={detail} className="AchievementListItem__detail">
                        {detail},{" "}
                    </span>
                ))}
                <span className="AchievementListItem__year">
                    {achievement.year}
                </span>
            </span>
            {achievement.certificate_img && (
                <>
                    <span className="AchievementListItem__view">
                        <TbCertificate className="AchievementListItem__view-icon" />
                    </span>
                    <span className="AchievementListItem__hover-text">
                        View Certificate
                    </span>
                </>
            )}
        </li>
    );
};

export default AchievementListItem;
