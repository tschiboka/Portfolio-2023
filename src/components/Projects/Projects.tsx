import Nav from "../Nav/Nav";
import Menu from "../Menu/Menu";
import SubNav from "../SubNav/SubNav";
import ProjectCard from "../ProjectCard/ProjectCard";
import Footer from "../Footer/Footer";
import riffMasterImg from "../../assets/images/projects/RiffMaster.png";
import personalTrainerImg from "../../assets/images/projects/FrancescoLevo.png";
import gradientGeneratorImg from "../../assets/images/projects/GradientGenerator.png";
import rainCheckImg from "../../assets/images/projects/RainCheck.png";
import greenRooftopImg from "../../assets/images/projects/GreenRooftop.png";
import fruitsAndFlowersImg from "../../assets/images/projects/FruitsAndFlowers.png";
import pocketTutorImg from "../../assets/images/projects/PocketTutor.png";
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
    gallery?: [string];
    description: string;
    badges: string[];
    url?: string;
    github?: string;
    readMoreLink?: string;
}

const projects: Project[] = [
    {
        title: "RiffMaster Guitar Studio",
        image: riffMasterImg,
        description:
            "My groundbreaking project aims to revolutionise how we learn and play the guitar. With a custom-designed digital guitar controller and an interactive web application, RiffMaster offers an entertaining and educative musical experience for both beginners and experienced guitarists. The platform provides comprehensive lessons and enables composing and playing real-time music games with RiffMaster's innovative hardware and software fusion.",
        badges: ["HTML", "CSS", "JavaScript", "Arduino", "NodeJs", "Mongodb"],
        url: "",
        github: "",
        readMoreLink: "",
    },
    {
        title: "Personal Trainer Website",
        image: personalTrainerImg,
        description: "An appropriate description for my project",
        badges: ["HTML", "CSS", "JavaScript", "NodeJs", "Mongodb"],
        url: "",
        github: "",
    },
    {
        title: "Gradient & Pattern Generator",
        image: gradientGeneratorImg,
        description: "An appropriate description for my project",
        badges: ["React", "CSS"],
        url: "",
        github: "",
    },
    {
        title: "Raincheck Mobile App",
        image: rainCheckImg,
        description: "An appropriate description for my project",
        badges: ["React Native"],
        url: "",
        github: "",
    },
    {
        title: "Green Rooftop IoT Device & App",
        image: greenRooftopImg,
        description: "An appropriate description for my project",
        badges: ["HTML", "CSS", "JavaScript", "Arduino", "NodeJs", "Mongodb"],
        url: "",
        github: "",
    },
    {
        title: "Fruits & Flowers Game",
        image: fruitsAndFlowersImg,
        description: "An appropriate description for my project",
        badges: ["HTML", "Sass", "JavaScript"],
        url: "",
        github: "",
    },
    {
        title: "Pocket Tutor App",
        image: pocketTutorImg,
        description: "An appropriate description for my project",
        badges: ["HTML", "CSS", "React"],
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
