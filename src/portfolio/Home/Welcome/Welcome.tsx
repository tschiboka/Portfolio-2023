import headshot from '@portfolio/assets/home/headshot_placeholder.png'
import { AppHooks } from '@shared-context'
import { useNavigate } from 'react-router-dom'
import './Welcome.scss'
import { Heading } from '@common-ux'

const Welcome = () => {
    const navigate = useNavigate()
    const { subMenuVisible } = AppHooks.useContext()

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
            <Heading as="h1">
                <strong>Tivadar Debnar</strong>
                <span>|</span>
                <span>Web Developer</span>
            </Heading>
        </div>
    )
}

export default Welcome
