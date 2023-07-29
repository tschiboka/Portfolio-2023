import type { Project } from "../Projects/Projects";
import { Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import { TbWorldWww } from "react-icons/tb";
import { FiMoreHorizontal } from "react-icons/fi";
import "./ProjectCard.scss";
import { getColourName } from "../Projects/getProjects";

interface Props {
    project: Project;
}

const renderLinks = (url?: string, github?: string, readMoreLink?: string) => {
    if (url || github || readMoreLink)
        return (
            <>
                <hr />
                <div className="ProjectCard__links">
                    {url && (
                        <Link to={url} title="View Project Website">
                            <TbWorldWww />
                        </Link>
                    )}
                    {github && (
                        <Link to={github} title="Check Out Project Github">
                            <FaGithub />
                        </Link>
                    )}
                    {readMoreLink && (
                        <Link to={readMoreLink} title="Read More About Project">
                            <FiMoreHorizontal />
                        </Link>
                    )}
                </div>
            </>
        );
};

const ProjectCard = ({
    project: { title, image, description, badges, url, github, readMoreLink },
}: Props) => {
    return (
        <div className="ProjectCard">
            <h3>{title}</h3>
            <img src={image} />
            <hr />
            <p>{description}</p>
            <hr />
            <div className="ProjectCard__badges">
                {badges.map((badge) => (
                    <span
                        className={"badge " + getColourName(badge)}
                        key={badge}
                    >
                        {badge}
                    </span>
                ))}
            </div>
            {renderLinks(url, github, readMoreLink)}
        </div>
    );
};

export default ProjectCard;
