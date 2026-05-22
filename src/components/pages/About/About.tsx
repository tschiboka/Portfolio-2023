import AchievementList from '../../sharedComponents/AchievementList/AchievementList'
import {
    academicAchievements,
    certificateAchievements,
} from '../../sharedComponents/AchievementListItem/Achievements'
import guitarImage from '../../../assets/images/about/RiffMaster.png'
import guitarAppImage from '../../../assets/images/about/RiffMaster_App.png'
import guitarAppImageSm from '../../../assets/images/about/RiffMaster_App_Mobile.png'
import { Heading, Paragraph, Link, Main, Figure, Stack } from '@common/ux'
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
            <Main>
                <Heading as="h1" align="center">
                    About Tivadar
                </Heading>
                <Heading as="h2">The beginnings</Heading>
                <Paragraph>
                    I often have nostalgic memories about the first time I immersed myself in a
                    Pascal programming book as a child and began tinkering with my computer, a Z80
                    Enterprise. My enthusiasm didn't wane regardless that most available books were
                    English in the late 90s, and I was a Hungarian 13-year-old with a minimal
                    English vocabulary. So equipped with a dictionary, I started deciphering my
                    textbooks and creating my first text-based games. The early exposure to
                    programming proved to be a perfect inspiration, fueling my love for languages of
                    all kinds, whether spoken by humans or written in code.
                </Paragraph>
                <Heading as="h2">Self Study</Heading>
                <Paragraph>
                    Curiosity and a fascination with coding have been constant companions throughout
                    my adult life, leading me to explore browser-based technologies such as
                    JavaScript, CSS, and HTML long before entering the industry professionally. I
                    spent years building personal projects, taking online courses, attending
                    meetups, and coding daily in my spare time. Over time, what began as self-study
                    evolved into a serious commitment to software engineering and ultimately
                    motivated me to pursue it as a professional career.
                </Paragraph>
                <Heading as="h2">College</Heading>
                <Paragraph>
                    To make my commitment official, in 2020, I enrolled in Icon College of
                    Technology and Management to complete my Higher National Diploma (HND) in
                    Computing, where I studied subjects such as Algorithms and Data Structures,
                    Databases, Web Development, Project Management, and Security. The knowledge
                    gained through years of self-guided study proved invaluable throughout the
                    course and contributed towards graduating with distinction before progressing to
                    a bachelor's degree.
                </Paragraph>
                <Heading as="h2">Uni</Heading>
                <Paragraph>
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
                </Paragraph>
                <Heading as="h2">Continued Professional Development</Heading>
                <Paragraph>
                    After graduating from Falmouth University, I moved into professional software
                    engineering, where I have spent the last several years working primarily with
                    TypeScript, React, Jest, React Testing Library, and modern frontend tooling.
                    Working in production environments fundamentally changed how I think about
                    software engineering. Beyond building features, I became increasingly interested
                    in software architecture, maintainability, testing systems, developer
                    experience, and the long-term scalability of frontend applications.
                </Paragraph>
                <Paragraph>
                    Much of my recent work has focused on building robust TypeScript-heavy
                    applications, designing reusable testing abstractions, improving consistency
                    across large test suites, and contributing to engineering practices that reduce
                    long-term technical entropy within projects and teams.
                </Paragraph>
                <Paragraph>
                    I still approach software engineering with the same curiosity that first drew me
                    to programming as a child. I regularly continue my self-study in areas such as
                    system design, frontend architecture, CI/CD workflows, performance optimisation,
                    and engineering tooling, viewing continuous learning as a core part of the
                    profession rather than a separate activity.
                </Paragraph>
                <Stack align="center">
                    <Figure
                        src={guitarAppImageSm}
                        alt="Guitar App Image"
                        caption="Guitar Music Studio App"
                        sources={[{ src: guitarAppImage, minWidth: '992px' }]}
                        size="lg"
                    />
                    <Figure
                        src={guitarImage}
                        alt="Guitar Image"
                        caption="Guitar Console Instrument"
                        size="md"
                    />
                </Stack>
                <Link className="link--inline" to="/blog/riffmaster">
                    You can check out this guitar project in detail here.
                </Link>
                <Heading as="h2">Continued Self Development</Heading>
                <Paragraph>
                    I consider the completion of my bachelor's degree the beginning of my
                    self-development and an exciting phase of a life-long professional development
                    journey. I am now further expanding my skills by taking courses on TypeScript
                    and Jest and refreshing my knowledge in React and Sass to consolidate my
                    expertise in my current stack.
                </Paragraph>
                <Heading as="h2">Academic Accomplishments</Heading>
                <AchievementList achievements={academicAchievements} />
                <Heading as="h2">Additional Training</Heading>
                <AchievementList achievements={certificateAchievements} />
            </Main>
        </Screen>
    )
}

export default About
