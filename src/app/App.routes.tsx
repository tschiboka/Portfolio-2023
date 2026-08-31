import { Login } from './Login/Login'
import { Home } from './Home/Home'
import { Register } from './Register/Register'
import { EmailVerification } from './EmailVerification/EmailVerification'
import { Stats } from './Stats/Stats'
import { AddRecords } from './Record/AddRecords/AddRecords'
import { ViewRecord } from './Record/ViewRecord'
import { UpdateRecords } from './Record/UpdateRecords'
import { Remote } from './Remote/Remote'
import { Tasks } from './Tasks/Tasks'
import { Activities } from './Activities/Activities'
import { Events } from './Events/Events'
import { User } from './User/User'
import { Admin } from './Admin/Admin'
import { Logout } from './Logout/Logout'
import { Categories } from './Categories/Categories'
import {
    UxStories,
    AccessGuards,
    Buttons,
    CodeBlocks,
    Figures,
    Forms,
    Layouts,
    Links,
    LoadingIndicators,
    Pills,
    Regions,
    Tables,
    Overlays,
    TestAccessor,
    Toggles,
    TypographyStory,
} from './UxStories'
import { ReactElement } from 'react'
import type { Dictionary } from '@common-utils'

export type AppRoute = {
    name?: string
    path: string
    element: ReactElement
}

export const AppRoutes: Dictionary<AppRoute> = {
    Login: {
        name: 'Login',
        path: '/api/login',
        element: <Login path="/api/login" pageName="login" />,
    },
    Register: {
        name: 'Register',
        path: '/api/register',
        element: <Register path="/api/register" pageName="register" />,
    },
    Home: {
        name: 'Home',
        path: '/api/home',
        element: <Home path="/api/home" />,
    },
    EmailVerification: {
        name: 'Email Verification',
        path: '/api/email-verification/:verificationToken',
        element: <EmailVerification path="/api/email-verification" />,
    },
    Stats: {
        name: 'Stats',
        path: '/api/stats',
        element: <Stats path="/api/stats" />,
    },
    ViewRecord: {
        name: 'View Records',
        path: '/api/view-records',
        element: <ViewRecord path="/api/view-records" />,
    },
    AddRecords: {
        name: 'Add Records',
        path: '/api/add-records',
        element: <AddRecords path="/api/add-records" />,
    },
    UpdateRecords: {
        name: 'Update Records',
        path: '/api/update-records',
        element: <UpdateRecords path="/api/update-records" />,
    },
    Remote: {
        name: 'Remote',
        path: '/api/remote',
        element: <Remote path="/api/remote" />,
    },
    Tasks: {
        name: 'Tasks',
        path: '/api/tasks',
        element: <Tasks path="/api/tasks" />,
    },
    Activities: {
        name: 'Activities',
        path: '/api/activities',
        element: <Activities path="/api/activities" />,
    },
    Events: {
        name: 'Events',
        path: '/api/events',
        element: <Events path="/api/events" />,
    },
    Categories: {
        name: 'Categories',
        path: '/api/categories',
        element: <Categories path="/api/categories" />,
    },
    User: {
        name: 'User',
        path: '/api/user',
        element: <User path="/api/user" />,
    },
    Admin: {
        name: 'Admin',
        path: '/api/admin',
        element: <Admin path="/api/admin" />,
    },
    Logout: {
        name: 'Logout',
        path: '/api/logout',
        element: <Logout />,
    },
    UxStories: {
        name: 'Ux Stories',
        path: '/api/ux-stories',
        element: <UxStories path="/api/ux-stories" />,
    },
    AccessGuards: {
        name: 'Access Guards',
        path: '/api/ux-stories/access-guards',
        element: <AccessGuards path="/api/ux-stories/access-guards" />,
    },
    Buttons: {
        name: 'Buttons',
        path: '/api/ux-stories/buttons',
        element: <Buttons path="/api/ux-stories/buttons" />,
    },
    CodeBlocks: {
        name: 'Code Blocks',
        path: '/api/ux-stories/code-blocks',
        element: <CodeBlocks path="/api/ux-stories/code-blocks" />,
    },
    Figures: {
        name: 'Figures',
        path: '/api/ux-stories/figures',
        element: <Figures path="/api/ux-stories/figures" />,
    },
    Forms: {
        name: 'Forms',
        path: '/api/ux-stories/forms',
        element: <Forms path="/api/ux-stories/forms" />,
    },
    Layouts: {
        name: 'Layouts',
        path: '/api/ux-stories/layouts',
        element: <Layouts path="/api/ux-stories/layouts" />,
    },
    Links: {
        name: 'Links',
        path: '/api/ux-stories/links',
        element: <Links path="/api/ux-stories/links" />,
    },
    LoadingIndicators: {
        name: 'Loading Indicators',
        path: '/api/ux-stories/loading-indicators',
        element: <LoadingIndicators path="/api/ux-stories/loading-indicators" />,
    },
    Overlays: {
        name: 'Overlays',
        path: '/api/ux-stories/overlays',
        element: <Overlays path="/api/ux-stories/overlays" />,
    },
    Pills: {
        name: 'Pills',
        path: '/api/ux-stories/pills',
        element: <Pills path="/api/ux-stories/pills" />,
    },
    Regions: {
        name: 'Regions',
        path: '/api/ux-stories/regions',
        element: <Regions path="/api/ux-stories/regions" />,
    },
    Tables: {
        name: 'Tables',
        path: '/api/ux-stories/tables',
        element: <Tables path="/api/ux-stories/tables" />,
    },
    TestAccessor: {
        name: 'Test Accessor',
        path: '/api/ux-stories/test-accessor',
        element: <TestAccessor path="/api/ux-stories/test-accessor" />,
    },
    Toggles: {
        name: 'Toggles',
        path: '/api/ux-stories/toggles',
        element: <Toggles path="/api/ux-stories/toggles" />,
    },
    Typography: {
        name: 'Typography',
        path: '/api/ux-stories/typography',
        element: <TypographyStory path="/api/ux-stories/typography" />,
    },
}

export const AppRoutesList: AppRoute[] = Object.values<AppRoute>(AppRoutes)
