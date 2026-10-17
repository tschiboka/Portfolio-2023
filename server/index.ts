import http from 'http'
import { App, AppConstants, AppRoutes } from './App'
import { initWebSocket } from './projects/WordDuelArena/transport/ws'
import { ProjectsRoutes } from './projects'
import { ApiMessage } from '../common/utils/Messages'
;(async () => {
    const app = await App.start()
    AppRoutes.register(app)
    ProjectsRoutes.register(app)
    const server = http.createServer(app)
    await initWebSocket(server)

    const PORT = process.env.PORT || AppConstants.defaultPort
    server.listen(PORT, () => console.log(ApiMessage.listening(PORT)))
})().catch((error) => console.error(error))
