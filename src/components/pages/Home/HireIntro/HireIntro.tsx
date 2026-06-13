import { BiMessageDots } from 'react-icons/bi'
import { FiDownload } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { Button, Heading, Paragraph, Table, Stack } from '../../../../../common/ux'
import type { TableColumns } from '../../../../../common/ux/Table/Table.types'
import cv from '../../../../assets/files/Tivadar_Debnar_CV_2023.pdf'
import './HireIntro.scss'

type Skill = { area: string; technology: string; focus: string }

const skills: Skill[] = [
    {
        area: 'Frontend',
        technology: 'React',
        focus: 'Hooks, state management, component architecture',
    },
    {
        area: 'Frontend',
        technology: 'TypeScript',
        focus: 'Strict typing, generics, advanced patterns',
    },
    { area: 'Frontend', technology: 'JavaScript', focus: 'ES6+, async patterns' },
    { area: 'Frontend', technology: 'HTML & CSS', focus: 'Semantic HTML, responsive design' },
    { area: 'Frontend', technology: 'Sass', focus: 'Legacy / partial usage' },
    { area: 'Backend', technology: 'Node.js', focus: 'Server-side JavaScript' },
    { area: 'Backend', technology: 'C#', focus: 'Foundational' },
    { area: 'Backend', technology: 'Python', focus: 'Foundational' },
    { area: 'Testing', technology: 'Jest', focus: 'Unit & integration testing' },
    { area: 'Testing', technology: 'React Testing Library', focus: 'Component testing' },
    { area: 'Testing', technology: 'MSW', focus: 'API mocking' },
    { area: 'Mobile', technology: 'React Native', focus: 'Cross-platform development' },
    { area: 'Databases', technology: 'MongoDB', focus: 'NoSQL document store' },
]

const skillColumns: TableColumns<Skill> = [
    { header: 'Area', accessor: 'area' },
    { header: 'Technology', accessor: 'technology' },
    { header: 'Focus', accessor: 'focus' },
]

const HireIntro = () => {
    return (
        <>
            <Paragraph className="delay-0 anim-fade-from-left">
                I'm a software engineer focused on building reliable, maintainable frontend systems
                with TypeScript and React. I care less about chasing technologies and more about how
                software holds up over time — structure, clarity, testing, and the ability for teams
                to evolve a codebase without friction.
            </Paragraph>
            <Heading as="h2">I'm all about Web</Heading>
            <Paragraph className="delay-2 anim-fade-from-right">
                My background combines early self-directed learning with formal education in
                computing, followed by several years of professional experience working on
                production systems. This mix has shaped how I approach problems: I tend to think in
                terms of systems and long-term maintainability rather than isolated features.
            </Paragraph>
            <Paragraph className="delay-3 anim-fade-from-left">
                I’ve spent a large part of my recent work focusing on frontend architecture,
                TypeScript-heavy codebases, and testing strategies (Jest, React Testing Library,
                MSW). I’m particularly interested in reducing complexity over time through better
                abstractions, clearer boundaries, and more predictable engineering patterns.
            </Paragraph>
            <Paragraph className="delay-2 anim-fade-from-right">
                Outside of day-to-day delivery, I still actively explore system design, developer
                tooling, and frontend architecture, but this is driven by professional depth rather
                than early-stage learning.
            </Paragraph>
            <Heading as="h2">Skills</Heading>
            <Table data={skills} columns={skillColumns} ariaLabel="Skills and technologies" />
            <Heading as="h2">Continuous development</Heading>
            <Paragraph>
                I continuously refine my skills through real-world engineering work and focused
                exploration of areas such as frontend architecture, TypeScript patterns, testing
                strategies, and system design.
            </Paragraph>
            <Paragraph>
                My current focus is on building maintainable, scalable frontend systems using React
                and TypeScript, with strong emphasis on testing, code quality, and long-term
                maintainability.
            </Paragraph>
            <hr />
            <Stack.Vertical gap="16" className="button-wrapper" justify="center" align="center">
                <Button as={Link} to="/contact">
                    Contact Tivadar <BiMessageDots />
                </Button>
                <Button as="a" href={cv} download variant="secondary">
                    Download my CV <FiDownload />
                </Button>
            </Stack.Vertical>
        </>
    )
}

export default HireIntro
