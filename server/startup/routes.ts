// Routes
import { Application } from 'express'
import index from '../routes/index'
import message from '../routes/message'
import visit from '../routes/visit'
import like from '../routes/like'
import schedule from '../routes/schedule'
import settings from '../routes/settings'
import user from '../routes/user'
import login from '../routes/login'
import confirm from '../routes/confirm'
import log from '../routes/log'
import category from '../routes/category'
import session from '../routes/session'
import xmas2025 from '../projects/xmas_2025/routes'
import typist from '../projects/typist/routes'
import word_duel_arena_level from '../projects/word_duel_arena/transport/http/routes/level'
import word_duel_arena_words from '../projects/word_duel_arena/transport/http/routes/word'

export default function (app: Application) {
    // Profile website routes
    app.use('/', index)
    app.use('/message', message)
    app.use('/visit', visit)
    app.use('/like', like)
    app.use('/api/session', session)
    app.use('/schedule', schedule)

    // API routes
    app.use('/api/settings', settings)
    app.use('/api/user', user)
    app.use('/api/login', login)
    app.use('/api/confirm', confirm)
    app.use('/api/log', log)
    app.use('/api/categories', category)

    // Project routes
    app.use('/projects/xmas_2025', xmas2025)
    app.use('/projects/typist', typist)
    app.use('/projects/word_duel_arena/level', word_duel_arena_level)
    app.use('/projects/word_duel_arena/word', word_duel_arena_words)
}
