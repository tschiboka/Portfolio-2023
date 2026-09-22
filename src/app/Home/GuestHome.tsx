import { useNavigate } from 'react-router-dom'
import XmasTree from '@projects/assets/xmas/xmas_tree.png'
import './Home.styles.scss'
import { Button, Heading, Paragraph } from '@common-ux'

export const GuestHome = () => {
    const navigate = useNavigate()
    const handleXmasClick = () => {
        navigate('/projects/xmas2025')
    }

    return (
        <div className="GuestHome">
            <Heading as="h2">Welcome, friends!</Heading>
            <div className="Xmass-welcome">
                <div className="Xmass-welcome-text">
                    <Paragraph>
                        I've opened this little corner of my portfolio so you can play around with
                        my Christmas project — an Arduino-powered nativity scene you can send
                        messages to, plus remote-controlled Advent candles you can switch on and off
                        from here. Only the home and Xmas pages are accessible for guest accounts,
                        but feel free to send a festive message to the setup.
                    </Paragraph>
                    <Paragraph>Enjoy, and have a wonderful Christmas season! Ho-ho-hooo.</Paragraph>
                </div>
                <div className="Xmass-welcome-image">
                    <img src={XmasTree} alt="Xmas Tree" style={{ width: '100%' }} />
                </div>
            </div>
            <Button className="button" onClick={handleXmasClick}>
                Xmas Corner
            </Button>
            <div className="Padding-Test">
                <span>padded child</span>
            </div>
        </div>
    )
}
