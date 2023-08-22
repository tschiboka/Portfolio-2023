import Nav from "../../sharedComponents/Nav/Nav";
import Menu from "../../sharedComponents/Menu/Menu";
import SubNav from "../../sharedComponents/SubNav/SubNav";
import ProjectCard from "./ProjectCard/ProjectCard";
import ProjectFilter from "./ProjectFilter/ProjectFilter";
import Footer from "../../sharedComponents/Footer/Footer";
import { getProjects } from "./getProjects";
import "./Projects.scss";
import { useState } from "react";
import { useAppContext } from "../../../context/AppContext";
import Page from "../../sharedComponents/Page/Page";

interface Props {
    pageName: string;
    path: string;
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

const Projects = ({ pageName, path }: Props) => {
    const { mobileMenuVisible, subMenuVisible } = useAppContext();
    const [filteredLanguage, setFilterLanguage] = useState<string>("");

    let projects = getProjects();
    if (filteredLanguage)
        projects = projects.filter((project) =>
            project.badges.includes(filteredLanguage)
        );
    return (
        <Page title="Tivadar Debnar | Projects" path="/projects">
            <Nav pageName={pageName} />
            {mobileMenuVisible && <Menu pageName="projects" />}
            {subMenuVisible && <SubNav />}
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
                </p>
                <hr />
                <p>
                    Also, feel free to filter my projects by technology you are
                    interested in!
                </p>

                <ProjectFilter
                    filteredLanguage={filteredLanguage}
                    setFilteredLanguage={setFilterLanguage}
                />
                {filteredLanguage && (
                    <div className="button-wrapper--reset">
                        <button onClick={() => setFilterLanguage("")}>
                            Reset Filter
                        </button>
                    </div>
                )}
                <hr />
                <section className="ProjectCard-wrapper">
                    {projects.map((project) => (
                        <ProjectCard key={project.title} project={project} />
                    ))}
                </section>
            </main>
            <Footer pageName={pageName} path={path} />
        </Page>
    );
};

export default Projects;
