import http from 'http'
import { App, AppConstants } from './App'
import { ApiMessage } from '../common/utils/Server'
import setupWs from './projects/WordDuelArena/transport/ws'
;(async () => {
    const app = await App.start()
    const server = http.createServer(app)
    setupWs(server)

    const PORT = process.env.PORT || AppConstants.defaultPort
    server.listen(PORT, () => console.log(ApiMessage.listening(PORT)))
})()
