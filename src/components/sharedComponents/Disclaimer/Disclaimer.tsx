import './Disclaimer.scss'
import faceImg from '../../../assets/images/headshot_placeholder.png'
import { Button, Link, Paragraph, Section } from '@common/ux'

const Disclaimer = () => {
    return (
        <Section className="Disclaimer">
            <img src={faceImg} alt="Profile Photo" />
            <Paragraph>
                I welcome constructive suggestions. If you spot any errors or have ideas to improve
                this content, I'd love to hear from you. Feel free to reach out!
                <br />
                Thank you, and happy coding!
            </Paragraph>
            <Button as={Link} to="/contact" className="contact-link">
                Contact Tivadar
            </Button>
        </Section>
    )
}

export default Disclaimer
