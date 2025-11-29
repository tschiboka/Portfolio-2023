import { useNavigate } from 'react-router-dom'

export const GuestIndex = () => {
    const navigate = useNavigate()
    const handleXmasClick = () => {
        navigate('/projects/xmas2025')
    }

    return (
        <>
            <p>Press the Xmas button to send Xmas greetings!</p>
            <button className="button" onClick={handleXmasClick}>
                Xmas
            </button>
        </>
    )
}
