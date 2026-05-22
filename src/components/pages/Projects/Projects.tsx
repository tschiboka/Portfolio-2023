import ProjectCard from './ProjectCard/ProjectCard'
import ProjectFilter from './ProjectFilter/ProjectFilter'
import { PageSideMenu } from '../../sharedComponents/PageSideMenu/PageSideMenu'
import { getProjects } from './getProjects'
import './Projects.scss'
import { useState } from 'react'
import { Screen } from '../../sharedComponents/Screen/Screen'
import { Heading, Paragraph, Main } from '@common/ux'

interface Props {
    pageName: string
    path: string
}

export interface Project {
    title: string
    image: string
    gallery?: [string]
    description: string
    badges: string[]
    url?: string
    github?: string
    readMoreLink?: string
}

const Projects = ({ pageName }: Props) => {
    const [selectedLanguages, setSelectedLanguages] = useState<Set<string>>(new Set())

    const allProjects = getProjects()
    const filteredProjects =
        selectedLanguages.size === 0
            ? allProjects
            : allProjects.filter((project) =>
                  project.badges.some((badge) => selectedLanguages.has(badge)),
              )

    const handleToggle = (language: string) => {
        setSelectedLanguages((prev) => {
            const next = new Set(prev)
            if (next.has(language)) next.delete(language)
            else next.add(language)
            return next
        })
    }

    return (
        <Screen
            title="Tivadar Debnar | Projects"
            path="/projects"
            variant="portfolio"
            pageName={pageName}
            sideMenu={<PageSideMenu />}
        >
            <Main>
                <Heading as="h1">Projects</Heading>
                <Paragraph>
                    This page contains a selection of personal and academic projects covering
                    frontend development, full-stack applications, UI experimentation, and
                    browser-based systems.
                </Paragraph>

                <Paragraph>
                    Many of these projects were opportunities to explore architectural ideas, solve
                    implementation challenges, and deepen my understanding of how modern web
                    applications are designed and maintained.
                </Paragraph>

                <Paragraph>
                    The technologies vary across projects, but most are centred around TypeScript,
                    React, Node.js, and modern frontend tooling.
                </Paragraph>
                <ProjectFilter
                    selectedLanguages={selectedLanguages}
                    onToggle={handleToggle}
                    onClear={() => setSelectedLanguages(new Set())}
                    totalCount={allProjects.length}
                    filteredCount={filteredProjects.length}
                />
                <hr />
                <section className="ProjectCard-wrapper">
                    {filteredProjects.map((project) => (
                        <ProjectCard key={project.title} project={project} />
                    ))}
                </section>
            </Main>
        </Screen>
    )
}

export default Projects
