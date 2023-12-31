import Nav from "../../sharedComponents/Nav/Nav";
import Menu from "../../sharedComponents/Menu/Menu";
import SubNav from "../../sharedComponents/SubNav/SubNav";
import Footer from "../../sharedComponents/Footer/Footer";
import AchievementList from "../../sharedComponents/AchievementList/AchievementList";
import {
    academicAchievements,
    certificateAchievements,
} from "../../sharedComponents/AchievementListItem/Achievements";
import guitarImage from "../../../assets/images/about/RiffMaster.png";
import guitarAppImage from "../../../assets/images/about/RiffMaster_App.png";
import guitarAppImageSm from "../../../assets/images/about/RiffMaster_App_Mobile.png";
import { Link } from "react-router-dom";
import { useAppContext } from "../../../context/AppContext";
import Page from "../../sharedComponents/Page/Page";
import "./About.scss";

interface Props {
    pageName: string;
    path: string;
}

const About = ({ pageName, path }: Props) => {
    const { mobileMenuVisible, subMenuVisible } = useAppContext();
    return (
        <Page title="Tivadar Debnar | About" path="/about">
            <Nav pageName={pageName} />
            {mobileMenuVisible && <Menu pageName="about" />}
            {subMenuVisible && <SubNav />}
            <main>
                <h1>About Tivadar</h1>
                <h2>The beginnings</h2>
                <p>
                    I often have nostalgic memories about the first time I
                    immersed myself in a Pascal programming book as a child and
                    began tinkering with my computer, a Z80 Enterprise. My
                    enthusiasm didn't wane regardless that most available books
                    were English in the late 90s, and I was a Hungarian
                    13-year-old with a minimal English vocabulary. So equipped
                    with a dictionary, I started deciphering my textbooks and
                    creating my first text-based games. The early exposure to
                    programming proved to be a perfect inspiration, fueling my
                    love for languages of all kinds, whether spoken by humans or
                    written in code.
                </p>
                <h2>Self Study</h2>
                <p>
                    Curiosity and a mystical fascination with coding have been
                    constant companions throughout my adult life, propelling me
                    to explore browser-based programming technologies like
                    JavaScript, CSS, and HTML. Soon, I found myself coding
                    daily, taking online courses, such as FreeCodeCamp's
                    front-end development course, and attending meetups of
                    different coding-related groups. With each passing moment
                    dedicated to my studies and projects, I came to the profound
                    realisation that programming was my true calling, urging me
                    to pursue a career as a professional web developer.
                </p>
                <h2>College</h2>
                <p>
                    To make my commitment official, in 2020, I enrolled in Icon
                    College of Technology and Management to get my Higher
                    National Diploma (HND) in Computing, where I studied some
                    fascinating subjects, such as Algorithms and Data
                    Structures, Databases, Web Development, Project Management
                    and Security. The knowledge gained from my self-guided
                    studies proved invaluable across various subjects, resulting
                    in my graduating with distinction and setting the stage for
                    me to pursue a bachelor's degree.
                </p>
                <h2>Uni</h2>
                <p>
                    During my time at Falmouth University, I delved into the
                    field of software engineering, focusing on Mobile
                    Development (React Native), Artificial Intelligence, Big
                    Data, IoT, and several other exciting disciplines.
                    Additionally, I concentrated every spare time on my
                    dissertation project, one of the most stimulating and
                    complex projects I have ever embarked on: a digital guitar
                    console that can be played on a browser-based web
                    application. This project involved nearly 800 hours of
                    electric wiring, manufacturing, microcontroller programming,
                    and extensive use of JavaScript / NodeJS for its user
                    interface and server. The final product received an
                    exceptional 90% mark and helped me towards a first-class
                    degree with honours.
                </p>
                <div className="image-container">
                    <figure>
                        <img
                            className="guitar-app--sm"
                            src={guitarAppImageSm}
                            alt="Guitar App Image"
                        />
                        <img
                            className="guitar-app"
                            src={guitarAppImage}
                            alt="Guitar App Image"
                        />
                        <figcaption>Guitar Music Studio App</figcaption>
                    </figure>
                    <figure>
                        <img
                            className="guitar"
                            src={guitarImage}
                            alt="Guitar Image"
                        />
                        <figcaption>Guitar Console Instrument</figcaption>
                    </figure>
                </div>
                <Link className="link--inline" to="/blog/riffmaster">
                    You can check out this guitar project in detail here.
                </Link>
                <h2>Continued Self Development</h2>
                <p>
                    I consider the completion of my bachelor's degree the
                    beginning of my self-development and an exciting phase of a
                    life-long professional development journey. I am now further
                    expanding my skills by taking courses on TypeScript and Jest
                    and refreshing my knowledge in React and Sass to consolidate
                    my expertise in my current stack.
                </p>
                <h2>Academic Accomplishments</h2>
                <AchievementList achievements={academicAchievements} />
                <h2>Certificates</h2>
                <AchievementList achievements={certificateAchievements} />
            </main>
            <Footer pageName={pageName} path={path} />
        </Page>
    );
};

export default About;
