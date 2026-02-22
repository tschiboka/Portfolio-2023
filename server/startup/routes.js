// Routes
const index = require('../routes/index')
const message = require('../routes/message')
const visit = require('../routes/visit')
const like = require('../routes/like')
const schedule = require('../routes/schedule')
const settings = require('../routes/settings')
const user = require('../routes/user')
const login = require('../routes/login')
const confirm = require('../routes/confirm')
const log = require('../routes/log')
const category = require('../routes/category')
const session = require('../routes/session')
const xmas2025 = require('../projects/xmas_2025/routes')
const typist = require('../projects/typist/routes')
const word_duel_arena_level = require('../projects/word_duel_arena/transport/http/routes/level')
const word_duel_arena_words = require('../projects/word_duel_arena/transport/http/routes/word')

module.exports = function (app) {
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
