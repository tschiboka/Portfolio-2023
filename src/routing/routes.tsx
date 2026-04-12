import { createHashRouter } from 'react-router-dom'
import RouteError from '../components/sharedComponents/RouteError/RouteError'
import { ApiRoutes } from './ApiRoutes'
import { ProjectRoutes } from './ProjectRoutes'
import { PortfolioRoutes } from './PortfolioRoutes'

export const routes = [
    ...PortfolioRoutes,
    ...ProjectRoutes,
    ...ApiRoutes,
    {
        path: '/*',
        element: <RouteError />,
    },
]

const router = createHashRouter(routes)

export default router
