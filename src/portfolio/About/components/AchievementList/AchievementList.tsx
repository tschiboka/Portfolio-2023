import { List } from '@common-ux/Typography/List'
import AchievementListItem from '../AchievementListItem/AchievementListItem'
import type { Achievement } from '../AchievementListItem/Achievements.data'
import './AchievementList.scss'

interface Props {
    achievements: Achievement[]
}

const AchievementList = ({ achievements }: Props) => {
    return (
        <List
            className="AchievementList"
            items={achievements.map((achievement) => ({
                key: achievement.title,
                content: <AchievementListItem achievement={achievement} />,
            }))}
        />
    )
}

export default AchievementList
