import { ReactNode } from 'react'

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
