import { useNavigate } from 'react-router-dom'
import XmasTree from '../../../../assets/images/projects/xmas/xmas_tree.png'
import './Index.styles.scss'

export const GuestIndex = () => {
    const navigate = useNavigate()
    const handleXmasClick = () => {
        navigate('/projects/xmas2025')
    }

    return (
        <div className="GuestIndex">
            <h2>Welcome, friends!</h2>
            <div className="Xmass-welcome">
                <div className="Xmass-welcome-text">
                    <p>
                        I've opened this little corner of my portfolio so you
                        can play around with my Christmas project — an
                        Arduino-powered nativity scene you can send messages to,
                        plus remote-controlled Advent candles you can switch on
                        and off from here. Only the home and Xmas pages are
                        accessible for guest accounts, but feel free to send a
                        festive message to the setup.
                    </p>
                    <p>
                        Enjoy, and have a wonderful Christmas season!
                        Ho-ho-hooo.
                    </p>
                </div>
                <div className="Xmass-welcome-image">
                    <img
                        src={XmasTree}
                        alt="Xmas Tree"
                        style={{ width: '100%' }}
                    />
                </div>
            </div>
            <button className="button" onClick={handleXmasClick}>
                Xmas Corner
            </button>
        </div>
    )
}
