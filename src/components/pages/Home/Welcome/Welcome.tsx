import headshot from '../../../../assets/images/headshot_placeholder.png'
import { useAppContext } from '../../../../context/AppContext/App.context'
import './Welcome.scss'
import { useNavigate } from 'react-router-dom'

const Welcome = () => {
    const navigate = useNavigate()
    const { subMenuVisible } = useAppContext()

    return (
        <div className={'Welcome' + (!subMenuVisible ? ' extended' : '')}>
            <div className="headshot-wrapper">
                <img
                    className="headshot"
                    src={headshot}
                    alt="Headshot Image"
                    onClick={() => navigate('./api/login')}
                />
            </div>
            <h1>
                <strong>Tivadar Debnar</strong>
                <span>|</span>
                <span>Web Developer</span>
            </h1>
        </div>
    )
}

export default Welcome
