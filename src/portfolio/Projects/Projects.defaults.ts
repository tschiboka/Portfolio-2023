import { ProjectType } from '.'

// Set the filter to 'featured' to switch this page to a portfolio
const defaultFilter = 'all'

const typeDisplayNames: Record<ProjectType, string> = {
    featured: 'Featured',
    complete: 'Complete',
    inProgress: 'In Progress',
    archived: 'Archived',
}

export const ProjectsDefaults = { defaultFilter, typeDisplayNames }
