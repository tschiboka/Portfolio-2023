import { useState } from "react";
import type { Project } from "../Projects";
import { getColourName } from "../getProjects";
import { Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import { TbWorldWww } from "react-icons/tb";
import { PiReadCvLogoFill } from "react-icons/pi";
import "./ProjectCard.scss";

interface Props {
    project: Project;
}

const ProjectCard = ({
    project: { title, image, description, badges, url, github, readMoreLink },
}: Props) => {
    const [linkOptionsOpened, setLinkOptionsOpened] = useState(false);
    return (
        <div className="ProjectCard">
            {linkOptionsOpened && (url || github || readMoreLink) && (
                <div className="ProjectCard__link-options">
                    {renderLinks(
                        setLinkOptionsOpened,
                        title,
                        url,
                        github,
                        readMoreLink
                    )}
                </div>
            )}
            <h3>{title}</h3>
            <img src={image} onClick={() => setLinkOptionsOpened(true)} />
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
            {renderBottomLinks(url, github, readMoreLink)}
        </div>
    );
};

const renderBottomLinks = (
    url?: string,
    github?: string,
    readMoreLink?: string
) => {
    if (url || github || readMoreLink)
        return (
            <>
                <hr />
                <div className="ProjectCard__bottom-links">
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
                            <PiReadCvLogoFill />
                        </Link>
                    )}
                </div>
            </>
        );
};

const renderLinks = (
    setLinkOptionsOpened: (opened: false) => void,
    title: string,
    url?: string,
    github?: string,
    readMoreLink?: string
) => {
    if (url || github || readMoreLink)
        return (
            <div
                className="ProjectCard__links"
                onClick={() => setLinkOptionsOpened(false)}
            >
                <h3>Links</h3>
                <h3 className="ProjectCard__links__title">{title}</h3>
                <hr />
                <div className="link-box">
                    {url && (
                        <Link to={url} title="View Project Website">
                            <TbWorldWww />
                            <span>Website Link</span>
                        </Link>
                    )}
                    {github && (
                        <Link to={github} title="Check Out Project Github">
                            <FaGithub />
                            <span>Github Link</span>
                        </Link>
                    )}
                    {readMoreLink && (
                        <Link to={readMoreLink} title="Read More About Project">
                            <PiReadCvLogoFill />
                            <span>Blog Link</span>
                        </Link>
                    )}
                </div>
                <hr />
            </div>
        );
};

export default ProjectCard;
