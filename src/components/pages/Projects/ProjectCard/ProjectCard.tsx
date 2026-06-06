import type { Project } from '../Projects'
import { getColourName } from '../Projects.selectors'
import {
    Link,
    Heading,
    Paragraph,
    Pill,
    Figure,
    Stack,
    Card,
    Typography,
    Overline,
} from '@common/ux'
import { FaGithub } from 'react-icons/fa'
import { TbWorldWww } from 'react-icons/tb'
import { PiReadCvLogoFill } from 'react-icons/pi'
import './ProjectCard.scss'

interface Props {
    project: Project
}

export const ProjectCard = ({
    project: { title, image, description, badges, url, github, blog, year, openInNewTab, type },
}: Props) => {
    return (
        <Card className="ProjectCard">
            <Stack.Vertical gap="32" align="start" className="ProjectCard__stack">
                <Figure src={image} alt={title} size="full" className="ProjectCard__image" />
                <Stack.Vertical gap="8" className="ProjectCard__content">
                    <Heading as="h3">
                        <Stack.Horizontal align="center" justify="between" gap="16">
                            <div>
                                {title}{' '}
                                <Typography tone="muted" weight="bold">
                                    - {year}
                                </Typography>
                            </div>
                            {type && (
                                <Pill
                                    className="ProjectCard__type--desktop"
                                    label={type.toLocaleLowerCase()}
                                    color={getColourName(type)}
                                    variant="outlined"
                                />
                            )}
                        </Stack.Horizontal>
                        {type && (
                            <Pill
                                className="ProjectCard__type--mobile"
                                label={type.toLocaleLowerCase()}
                                color={getColourName(type)}
                                variant="outlined"
                            />
                        )}
                    </Heading>
                    <Paragraph className="ProjectCard__description">{description}</Paragraph>
                    <Stack.Vertical gap="8" wrap className="ProjectCard__links">
                        {url && (
                            <Stack.Horizontal gap="4" align="center">
                                <TbWorldWww />
                                <Overline>Live Site</Overline>
                                <Link
                                    to={url}
                                    target={openInNewTab ? '_blank' : undefined}
                                    rel={openInNewTab ? 'noopener noreferrer' : undefined}
                                >
                                    {url}
                                </Link>
                            </Stack.Horizontal>
                        )}
                        {github && (
                            <Stack.Horizontal gap="4" align="center">
                                <FaGithub />
                                <Overline>GitHub</Overline>
                                {github && (
                                    <Link to={github} target="_blank" rel="noopener noreferrer">
                                        {github}
                                    </Link>
                                )}
                            </Stack.Horizontal>
                        )}
                        {blog && (
                            <Stack.Horizontal gap="4" align="center">
                                <PiReadCvLogoFill />
                                <Overline>Blog</Overline>
                                {blog && <Link to={blog}>{blog}</Link>}
                            </Stack.Horizontal>
                        )}
                    </Stack.Vertical>
                    <Stack.Horizontal gap="8" wrap>
                        {badges.map((badge) => (
                            <Pill
                                key={badge}
                                label={badge}
                                color={getColourName(badge)}
                                variant="solid"
                            />
                        ))}
                    </Stack.Horizontal>
                </Stack.Vertical>
            </Stack.Vertical>
        </Card>
    )
}
