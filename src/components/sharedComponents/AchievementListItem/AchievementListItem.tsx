import { Achievement } from './Achievements'
import { TbCertificate, TbZoomOutFilled } from 'react-icons/tb'
import { useAppContext } from '../../../context/AppContext/App.context'
import './AchievementListItem.scss'
import ZoomedImage from '../ZoomedImage/ZoomedImage'

interface Props {
    achievement: Achievement
}

const AchievementListItem = ({ achievement }: Props) => {
    const {
        setOverlayVisible,
        setOverlayContent,
        setMainMenuVisible,
        setSubMenuVisible,
    } = useAppContext()

    const displayZoomOverlay = (image?: string) => {
        if (!image) return

        const closeZoom = () => {
            setOverlayContent(null)
            setOverlayVisible(false)
            setMainMenuVisible(true)
            setSubMenuVisible(true)
        }

        setOverlayVisible(true)
        setMainMenuVisible(false)
        setSubMenuVisible(false)

        const content: React.ReactNode = (
            <ZoomedImage handleClick={closeZoom} handleEscKeyPress={closeZoom}>
                <img src={image} alt="Certificate" />
                <TbZoomOutFilled className="Figure__icon Figure__icon--close" />
            </ZoomedImage>
        )

        setOverlayContent(content)
    }
    return (
        <li
            className="AchievementListItem"
            onClick={() => {
                displayZoomOverlay(achievement?.certificate_img)
            }}
        >
            <img src={achievement.image} alt={achievement.image_alt} />

            <span>
                <span className="AchievementListItem__title">
                    {achievement.title},{' '}
                </span>
                {achievement.details?.map((detail) => (
                    <span key={detail} className="AchievementListItem__detail">
                        {detail},{' '}
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
    )
}

export default AchievementListItem
