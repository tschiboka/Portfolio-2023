import AchievementList from '../../sharedComponents/AchievementList/AchievementList'
import {
    academicAchievements,
    certificateAchievements,
} from '../../sharedComponents/AchievementListItem/Achievements'
import guitarImage from '../../../assets/images/about/RiffMaster.png'
import guitarAppImage from '../../../assets/images/about/RiffMaster_App.png'
import guitarAppImageSm from '../../../assets/images/about/RiffMaster_App_Mobile.png'
import { Link } from 'react-router-dom'
import { Screen } from '../../sharedComponents/Screen/Screen'
import { PageSideMenu } from '../../sharedComponents/PageSideMenu/PageSideMenu'
import './About.scss'

interface Props {
    pageName: string
    path: string
}

const About = ({ pageName }: Props) => {
    return (
        <Screen
            title="Tivadar Debnar | About"
            path="/about"
            variant="portfolio"
            pageName={pageName}
            sideMenu={<PageSideMenu />}
        >
            <main>
                <h1>About Tivadar</h1>
                <h2>The beginnings</h2>
                <p>
                    I often have nostalgic memories about the first time I immersed myself in a
                    Pascal programming book as a child and began tinkering with my computer, a Z80
                    Enterprise. My enthusiasm didn't wane regardless that most available books were
                    English in the late 90s, and I was a Hungarian 13-year-old with a minimal
                    English vocabulary. So equipped with a dictionary, I started deciphering my
                    textbooks and creating my first text-based games. The early exposure to
                    programming proved to be a perfect inspiration, fueling my love for languages of
                    all kinds, whether spoken by humans or written in code.
                </p>
                <h2>Self Study</h2>
                <p>
                    Curiosity and a fascination with coding have been constant companions throughout
                    my adult life, leading me to explore browser-based technologies such as
                    JavaScript, CSS, and HTML long before entering the industry professionally. I
                    spent years building personal projects, taking online courses, attending
                    meetups, and coding daily in my spare time. Over time, what began as self-study
                    evolved into a serious commitment to software engineering and ultimately
                    motivated me to pursue it as a professional career.
                </p>
                <h2>College</h2>
                <p>
                    To make my commitment official, in 2020, I enrolled in Icon College of
                    Technology and Management to complete my Higher National Diploma (HND) in
                    Computing, where I studied subjects such as Algorithms and Data Structures,
                    Databases, Web Development, Project Management, and Security. The knowledge
                    gained through years of self-guided study proved invaluable throughout the
                    course and contributed towards graduating with distinction before progressing to
                    a bachelor's degree.
                </p>
                <h2>Uni</h2>
                <p>
                    During my time at Falmouth University, I focused on software engineering
                    disciplines including Mobile Development (React Native), Artificial
                    Intelligence, Big Data, IoT, and several other exciting areas of computing.
                    Alongside my studies, I dedicated a significant amount of time to my
                    dissertation project: a browser-based digital guitar console and music studio
                    application. The project combined hardware engineering, microcontroller
                    programming, manufacturing, and extensive use of JavaScript and Node.js for its
                    frontend and backend systems. After nearly 800 hours of development, the final
                    project received a 90% mark and contributed towards my graduating with a First
                    Class honours degree.
                </p>
                <h2>Continued Professional Development</h2>
                <p>
                    After graduating from Falmouth University, I moved into professional software
                    engineering, where I have spent the last several years working primarily with
                    TypeScript, React, Jest, React Testing Library, and modern frontend tooling.
                    Working in production environments fundamentally changed how I think about
                    software engineering. Beyond building features, I became increasingly interested
                    in software architecture, maintainability, testing systems, developer
                    experience, and the long-term scalability of frontend applications.
                </p>
                <p>
                    Much of my recent work has focused on building robust TypeScript-heavy
                    applications, designing reusable testing abstractions, improving consistency
                    across large test suites, and contributing to engineering practices that reduce
                    long-term technical entropy within projects and teams.
                </p>
                <p>
                    I still approach software engineering with the same curiosity that first drew me
                    to programming as a child. I regularly continue my self-study in areas such as
                    system design, frontend architecture, CI/CD workflows, performance optimisation,
                    and engineering tooling, viewing continuous learning as a core part of the
                    profession rather than a separate activity.
                </p>
                <div className="image-container">
                    <figure>
                        <img
                            className="guitar-app--sm"
                            src={guitarAppImageSm}
                            alt="Guitar App Image"
                        />
                        <img className="guitar-app" src={guitarAppImage} alt="Guitar App Image" />
                        <figcaption>Guitar Music Studio App</figcaption>
                    </figure>
                    <figure>
                        <img className="guitar" src={guitarImage} alt="Guitar Image" />
                        <figcaption>Guitar Console Instrument</figcaption>
                    </figure>
                </div>
                <Link className="link--inline" to="/blog/riffmaster">
                    You can check out this guitar project in detail here.
                </Link>
                <h2>Continued Self Development</h2>
                <p>
                    I consider the completion of my bachelor's degree the beginning of my
                    self-development and an exciting phase of a life-long professional development
                    journey. I am now further expanding my skills by taking courses on TypeScript
                    and Jest and refreshing my knowledge in React and Sass to consolidate my
                    expertise in my current stack.
                </p>
                <h2>Academic Accomplishments</h2>
                <AchievementList achievements={academicAchievements} />
                <h2>Additional Training</h2>
                <AchievementList achievements={certificateAchievements} />
            </main>
        </Screen>
    )
}

export default About
