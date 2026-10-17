import { MdEmail } from 'react-icons/md'
import { BsTwitter } from 'react-icons/bs'
import { IoLogoWhatsapp } from 'react-icons/io'
import { ImLinkedin, ImFacebook2 } from 'react-icons/im'
import {
    EmailShareButton,
    FacebookShareButton,
    LinkedinShareButton,
    TwitterShareButton,
    WhatsappShareButton,
} from 'react-share'
import './ShareMenu.scss'

interface Props {
    path: string
}

export const ShareMenu = ({ path }: Props) => {
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
