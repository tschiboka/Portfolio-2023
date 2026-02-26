import 'express-async-errors'
import http from 'http'
import express from 'express'
import cors from 'cors'
import error from './middlewares/error'
import setupRoutes from './startup/routes'
import setupDb from './startup/db'
import setupValidation from './startup/validation'
import setupProd from './startup/prod'
import setupWs from './projects/word_duel_arena/transport/ws'

const app = express()

app.use(express.json())
app.use(
    express.json({
        type: ['application/json', 'text/plain'],
    }),
)

// Cross-Origin Shared Resources
const allowAllOrigin = true
app.use(
    cors({
        methods: 'GET, POST, PUT, DELETE',
        origin: allowAllOrigin ? '*' : ['https://tschiboka.com'],
    }),
)

setupRoutes(app)
setupDb()
setupValidation()
setupProd(app)

app.use(error)

const server = http.createServer(app)
setupWs(server)

const PORT = process.env.PORT || 5000

server.listen(PORT, () => console.log(`Listening on ${PORT}`))
