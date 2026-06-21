import { Pill, Overline, Text, Button, Inline, Stack, Spacer, Section } from '@common/ux'
import { getColourName, technologies, Technology } from '../../Projects/Projects.selectors'
import './BlogFilter.scss'
import { BlogSortBy } from '../Blog.type'

interface Props {
    selectedLanguages: Set<string>
    totalCount: number
    filteredCount: number
    onToggle: (language: string) => void
    onClear: () => void
    sortedBy: BlogSortBy
    onSortBy: (sortBy: BlogSortBy) => void
}

export const BlogFilter = ({
    selectedLanguages,
    totalCount,
    filteredCount,
    sortedBy,
    onClear,
    onToggle,
    onSortBy,
}: Props) => {
    const hasFilter = selectedLanguages.size > 0

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
        <div className="BlogFilter">
            <Stack.Horizontal gap="32" className="BlogFilter__languages" wrap>
                {Object.keys(languageGroups).map((groupName) => (
                    <Stack.Vertical key={groupName} className="BlogFilter__groups">
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
                                        className={isActive ? '' : 'BlogFilter__pill--dimmed'}
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
            <Section title="Sort by" expandable defaultOpen={false}>
                <Stack.Horizontal gap="32" wrap>
                    <Pill
                        label="Most Relevant"
                        color={sortedBy === 'mostRelevant' ? 'accent' : 'gray'}
                        onClick={() => onSortBy('mostRelevant')}
                    />
                    <Pill
                        label="Newest"
                        color={sortedBy === 'newest' ? 'accent' : 'gray'}
                        onClick={() => onSortBy('newest')}
                    />
                    <Pill
                        label="Oldest"
                        color={sortedBy === 'oldest' ? 'accent' : 'gray'}
                        onClick={() => onSortBy('oldest')}
                    />
                    <Pill
                        label="Most Liked"
                        color={sortedBy === 'mostLiked' ? 'accent' : 'gray'}
                        onClick={() => onSortBy('mostLiked')}
                    />
                    <Pill
                        label="Most Visited"
                        color={sortedBy === 'mostVisited' ? 'accent' : 'gray'}
                        onClick={() => onSortBy('mostVisited')}
                    />
                </Stack.Horizontal>
            </Section>
            <Spacer size="16" />
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
