import { Suspense } from 'react'
import { ProjectsConfig } from './Projects.config'
import type { Dictionary } from '@common-utils'
import type { ProjectRoute, ProjectRouteConfig } from './Projects.types'

const buildElement = ({ Component, props, fallback }: ProjectRouteConfig) => {
    const element = <Component {...props} />

    return fallback ? <Suspense fallback={<div>Loading...</div>}>{element}</Suspense> : element
}

const ProjectRoutes: Dictionary<ProjectRoute> = Object.fromEntries(
    Object.entries(ProjectsConfig).map(([name, config]) => [
        name,
        { path: config.path, element: buildElement(config) },
    ]),
)

export const ProjectsRoutes: ProjectRoute[] = Object.values(ProjectRoutes)
