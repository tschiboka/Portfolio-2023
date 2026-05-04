import { FaFacebookF } from 'react-icons/fa'
import { TbBrandGithubFilled } from 'react-icons/tb'
import { TfiLinkedin } from 'react-icons/tfi'

export const SocialLinks = () => (
    <>
        <a href="https://www.facebook.com/tschiboka/">
            <FaFacebookF title="Facebook Link" />
        </a>
        <a href="https://github.com/tschiboka">
            <TbBrandGithubFilled title="Github Link" />
        </a>
        <a href="https://www.linkedin.com/in/tivadar-debnar/">
            <TfiLinkedin title="LinkedIn Link" />
        </a>
    </>
)

export const SubNavTitle = () => (
    <>
        <span>Tivadar&nbsp;</span>
        <span>Debnar</span>
    </>
)
