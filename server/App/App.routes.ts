import { Application } from 'express'
import { ServiceHealthRouter } from '../ServiceHealth'
import { XmasRouter } from '../projects/Xmas'
import { TypistRouter } from '../projects/Typist'
import { gymRouter } from '../projects/Gym'
import { SettingsRouter } from '../Settings'
import { UsersRouter } from '../Users'
import { CategoryRouter } from '../Category'
import { MessageRouter } from '../Message'
import { VisitRouter } from '../Visit'
import { LikeRouter } from '../Like'
import { LogRouter } from '../Log'
import { ActivityRouter } from '../Activity'
import { BreakdownRouter } from '../Breakdown'
import { ScheduleRouter } from '../Schedule'
import word_duel_arena_level from '../projects/WordDuelArena/transport/http/routes/level'
import word_duel_arena_words from '../projects/WordDuelArena/transport/http/routes/word'

export const AppRoutes = {
    register: (app: Application) => {
        // Profile website routes
        app.use('/', ServiceHealthRouter)
        app.use('/api/message', MessageRouter)
        app.use('/api/visit', VisitRouter)
        app.use('/api/like', LikeRouter)
        app.use('/api/schedule', ScheduleRouter)
        app.use('/api/breakdowns', BreakdownRouter)
        app.use('/api/activity', ActivityRouter)

        // App routes
        app.use('/api/settings', SettingsRouter)
        app.use('/api/user', UsersRouter)
        app.use('/api/log', LogRouter)
        app.use('/api/categories', CategoryRouter)

        // Project routes
        app.use('/projects/xmas_2025', XmasRouter)
        app.use('/projects/typist', TypistRouter)
        app.use('/projects/gym', gymRouter)
        app.use('/projects/word_duel_arena/level', word_duel_arena_level)
        app.use('/projects/word_duel_arena/word', word_duel_arena_words)
    },
}
