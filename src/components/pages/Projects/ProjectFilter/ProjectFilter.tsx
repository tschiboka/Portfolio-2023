import { Pill, Overline, Text, Button, Inline } from '@common/ux'
import { getProjects, getColourName } from '../getProjects'
import './ProjectFilter.scss'

interface Props {
    selectedLanguages: Set<string>
    onToggle: (language: string) => void
    onClear: () => void
    totalCount: number
    filteredCount: number
}

const ProjectFilter = ({
    selectedLanguages,
    onToggle,
    onClear,
    totalCount,
    filteredCount,
}: Props) => {
    const projects = getProjects()
    const languagesSet = new Set<string>()
    projects.forEach((project) => project.badges.forEach((badge) => languagesSet.add(badge)))
    const languages = Array.from(languagesSet)
    const hasFilter = selectedLanguages.size > 0

    return (
        <div className="ProjectFilter">
            <div className="ProjectFilter__header">
                <Overline>Filter by technology</Overline>
                {hasFilter && (
                    <Inline gap={'12'} align="center">
                        <Text size="xs">
                            {filteredCount} of {totalCount} projects shown
                        </Text>
                        <Button variant="secondary" size="sm" onClick={onClear}>
                            Clear
                        </Button>
                    </Inline>
                )}
            </div>
            <div className="ProjectFilter__pills">
                {languages.map((badge) => {
                    const isActive = !hasFilter || selectedLanguages.has(badge)
                    return (
                        <Pill
                            key={badge}
                            label={badge}
                            color={getColourName(badge)}
                            variant="solid"
                            className={isActive ? '' : 'ProjectFilter__pill--dimmed'}
                            onClick={() => onToggle(badge)}
                            ariaLabel={`Filter by ${badge}`}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default ProjectFilter
