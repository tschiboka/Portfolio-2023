import './ShareMenu.scss'
import { MdEmail } from 'react-icons/md'
import { BsTwitter } from 'react-icons/bs'
import { IoLogoWhatsapp } from 'react-icons/io'
import { ImLinkedin, ImFacebook2 } from 'react-icons/im'
import {
    EmailShareButton,
    FacebookShareButton,
    TwitterShareButton,
    WhatsappShareButton,
    LinkedinShareButton,
} from 'react-share'

interface Props {
    path: string
}

const ShareMenu = ({ path }: Props) => {
    const domain = 'https://tschiboka.com/#'

    return (
        <div className="ShareMenu">
            <EmailShareButton url={domain + path} className="ShareMenu__icon">
                <MdEmail />
            </EmailShareButton>
            <FacebookShareButton url={domain + path} className="ShareMenu__icon">
                <ImFacebook2 />
            </FacebookShareButton>
            <TwitterShareButton url={domain + path} className="ShareMenu__icon">
                <BsTwitter />
            </TwitterShareButton>
            <WhatsappShareButton url={domain + path} className="ShareMenu__icon">
                <IoLogoWhatsapp />
            </WhatsappShareButton>
            <LinkedinShareButton url={domain + path} className="ShareMenu__icon">
                <ImLinkedin />
            </LinkedinShareButton>
        </div>
    )
}

export default ShareMenu
