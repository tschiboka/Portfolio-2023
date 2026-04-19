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
import { UxStories, AccessGuards, Tables, Overlays } from '../components/pages/API/UxStories'

export const ApiRoutes = [
    {
        path: '/api/login',
        element: <Login path="/api/login" pageName="login" />,
    },
    {
        path: '/api/register',
        element: <Register path="/api/register" />,
    },
    {
        path: '/api/index',
        element: <Index path="/api/index" pageName="index" />,
    },
    {
        path: '/api/email-verification/:verificationToken',
        element: <EmailVerification path="/api/email-verification" />,
    },
    {
        path: '/api/stats',
        element: <Stats path="/api/stats" />,
    },
    {
        path: '/api/view-records',
        element: <ViewRecords path="/api/view-records" />,
    },
    {
        path: '/api/add-records',
        element: <AddRecord path="/api/add-records" />,
    },
    {
        path: '/api/update-records',
        element: <UpdateRecords path="/api/update-records" />,
    },
    {
        path: '/api/remote',
        element: <Remote path="/api/remote" />,
    },
    {
        path: '/api/tasks',
        element: <Tasks path="/api/tasks" />,
    },
    {
        path: '/api/activities',
        element: <Activities path="/api/activities" />,
    },
    {
        path: '/api/events',
        element: <Events path="/api/events" />,
    },
    {
        path: '/api/categories',
        element: <Categories path="/api/categories" />,
    },
    {
        path: '/api/user',
        element: <User path="/api/user" />,
    },
    {
        path: '/api/admin',
        element: <Admin path="/api/admin" />,
    },
    {
        path: '/api/logout',
        element: <Logout />,
    },
    {
        path: '/api/ux-stories',
        element: <UxStories path="/api/ux-stories" />,
    },
    {
        path: '/api/ux-stories/access-guards',
        element: <AccessGuards path="/api/ux-stories/access-guards" />,
    },
    {
        path: '/api/ux-stories/overlays',
        element: <Overlays path="/api/ux-stories/overlays" />,
    },
    {
        path: '/api/ux-stories/tables',
        element: <Tables path="/api/ux-stories/tables" />,
    },
]
