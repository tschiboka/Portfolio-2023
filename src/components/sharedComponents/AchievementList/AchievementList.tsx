import AchievementListItem from "../AchievementListItem/AchievementListItem";
import Achievement from "../AchievementListItem/Achievements";
import "./AchievementList.scss";

interface Props {
    achievements: Achievement[];
}

const AchievementList = ({ achievements }: Props) => {
    return (
        <ul className="AchievementList">
            {achievements.map((achievement) => (
                <AchievementListItem
                    key={achievement.title}
                    achievement={achievement}
                />
            ))}
        </ul>
    );
};

export default AchievementList;
