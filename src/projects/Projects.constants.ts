import { lazy } from 'react'
import { Xmas2025 } from './Xmas2025/Xmas2025'
import { WordDuelArena } from './WordDuelArena/WordDuelArena'
import { Session } from './WordDuelArena/Session/Session'
import { Typist } from './Typist/Typist'
import { Gym } from './Gym/Gym'
import type { Dictionary } from '@common-utils'
import type { ProjectRouteConfig } from './Projects.types'

const LevelCreator = lazy(() =>
    import('./WordDuelArena/LevelCreator/LevelCreator').then((module) => ({
        default: module.LevelCreator,
    })),
)

export const ProjectRouteConfigs: Dictionary<ProjectRouteConfig> = {
    Xmas2025: {
        path: '/projects/xmas2025',
        Component: Xmas2025,
    },
    Typist: {
        path: '/projects/typist',
        Component: Typist,
        props: { pageName: 'typist', path: '/projects/typist' },
    },
    WordDuelArena: {
        path: '/projects/word-duel-arena',
        Component: WordDuelArena,
    },
    Session: {
        path: '/projects/word-duel-arena/session/:sessionId',
        Component: Session,
    },
    LevelCreator: {
        path: '/projects/wda-level-creator',
        Component: LevelCreator,
        fallback: true,
    },
    Gym: {
        path: '/projects/gym',
        Component: Gym,
        props: { path: '/projects/gym' },
    },
}
