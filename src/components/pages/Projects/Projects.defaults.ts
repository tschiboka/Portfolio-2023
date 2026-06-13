import { ProjectType } from '.'

export const DEFAULT_PROJECT_FILTER = 'all' // Set this to featured if you wanna switch to portfolio

export const ProjectTypeDisplayNames: Record<ProjectType, string> = {
    featured: 'Featured',
    complete: 'Complete',
    inProgress: 'In Progress',
    archived: 'Archived',
}
