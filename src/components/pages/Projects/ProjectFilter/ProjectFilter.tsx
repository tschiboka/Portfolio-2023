import { Pill, Overline, Text, Button, Inline, Stack, Spacer, Section } from '@common/ux'
import { getColourName, technologies, Technology } from '../Projects.selectors'
import './ProjectFilter.scss'

interface Props {
    selectedLanguages: Set<string>
    totalCount: number
    filteredCount: number
    selectedFilter: string
    onToggle: (language: string) => void
    onFilter: (by: string) => void
    onClear: () => void
}

const DEFAULT_PROJECT_FILTER = 'all' // Set this to featured if you wanna use this as a portfolio

export const ProjectFilter = ({
    selectedLanguages,
    onToggle,
    onFilter,
    onClear,
    totalCount,
    filteredCount,
    selectedFilter,
}: Props) => {
    const hasFilter = selectedLanguages.size > 0 || selectedFilter !== DEFAULT_PROJECT_FILTER
    const languageGroups = technologies.reduce(
        (groups, tech) => {
            if (!tech.groupName) return groups
            if (!groups[tech.groupName]) groups[tech.groupName] = []
            groups[tech.groupName].push(tech)
            return groups
        },
        {} as Record<string, Technology[]>,
    )

    return (
        <div className="ProjectFilter">
            <Stack.Horizontal gap="32" className="ProjectFilter__languages" wrap>
                {Object.keys(languageGroups).map((groupName) => (
                    <Stack.Vertical key={groupName} className="ProjectFilter__groups">
                        <Overline>{groupName}</Overline>
                        <Spacer size="8" />
                        <Stack.Horizontal gap="8" wrap>
                            {languageGroups[groupName].map((tech) => {
                                const isActive = !hasFilter || selectedLanguages.has(tech.name)
                                return (
                                    <Pill
                                        key={tech.name}
                                        label={tech.name}
                                        color={getColourName(tech.name)}
                                        variant="solid"
                                        className={isActive ? '' : 'ProjectFilter__pill--dimmed'}
                                        onClick={() => onToggle(tech.name)}
                                        ariaLabel={`Filter by ${tech.name}`}
                                    />
                                )
                            })}
                        </Stack.Horizontal>
                    </Stack.Vertical>
                ))}
            </Stack.Horizontal>
            <Spacer size="16" />
            <Section title="More filters" expandable defaultOpen={false}>
                <Stack.Horizontal gap="32" wrap>
                    <Pill
                        label="Featured"
                        color={selectedFilter === 'featured' ? 'accent' : 'gray'}
                        onClick={() => onFilter('featured')}
                    />
                    <Pill
                        label="All"
                        color={selectedFilter === 'all' ? 'accent' : 'gray'}
                        onClick={() => onFilter('all')}
                    />
                    <Pill
                        label="In progress"
                        color={selectedFilter === 'inProgress' ? 'accent' : 'gray'}
                        onClick={() => onFilter('inProgress')}
                    />
                    <Pill
                        label="Archived"
                        color={selectedFilter === 'archived' ? 'accent' : 'gray'}
                        onClick={() => onFilter('archived')}
                    />
                </Stack.Horizontal>
            </Section>
            <Stack.Horizontal justify="between" align="center">
                <Overline>
                    <Text tone="muted">
                        Showing <Text tone="info">{filteredCount} </Text> of {totalCount}
                    </Text>
                </Overline>
                {hasFilter && (
                    <Inline gap={'12'} align="center">
                        <Button variant="tertiary" size="sm" onClick={onClear}>
                            Clear
                        </Button>
                    </Inline>
                )}
            </Stack.Horizontal>
        </div>
    )
}
