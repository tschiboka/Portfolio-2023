import { Link } from 'react-router-dom'
import Breadcrumb from '../Breadcrumb/Breadcrumb'
import { FaFacebookF } from 'react-icons/fa'
import { TbBrandGithubFilled } from 'react-icons/tb'
import { TfiLinkedin } from 'react-icons/tfi'
import { MdCopyright } from 'react-icons/md'
import cv from '../../../assets/files/Tivadar_Debnar_CV_2023.pdf'
import logo from '../../../assets/images/icon-light.svg'
import './Footer.scss'
import { ReactNode } from 'react'

interface Props {
    pageName?: string
    path: string
    visitsPreLoaded?: boolean
    visitCount?: number
    info?: ReactNode
}

const Footer = ({
    pageName,
    path,
    visitsPreLoaded,
    visitCount,
    info,
}: Props) => {
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
            <Breadcrumb
                path={path}
                visitsPreLoaded={visitsPreLoaded}
                visitCount={visitCount}
            />
            <div className="social-links">
                <a href="https://www.facebook.com/tschiboka/">
                    <FaFacebookF title="Facebook Link" />
                </a>
                <a href="https://github.com/tschiboka">
                    <TbBrandGithubFilled title="Github Link" />
                </a>
                <a href="https://www.linkedin.com/in/tivadar-debnar/">
                    <TfiLinkedin title="LinkedIn Link" />
                </a>
            </div>
            <ul className="link-list">
                <li className={pageName === 'home' ? 'hide' : ''}>
                    <Link className="link" to="/" title="Home Page">
                        HOME
                    </Link>
                </li>
                <span
                    className={
                        'separator ' + (pageName === 'home' ? 'hide' : '')
                    }
                >
                    |
                </span>
                <li className={pageName === 'about' ? 'hide' : ''}>
                    <Link className="link" to="/about" title="About Page">
                        ABOUT
                    </Link>
                </li>
                <span
                    className={
                        'separator ' + (pageName === 'about' ? 'hide' : '')
                    }
                >
                    |
                </span>
                <li className={pageName === 'projects' ? 'hide' : ''}>
                    <Link className="link" to="/projects" title="Projects Page">
                        PROJECTS
                    </Link>
                </li>
                <span
                    className={
                        'separator ' + (pageName === 'projects' ? 'hide' : '')
                    }
                >
                    |
                </span>
                <li className={pageName === 'blog' ? 'hide' : ''}>
                    <Link className="link" to="/blog" title="Blog Page">
                        BLOG
                    </Link>
                </li>
                <span
                    className={
                        'separator ' + (pageName === 'blog' ? 'hide' : '')
                    }
                >
                    |
                </span>
                <li className={pageName === 'contact' ? 'hide' : ''}>
                    <Link className="link" to="/contact" title="Contact Me">
                        CONTACT ME
                    </Link>
                </li>
                <span
                    className={
                        'separator ' + (pageName === 'contact' ? 'hide' : '')
                    }
                >
                    |
                </span>
                <li>
                    <a title="Download CV" href={cv} download>
                        R&Egrave;SUM&Egrave;
                    </a>
                </li>
                <span className="separator">|</span>
                <li>
                    <Link to="/privacy-policy" title="Privacy Policy">
                        PRIVACY POLICY
                    </Link>
                </li>
            </ul>
            <div className="languages">
                <a className="active" title="English">
                    En
                </a>
                |<a title="Hungarian">Hu</a>|<a title="Italian">It</a>
            </div>

            <p className="copyright">
                <MdCopyright className="copyright__icon" />
                <time>
                    <a href="#/clock">{year}</a>
                </time>
                <span className="copyright__pipe">|</span>
                Tivadar Debnar. All rights reserved.{' '}
            </p>
            <div className="additional-info">{info}</div>
        </footer>
    )
}

export default Footer
