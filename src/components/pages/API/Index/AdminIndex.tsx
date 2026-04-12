import { useNavigate } from 'react-router-dom'

export const AdminIndex = () => {
    const navigate = useNavigate()
    const handleLevelCreatorClick = () => {
        navigate('/projects/wda-level-creator')
    }
    const handleUxStoriesClick = () => {
        navigate('/api/ux-stories')
    }

    return (
        <>
            <p>Welocome to admin section</p>
            <button onClick={handleLevelCreatorClick}>Word Duel Arena Level Creator</button>
            <button onClick={handleUxStoriesClick}>UX Stories</button>
        </>
    )
}
