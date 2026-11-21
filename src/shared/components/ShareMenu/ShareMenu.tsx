/* eslint-disable standards/matching-spec -- TODO [0011] check the convention */
import { MdEmail } from 'react-icons/md'
import { BsTwitter } from 'react-icons/bs'
import { IoLogoWhatsapp } from 'react-icons/io'
import { ImLinkedin, ImFacebook2 } from 'react-icons/im'
import {
    EmailShareButton,
    FacebookShareButton,
    LinkedinShareButton,
    WhatsappShareButton,
    XShareButton,
} from 'react-share'
import './ShareMenu.scss'

type ShareMenuProps = {
    path: string
}

export const ShareMenu = ({ path }: ShareMenuProps) => {
    const domain = 'https://tschiboka.com/#'

    return (
        <div className="ShareMenu">
            <EmailShareButton url={domain + path} className="ShareMenu__icon">
                <MdEmail />
            </EmailShareButton>
            <FacebookShareButton url={domain + path} className="ShareMenu__icon">
                <ImFacebook2 />
            </FacebookShareButton>
            <XShareButton url={domain + path} className="ShareMenu__icon">
                <BsTwitter />
            </XShareButton>
            <WhatsappShareButton url={domain + path} className="ShareMenu__icon">
                <IoLogoWhatsapp />
            </WhatsappShareButton>
            <LinkedinShareButton url={domain + path} className="ShareMenu__icon">
                <ImLinkedin />
            </LinkedinShareButton>
        </div>
    )
}
