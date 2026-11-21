/* eslint-disable standards/matching-spec -- TODO [0011] check the convention */
import { List } from '@common-ux/Typography/List'
import { AchievementListItem } from '../AchievementListItem'
import type { Achievement } from '../AchievementListItem'
import './AchievementList.scss'

type AchievementListProps = {
    achievements: Achievement[]
}

export const AchievementList = ({ achievements }: AchievementListProps) => (
    <List
        className="AchievementList"
        items={achievements.map((achievement) => ({
            key: achievement.title,
            content: <AchievementListItem achievement={achievement} />,
        }))}
    />
)
