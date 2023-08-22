import "./ProjectFilter.scss";
import { getProjects, getColourName } from "../getProjects";

interface Props {
    filteredLanguage: string;
    setFilteredLanguage: (language: string) => void;
}

const ProjectFilter = ({ filteredLanguage, setFilteredLanguage }: Props) => {
    const isSelected = (badge: string) =>
        filteredLanguage === badge ? "selected" : "";
    const projects = getProjects();
    // Create a Set of Project Languages
    const languagesSet: Set<string> = new Set();
    projects.forEach((project) =>
        project.badges.map((badge) => languagesSet.add(badge))
    );
    const languages = Array.from(languagesSet);

    return (
        <div className="ProjectFilter">
            {languages.map((badge) => (
                <span
                    key={badge}
                    className={
                        "badge " +
                        getColourName(badge) +
                        " " +
                        isSelected(badge)
                    }
                    title={"Filter for " + badge}
                    onClick={() => setFilteredLanguage(badge)}
                >
                    {badge}
                </span>
            ))}
        </div>
    );
};

export default ProjectFilter;
