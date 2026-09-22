import './MessageAcknowledgement.scss'
import thumbsupImg from '@portfolio/assets/messages/thumbs_up.png'
import { Heading, Link, Paragraph } from '@common-ux'

const MessageAcknowledgement = () => {
    return (
        <div className="MessageAcknowledgement">
            <img src={thumbsupImg} alt="Thumbs Up" />
            <Heading as="h1">Thank You for Your Message!</Heading>
            <Paragraph>
                I truly appreciate you taking the time to get in touch, I'm excited to hear about
                your inquiry. Rest assured that I'll get back to you as soon as possible. In the
                meantime, feel free to explore more about me and my work on my website.
                <br />
                <br />
                If you have any urgent matters, don't hesitate to contact me through the provided
                email or phone number. I look forward to connecting with you and discussing how I
                can be of assistance.
                <br />
                Best regards, Tivadar.
            </Paragraph>
            <Link to="/">Back to Home</Link>
        </div>
    )
}

export default MessageAcknowledgement
