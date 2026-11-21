import { Application } from 'express'
import { XmasRouter } from './Xmas'
import { TypistRouter } from './Typist'
import { GymRouter } from './Gym'
import { LevelRouter, WordRouter } from './WordDuelArena/transport/http/routes'

export const ProjectsRoutes = {
    register: (app: Application) => {
        app.use('/projects/xmas_2025', XmasRouter)
        app.use('/projects/typist', TypistRouter)
        app.use('/projects/gym', GymRouter)
        app.use('/projects/word_duel_arena/level', LevelRouter)
        app.use('/projects/word_duel_arena/word', WordRouter)
    },
}
