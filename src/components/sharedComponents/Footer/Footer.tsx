import Breadcrumb from './Breadcrumb'
import { FaFacebookF } from 'react-icons/fa'
import { TbBrandGithubFilled } from 'react-icons/tb'
import { TfiLinkedin } from 'react-icons/tfi'
import { MdCopyright } from 'react-icons/md'
import { Link } from '@common/ux'
import logo from '../../../assets/images/icon-light.svg'
import './Footer.scss'
import { ReactNode } from 'react'

export interface FooterProps {
    path: string
    visitsPreLoaded?: boolean
    visitCount?: number
    info?: ReactNode
}

const Footer = ({ path, visitsPreLoaded, visitCount, info }: FooterProps) => {
    const date = new Date()
    const year = date.getFullYear()
    return (
        <footer className="Footer">
            <div className="logo-wrapper">
                <img src={logo} alt="Logo" />
            </div>
            <span className="name">
                <span>Tivadar&nbsp;</span>
                <span>Debnar</span>
            </span>
            <Breadcrumb path={path} visitsPreLoaded={visitsPreLoaded} visitCount={visitCount} />
            <div className="social-links">
                <Link href="https://www.facebook.com/tschiboka/">
                    <FaFacebookF title="Facebook Link" />
                </Link>
                <Link href="https://github.com/tschiboka">
                    <TbBrandGithubFilled title="Github Link" />
                </Link>
                <Link href="https://www.linkedin.com/in/tivadar-debnar/">
                    <TfiLinkedin title="LinkedIn Link" />
                </Link>
            </div>
            <p className="copyright">
                <MdCopyright className="copyright__icon" />
                <time>
                    <Link href="#/clock">{year}</Link>
                </time>
                <span className="copyright__pipe">|</span>
                Tivadar Debnar. All rights reserved.{' '}
            </p>
            <div className="additional-info">{info}</div>
        </footer>
    )
}

export default Footer
