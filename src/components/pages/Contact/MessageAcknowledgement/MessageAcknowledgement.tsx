import './MessageAcknowledgement.scss'
import thumbsupImg from '../../../../assets/images/thumbs_up.png'
import { Link } from 'react-router-dom'

const MessageAcknowledgement = () => {
    return (
        <div className="MessageAcknowledgement">
            <img src={thumbsupImg} alt="Thumbs Up" />
            <h1>Thank You for Your Message!</h1>
            <p>
                I truly appreciate you taking the time to get in touch, I'm
                excited to hear about your inquiry. Rest assured that I'll get
                back to you as soon as possible. In the meantime, feel free to
                explore more about me and my work on my website.
                <br />
                <br />
                If you have any urgent matters, don't hesitate to contact me
                through the provided email or phone number. I look forward to
                connecting with you and discussing how I can be of assistance.
                <br />
                Best regards, Tivadar.
            </p>
            <Link className="link" to="/">
                Back to Home
            </Link>
        </div>
    )
}

export default MessageAcknowledgement
