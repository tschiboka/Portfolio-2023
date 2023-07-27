import Nav from "../Nav/Nav";
import Menu from "../Menu/Menu";
import SubNav from "../SubNav/SubNav";
import ProjectCard from "../ProjectCard/ProjectCard";
import Footer from "../Footer/Footer";
import riffMasterImg from "../../assets/images/about/RiffMaster.png";
import "./Projects.scss";

interface Props {
    pageName: string;
    mobileMenuVisible: boolean;
    setMobileMenuVisible: (visible: boolean) => void;
    themeMode: string;
    setThemeMode: (mode: string) => void;
    subMenuVisible: boolean;
    setSubMenuVisible: (visible: boolean) => void;
}

export interface Project {
    title: string;
    image: string;
    description: string;
    badges: string[];
    url: string;
    github: string;
}

const projects: Project[] = [
    {
        title: "RiffMaster Guitar Studio",
        image: riffMasterImg,
        description: "An appropriate description for my project",
        badges: [
            "HTML",
            "CSS",
            "JavaScript",
            "React",
            "React Native",
            "TypeScript",
            "Sass",
            "Arduino",
            "NodeJs",
            "Mongodb",
            "PhotoShop",
            "Illustrator",
        ],
        url: "",
        github: "",
    },
];

const Projects = ({
    pageName,
    mobileMenuVisible,
    setMobileMenuVisible,
    themeMode,
    setThemeMode,
    subMenuVisible,
    setSubMenuVisible,
}: Props) => {
    return (
        <>
            <Nav
                pageName={pageName}
                subMenuVisible={subMenuVisible}
                setSubMenuVisible={setSubMenuVisible}
                setMobileMenuVisible={setMobileMenuVisible}
                mobileMenuVisible={mobileMenuVisible}
                themeMode={themeMode}
            />
            {mobileMenuVisible && (
                <Menu
                    pageName="projects"
                    themeMode={themeMode}
                    setThemeMode={setThemeMode}
                    setMobileMenuVisible={setMobileMenuVisible}
                />
            )}
            {subMenuVisible && (
                <SubNav themeMode={themeMode} setThemeMode={setThemeMode} />
            )}
            <main>
                <h1>Projects</h1>
                <p>
                    Welcome to my projects page! Let me introduce some exciting
                    work showcasing my passion for web development and
                    creativity. Each of these projects handed me opportunities
                    to tackle some interesting problems. From responsive
                    front-end designs with HTML, CSS, JavaScript and React to
                    back-end solutions with Node.js and Express, I've leveraged
                    many tools to bring these projects to life.
                    <br />
                    Also, feel free to filter my projects by technology you are
                    interested in!
                </p>
                <section className="ProjectCard-wrapper">
                    {projects.map((project) => (
                        <ProjectCard key={project.title} project={project} />
                    ))}
                </section>
            </main>
            <Footer pageName={pageName} />
        </>
    );
};

export default Projects;
