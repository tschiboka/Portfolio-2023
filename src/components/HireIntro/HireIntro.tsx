import {
    SiHtml5,
    SiCss3,
    SiReact,
    SiMongodb,
    SiAdobephotoshop,
    SiAdobeillustrator,
    SiJavascript,
} from "react-icons/si";
import { FaNodeJs } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";
import { BiMessageDots } from "react-icons/bi";
import ProgressBar from "../ProgressBar/ProgressBar";
import "./HireIntro.scss";

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
                Falmouth University in Computing (BSc Hons, first). During my
                academic journey, I consolidated my programming concepts and
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
            <section className="skills">
                <ProgressBar
                    percentage={75}
                    title="HTML5"
                    icon={<SiHtml5 />}
                    color="#E34F26"
                />
                <ProgressBar
                    percentage={70}
                    title="CSS"
                    icon={<SiCss3 />}
                    color="#1572B6"
                />
                <ProgressBar
                    percentage={85}
                    title="JS"
                    icon={<SiJavascript />}
                    color="#F7DF1E"
                />
                <ProgressBar
                    percentage={60}
                    title="React"
                    icon={<SiReact />}
                    color="#61DAFB"
                />
                <ProgressBar
                    percentage={50}
                    title="NodeJs"
                    icon={<FaNodeJs />}
                    color="#339933"
                />
                <ProgressBar
                    percentage={55}
                    title="MongoDB"
                    icon={<SiMongodb />}
                    color="#47A248"
                />
                <ProgressBar
                    percentage={40}
                    title="PhotoShop"
                    icon={<SiAdobephotoshop />}
                    color="#E31A8FF"
                />
                <ProgressBar
                    percentage={35}
                    title="Illustrator"
                    icon={<SiAdobeillustrator />}
                    color="#FF9A00"
                />
            </section>
            <h2>I continuously learn new things</h2>
            <p>
                I am taking courses to further improve my skills in React-18,
                TypeScript and SaSS, and I also plan to continue my learning
                journey with Test-Driven Development in Jest.
            </p>
            <p className="delay-2 anim-fade-from-right">
                I am excited to apply my skills and contribute to a dynamic
                development team. If my profile aligns with your requirements
                and you feel I would be a good fit for your team, I would be
                thrilled to discuss further details. Please don't hesitate to
                contact me.
            </p>
            <div className="button-wrapper">
                <button>
                    Contact Tivadar <BiMessageDots />
                </button>
                <button>
                    Download my CV <FiDownload />
                </button>
            </div>
        </>
    );
};

export default HireIntro;
