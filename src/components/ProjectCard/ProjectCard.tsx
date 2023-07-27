import type { Project } from "../Projects/Projects";
import { Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import { TbWorldWww } from "react-icons/tb";
import "./ProjectCard.scss";

interface Props {
    project: Project;
}

function getColourName(str: string) {
    switch (str.toLowerCase()) {
        case "html":
            return "orange";
        case "css":
            return "blue";
        case "javascript":
            return "yellow";
        case "react":
            return "light-blue";
        case "react native":
            return "light-blue";
        case "typescript":
            return "blue";
        case "sass":
            return "pink";
        case "arduino":
            return "light-blue";
        case "nodejs":
            return "light-green";
        case "mongodb":
            return "green";
        case "photoshop":
            return "light-blue";
        case "illustrator":
            return "orange";
        default:
            return "white";
    }
}

const ProjectCard = ({
    project: { title, image, description, badges, url, github },
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
            <hr />
            <div className="ProjectCard__links">
                <Link to={url}>
                    <TbWorldWww />
                </Link>
                <Link to={github}>
                    <FaGithub />
                </Link>
            </div>
        </div>
    );
};

export default ProjectCard;
