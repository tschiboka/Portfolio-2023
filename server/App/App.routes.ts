import { Application } from 'express'
import { ServiceHealthRouter } from './ServiceHealth'
import { SettingsRouter } from './Settings'
import { UsersRouter } from './Users'
import { CategoryRouter } from './Category'
import { MessageRouter } from './Message'
import { VisitRouter } from './Visit'
import { LikeRouter } from './Like'
import { LogRouter } from './Log'
import { ActivityRouter } from './Activity'
import { BreakdownRouter } from './Breakdown'
import { ScheduleRouter } from './Schedule'

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
    },
}
