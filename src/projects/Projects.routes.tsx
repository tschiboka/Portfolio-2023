import { Xmas2025 } from './Xmas2025/Xmas2025'
import { WordDuelArena } from './WordDuelArena/WordDuelArena'
import { Session } from './WordDuelArena/Session/Session'
import { lazy, Suspense } from 'react'
import { Typist } from './Typist/Typist'
import { Gym } from './Gym/Gym'
import type { ReactElement } from 'react'
import type { Dictionary } from '@common-utils'

const LevelCreator = lazy(() =>
    import('./WordDuelArena/LevelCreator/LevelCreator').then((module) => ({
        default: module.LevelCreator,
    })),
)

export type ProjectRoute = {
    path: string
    element: ReactElement
}

export const ProjectRoutes: Dictionary<ProjectRoute> = {
    Xmas2025: {
        path: '/projects/xmas2025',
        element: <Xmas2025 />,
    },
    Typist: {
        path: '/projects/typist',
        element: <Typist pageName="typist" path="/projects/typist" />,
    },
    WordDuelArena: {
        path: '/projects/word-duel-arena',
        element: <WordDuelArena />,
    },
    Session: {
        path: '/projects/word-duel-arena/session/:sessionId',
        element: <Session />,
    },
    LevelCreator: {
        path: '/projects/wda-level-creator',
        element: (
            <Suspense fallback={<div>Loading...</div>}>
                <LevelCreator />
            </Suspense>
        ),
    },
    Gym: {
        path: '/projects/gym',
        element: <Gym path="/projects/gym" />,
    },
}

export const ProjectRoutesList: ProjectRoute[] = Object.values(ProjectRoutes)
