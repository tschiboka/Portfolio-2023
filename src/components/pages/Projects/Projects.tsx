import { ProjectCard } from './ProjectCard/ProjectCard'
import { ProjectFilter } from './ProjectFilter/ProjectFilter'
import { PageSideMenu } from '../../sharedComponents/PageSideMenu/PageSideMenu'
import { getProjects } from './Projects.selectors'
import { ReactNode, useState } from 'react'
import { Screen } from '../../sharedComponents/Screen/Screen'
import { Heading, Paragraph, Main, Section } from '@common/ux'
import { isEmpty } from '@common/utils/Predicate/Predicate'
import { BsSliders2 } from 'react-icons/bs'

interface Props {
    pageName: string
    path: string
}

/**
 * Featured: Projects that are complete and represent my best work, showcasing a range of skills and technologies.
 * In Progress: Projects that are currently being developed or refined, demonstrating my ongoing learning and experimentation.
 * Archived: Older projects that may not reflect my current skill level but are included for historical context and to show my growth over time.
 */
export type ProjectType = 'featured' | 'complete' | 'inProgress' | 'archived'

export interface Project {
    title: string
    year: number
    type?: ProjectType
    image: string
    gallery?: [string]
    description: ReactNode
    badges: string[]
    url?: string
    github?: string
    blog?: string
    openInNewTab?: boolean
}

const filterProjects = (by: string, projects: Project[] = getProjects()) => {
    if (by === 'featured') return projects.filter((project) => project.type === 'featured')
    if (by === 'inProgress') return projects.filter((project) => project.type === 'inProgress')
    if (by === 'archived') return projects.filter((project) => project.type === 'archived')
    return projects
}

const Projects = ({ pageName }: Props) => {
    const [selectedLanguages, setSelectedLanguages] = useState<Set<string>>(new Set())
    const [selectedFilter, setSelectedFilter] = useState<string>('all')

    const allProjects = getProjects()
    const filteredProjectsByLanguage = isEmpty(selectedLanguages)
        ? allProjects
        : allProjects.filter((project) =>
              project.badges.some((badge) => selectedLanguages.has(badge)),
          )

    const filteredProjects = filterProjects(selectedFilter, filteredProjectsByLanguage)

    const handleToggle = (language: string) => {
        setSelectedLanguages((prev) => {
            const next = new Set(prev)
            if (next.has(language)) next.delete(language)
            else next.add(language)
            return next
        })
    }

    const handleFilter = (by: string) => {
        setSelectedFilter(by)
    }

    const handleClearFilters = () => {
        setSelectedLanguages(new Set())
        setSelectedFilter('featured')
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
                    This page is a mix of personal and academic projects — really just a space where
                    I build, experiment, and share what I’ve learned along the way. Some projects
                    are polished, others are messy, and a few I still use today. They range from
                    frontend and full-stack apps to UI experiments and browser-based systems, mostly
                    built with TypeScript, React, Node.js, and modern frontend tooling.
                </Paragraph>
                <Section
                    title="Filter Projects"
                    expandable
                    defaultOpen={false}
                    icon={<BsSliders2 />}
                >
                    <ProjectFilter
                        selectedLanguages={selectedLanguages}
                        onToggle={handleToggle}
                        onFilter={handleFilter}
                        onClear={handleClearFilters}
                        totalCount={allProjects.length}
                        filteredCount={filteredProjects.length}
                        selectedFilter={selectedFilter}
                    />
                </Section>
                {filteredProjects.map((project) => (
                    <ProjectCard key={project.title} project={project} />
                ))}
            </Main>
        </Screen>
    )
}

export default Projects
