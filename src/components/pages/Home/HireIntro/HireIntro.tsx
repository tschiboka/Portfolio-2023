import {
    SiHtml5,
    SiCss3,
    SiMongodb,
    SiAdobephotoshop,
    SiAdobeillustrator,
    SiJavascript,
    SiTypescript,
    SiCsharp,
    SiPython,
} from 'react-icons/si'
import { BiMessageDots, BiLogoSass } from 'react-icons/bi'
import { FaNodeJs } from 'react-icons/fa'
import { FiDownload } from 'react-icons/fi'
import { TbBrandReactNative } from 'react-icons/tb'
import { RiReactjsLine } from 'react-icons/ri'
import ProgressBar from '../../../sharedComponents/ProgressBar/ProgressBar'
import { getColourName } from '../../Projects/getProjects'
import { Link } from 'react-router-dom'
import cv from '../../../../assets/files/Tivadar_Debnar_CV_2023.pdf'
import './HireIntro.scss'

const HireIntro = () => {
    return (
        <>
            <p className="delay-0 anim-fade-from-left">
                I appreciate your interest. Let me provide you with a brief
                overview of myself as a developer. I am passionate about web
                development and enjoy transforming ideas into reality. For me,
                coding is not just a job but a creative instrument where I can
                continually improve and challenge myself.
            </p>
            <h2>I'm all about Web</h2>
            <p className="delay-2 anim-fade-from-right">
                Although I self-studied web development for many years prior, I
                have recently completed my formal studies, graduating from
                Falmouth University in Computing (First Class Honours). During
                my academic journey, I consolidated my programming concepts and
                gained hands-on experience in various technologies and
                languages, such as Python or C#.
            </p>
            <p className="delay-3 anim-fade-from-left">
                However, my passion lies in web development. I have been
                creating projects in JavaScript and MERN (Mongo, Express, React,
                NodeJs) since 2017, and I continued to work on my side projects
                even during my years in college and university.
            </p>
            <h2>Skills</h2>
            <h3 className="skill-header">Frontend</h3>
            <section className="skills">
                <ProgressBar
                    percentage={75}
                    title="HTML5"
                    icon={<SiHtml5 />}
                    color={getColourName('html')}
                />
                <ProgressBar
                    percentage={78}
                    title="CSS"
                    icon={<SiCss3 />}
                    color={getColourName('css')}
                />
                <ProgressBar
                    percentage={85}
                    title="JS"
                    icon={<SiJavascript />}
                    color={getColourName('javascript')}
                />
                <ProgressBar
                    percentage={30}
                    title="Sass"
                    icon={<BiLogoSass />}
                    color={getColourName('sass')}
                />
                <ProgressBar
                    percentage={60}
                    title="React"
                    icon={<RiReactjsLine />}
                    color={getColourName('react')}
                />
                <ProgressBar
                    percentage={55}
                    title="TS"
                    icon={<SiTypescript />}
                    color={getColourName('typescript')}
                />
            </section>

            <h3 className="skill-header">Backend</h3>
            <section className="skills">
                <ProgressBar
                    percentage={60}
                    title="NodeJs"
                    icon={<FaNodeJs />}
                    color={getColourName('nodejs')}
                />
                <ProgressBar
                    percentage={35}
                    title="C#"
                    icon={<SiCsharp />}
                    color={getColourName('C#')}
                />
                <ProgressBar
                    percentage={25}
                    title="Python"
                    icon={<SiPython />}
                    color={getColourName('python')}
                />
            </section>
            <h3 className="skill-header">Database</h3>
            <section className="skills">
                <ProgressBar
                    percentage={55}
                    title="MongoDB"
                    icon={<SiMongodb />}
                    color={getColourName('mongodb')}
                />
                <ProgressBar
                    percentage={15}
                    title="MySQL"
                    icon={<SiMongodb />}
                    color={getColourName('mysql')}
                />
            </section>
            <h3 className="skill-header">Mobile</h3>
            <section className="skills">
                <ProgressBar
                    percentage={45}
                    title="Native"
                    icon={<TbBrandReactNative />}
                    color={getColourName('react native')}
                />
            </section>
            <h3 className="skill-header">Testing</h3>
            <section className="skills">
                <ProgressBar
                    percentage={30}
                    title="Jest"
                    icon={<TbBrandReactNative />}
                    color={getColourName('jest')}
                />
                <ProgressBar
                    percentage={25}
                    title="RTL"
                    icon={<TbBrandReactNative />}
                    color={getColourName('RTL')}
                />
            </section>
            <h3 className="skill-header">Design</h3>
            <section className="skills">
                <ProgressBar
                    percentage={35}
                    title="PhotoShop"
                    icon={<SiAdobephotoshop />}
                    color={getColourName('photoshop')}
                />
                <ProgressBar
                    percentage={30}
                    title="Illustrator"
                    icon={<SiAdobeillustrator />}
                    color={getColourName('illustrator')}
                />
            </section>
            <h2>I continuously learn new things</h2>
            <p>
                I am taking courses to further improve my skills in React-18,
                TypeScript and SaSS, and I also plan to continue my learning
                journey with Redux and Test-Driven Development in Jest.
            </p>
            <hr />
            <p className="delay-2 anim-fade-from-right">
                I am excited to apply my skills and contribute to a dynamic
                development team. If my profile aligns with your requirements
                and you feel I would be a good fit for your team, I would be
                thrilled to discuss further details. Please don't hesitate to
                contact me.
            </p>
            <div className="button-wrapper">
                <Link className="link" to="/contact">
                    Contact Tivadar <BiMessageDots />
                </Link>
                <a className="link" href={cv} download>
                    Download my CV <FiDownload />
                </a>
            </div>
        </>
    )
}

export default HireIntro
