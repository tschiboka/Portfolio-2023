// Misc Pages
import Xmas2025 from '../components/pages/Misc/Xmas2025/Xmas2025'
import { WordDuelArena } from '../components/pages/Misc/WordDuelArena/WordDuelArena'
import { Session } from '../components/pages/Misc/WordDuelArena/Session/Session'
import { lazy } from 'react'
import { Typist } from '../components/pages/Misc/Typist/Typist'
import { Suspense } from 'react'

const LevelCreator = lazy(() =>
    import('../components/pages/Misc/WordDuelArena/LevelCreator/LevelCreator').then((module) => ({
        default: module.LevelCreator,
    })),
)

export const ProjectRoutes = [
    {
        path: '/projects/xmas2025',
        element: <Xmas2025 pageName="xmas2025" path="/projects/xmas2025" />,
    },
    {
        path: '/projects/typist',
        element: <Typist pageName="typist" path="/projects/typist" />,
    },
    {
        path: '/projects/word-duel-arena',
        element: <WordDuelArena />,
    },
    {
        path: '/projects/word-duel-arena/session/:sessionId',
        element: <Session />,
    },
    {
        path: '/projects/wda-level-creator',
        element: (
            <Suspense fallback={<div>Loading...</div>}>
                <LevelCreator />
            </Suspense>
        ),
    },
]
