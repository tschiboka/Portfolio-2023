import { Application } from 'express'
import { XmasRouter } from './Xmas'
import { TypistRouter } from './Typist'
import { GymRouter } from './Gym'
import { LevelRouter } from './WordDuelArena/transport/http/routes/Level.router'
import { WordRouter } from './WordDuelArena/transport/http/routes/Word.router'

export const ProjectsRoutes = {
    register: (app: Application) => {
        app.use('/projects/xmas_2025', XmasRouter)
        app.use('/projects/typist', TypistRouter)
        app.use('/projects/gym', GymRouter)
        app.use('/projects/word_duel_arena/level', LevelRouter)
        app.use('/projects/word_duel_arena/word', WordRouter)
    },
}
