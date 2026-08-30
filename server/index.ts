import http from 'http'
import { App, AppConstants, AppRoutes } from './App'
import { ProjectsRoutes } from './Projects'
import { ApiMessage } from '../common/utils/Server'
import setupWs from './Projects/WordDuelArena/transport/ws'
;(async () => {
    const app = await App.start()
    AppRoutes.register(app)
    ProjectsRoutes.register(app)
    const server = http.createServer(app)
    setupWs(server)

    const PORT = process.env.PORT || AppConstants.defaultPort
    server.listen(PORT, () => console.log(ApiMessage.listening(PORT)))
})()
