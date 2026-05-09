import Login from '../components/pages/API/Login/Login'
import Index from '../components/pages/API/Index/Index'
import Register from '../components/pages/API/Register/Register'
import EmailVerification from '../components/pages/API/EmailVerification/EmailVerification'
import Stats from '../components/pages/API/Stats/Stats'
import AddRecord from '../components/pages/API/Record/AddRecords/AddRecords'
import ViewRecords from '../components/pages/API/Record/ViewRecord'
import UpdateRecords from '../components/pages/API/Record/UpdateRecords'
import Remote from '../components/pages/API/Remote/Remote'
import Tasks from '../components/pages/API/Tasks/Tasks'
import Activities from '../components/pages/API/Activities/Activities'
import Events from '../components/pages/API/Events/Events'
import User from '../components/pages/API/User/User'
import Admin from '../components/pages/API/Admin/Admin'
import Logout from '../components/pages/API/Logout/Logout'
import Categories from '../components/pages/API/Categories/Categories'
import {
    UxStories,
    AccessGuards,
    CodeBlocks,
    Forms,
    NavStory,
    Pills,
    Stacks,
    Tables,
    Overlays,
    TestAccessor,
} from '../components/pages/API/UxStories'
import { ReactElement } from 'react'

export type ApiRoute = {
    name?: string
    path: string
    element: ReactElement
}

export const ApiRoutes = {
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
    Index: {
        name: 'Index',
        path: '/api/index',
        element: <Index path="/api/index" pageName="index" />,
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
    ViewRecords: {
        name: 'View Records',
        path: '/api/view-records',
        element: <ViewRecords path="/api/view-records" />,
    },
    AddRecords: {
        name: 'Add Records',
        path: '/api/add-records',
        element: <AddRecord path="/api/add-records" />,
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
    CodeBlocks: {
        name: 'Code Blocks',
        path: '/api/ux-stories/code-blocks',
        element: <CodeBlocks path="/api/ux-stories/code-blocks" />,
    },
    Forms: {
        name: 'Forms',
        path: '/api/ux-stories/forms',
        element: <Forms path="/api/ux-stories/forms" />,
    },
    NavStory: {
        name: 'Nav Story',
        path: '/api/ux-stories/nav',
        element: <NavStory path="/api/ux-stories/nav" />,
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
    Stacks: {
        name: 'Stacks',
        path: '/api/ux-stories/stacks',
        element: <Stacks path="/api/ux-stories/stacks" />,
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
} satisfies Record<string, ApiRoute>

export const ApiRoutesList: ApiRoute[] = Object.values(ApiRoutes)
