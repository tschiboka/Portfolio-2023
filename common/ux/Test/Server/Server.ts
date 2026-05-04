import { setupServer } from 'msw/node'
import { RequestHandler } from 'msw'

export const server = setupServer()

export const useHandlers = (...handlers: RequestHandler[]) => {
    server.use(...handlers)
}
