import { Link } from 'react-router-dom'

export const AdminIndex = () => {
    return (
        <>
            <p>Welocome to admin section</p>
            <Link to="/projects/word-duel-arena" className="button">
                Play Word Duel Arena
            </Link>
        </>
    )
}
