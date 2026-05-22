import { useState } from 'react'
import type { Project } from '../Projects'
import { getColourName } from '../getProjects'
import { Link, Heading, Paragraph, Pill, Figure } from '@common/ux'
import { FaGithub } from 'react-icons/fa'
import { TbWorldWww } from 'react-icons/tb'
import { PiReadCvLogoFill } from 'react-icons/pi'
import './ProjectCard.scss'

interface Props {
    project: Project
}

const ProjectCard = ({
    project: { title, image, description, badges, url, github, readMoreLink },
}: Props) => {
    const [linkOptionsOpened, setLinkOptionsOpened] = useState(false)
    return (
        <div className="ProjectCard">
            {linkOptionsOpened && (url || github || readMoreLink) && (
                <div className="ProjectCard__link-options">
                    {renderLinks(setLinkOptionsOpened, title, url, github, readMoreLink)}
                </div>
            )}
            <Heading as="h3">{title}</Heading>
            <Figure src={image} alt={title} size="full" onZoom={() => setLinkOptionsOpened(true)} />
            <hr />
            <Paragraph className="ProjectCard__description">{description}</Paragraph>
            <hr />
            <div className="ProjectCard__badges">
                {badges.map((badge) => (
                    <Pill key={badge} label={badge} color={getColourName(badge)} variant="solid" />
                ))}
            </div>
            {renderBottomLinks(url, github, readMoreLink)}
        </div>
    )
}

const renderBottomLinks = (url?: string, github?: string, readMoreLink?: string) => {
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
        )
}

const renderLinks = (
    setLinkOptionsOpened: (opened: false) => void,
    title: string,
    url?: string,
    github?: string,
    readMoreLink?: string,
) => {
    if (url || github || readMoreLink)
        return (
            <div className="ProjectCard__links" onClick={() => setLinkOptionsOpened(false)}>
                <Heading as="h3">Links</Heading>
                <Heading as="h3" className="ProjectCard__links__title">
                    {title}
                </Heading>
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
        )
}

export default ProjectCard
