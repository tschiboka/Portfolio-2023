import { ProjectCard } from './ProjectCard/ProjectCard'
import { ProjectFilter } from './ProjectFilter/ProjectFilter'
import { PageSideMenu } from '../../sharedComponents/PageSideMenu/PageSideMenu'
import { useState } from 'react'
import { Screen } from '../../sharedComponents/Screen/Screen'
import { Heading, Paragraph, Main, Section } from '@common/ux'
import { isEmpty } from '@common/utils/Predicate/Predicate'
import { BsSliders2 } from 'react-icons/bs'
import { DEFAULT_PROJECT_FILTER, filterProjects, getProjects } from '.'

interface Props {
    pageName: string
    path: string
}

export const Projects = ({ pageName }: Props) => {
    const [selectedLanguages, setSelectedLanguages] = useState<Set<string>>(new Set())
    const [selectedFilter, setSelectedFilter] = useState<string>(DEFAULT_PROJECT_FILTER)

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
        setSelectedFilter(DEFAULT_PROJECT_FILTER)
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
                    title={`Filter Projects | ${filteredProjects.length} of ${allProjects.length}`}
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
