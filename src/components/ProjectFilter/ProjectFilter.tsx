import "./ProjectFilter.scss";
import { getProjects, getColourName } from "../Projects/getProjects";

const ProjectFilter = () => {
    const projects = getProjects();
    // Create a Set of Project Languages
    const languagesSet: Set<string> = new Set();
    projects.forEach((project) =>
        project.badges.map((badge) => languagesSet.add(badge))
    );
    const languages = Array.from(languagesSet);
    console.log(languages);
    return (
        <div className="ProjectFilter">
            {languages.map((badge) => (
                <span
                    key="badge"
                    className={"badge " + getColourName(badge)}
                    title={"Filter for " + badge}
                >
                    {badge}
                </span>
            ))}
        </div>
    );
};

export default ProjectFilter;
