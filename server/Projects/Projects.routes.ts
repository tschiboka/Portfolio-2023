import { Application } from 'express'
import { XmasRouter } from './Xmas'
import { TypistRouter } from './Typist'
import { GymRouter } from './Gym'
import word_duel_arena_level from './WordDuelArena/transport/http/routes/level'
import word_duel_arena_words from './WordDuelArena/transport/http/routes/word'

export const ProjectsRoutes = {
    register: (app: Application) => {
        app.use('/projects/xmas_2025', XmasRouter)
        app.use('/projects/typist', TypistRouter)
        app.use('/projects/gym', GymRouter)
        app.use('/projects/word_duel_arena/level', word_duel_arena_level)
        app.use('/projects/word_duel_arena/word', word_duel_arena_words)
    },
}
