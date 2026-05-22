import { FaFacebookF } from 'react-icons/fa'
import { TbBrandGithubFilled } from 'react-icons/tb'
import { TfiLinkedin } from 'react-icons/tfi'
import { Link } from '@common/ux'

export const SocialLinks = () => (
    <>
        <Link href="https://www.facebook.com/tschiboka/">
            <FaFacebookF title="Facebook Link" />
        </Link>
        <Link href="https://github.com/tschiboka">
            <TbBrandGithubFilled title="Github Link" />
        </Link>
        <Link href="https://www.linkedin.com/in/tivadar-debnar/">
            <TfiLinkedin title="LinkedIn Link" />
        </Link>
    </>
)

export const SubNavTitle = () => (
    <>
        <span>Tivadar&nbsp;</span>
        <span>Debnar</span>
    </>
)
