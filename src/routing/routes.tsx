import { createHashRouter } from 'react-router-dom'
// Website Pages
import Home from '../components/pages/Home/Home'
import About from '../components/pages/About/About'
import Projects from '../components/pages/Projects/Projects'
import Blog from '../components/pages/Blog/Blog'
import Contact from '../components/pages/Contact/Contact'
import PrivacyPolicy from '../components/pages/PrivacyPolicy/PrivacyPolicy'
import RouteError from '../components/sharedComponents/RouteError/RouteError'
// Blog Article Pages
import RiffMaster from '../components/articles/RiffMaster/RiffMaster'
import JsDateValidation from '../components/articles/JsDateValidation/JsDateValidation'
import SoundsWithHowler from '../components/articles/SoundsWithHowler/SoundsWithHowler'
import JsSorting from '../components/articles/JsSorting/JsSorting'
import GreenRooftop from '../components/articles/GreenRooftop/GreenRooftop'
import CyclicEmailScheduling from '../components/articles/CyclicEmailScheduling/CyclicEmailScheduling'
import ReactAnatomy from '../components/articles/ReactAnatomy/RactAnatomy'
import GitCheatsheet from '../components/articles/GitCheatsheet/GitCheatsheet'
import Maybe from '../components/articles/Maybe/Maybe'
import HookPattern from '../components/articles/HookPattern/HookPattern'
// App Pages
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
import { Clock } from '../components/sharedComponents/Clock/Clock'
// Misc Pages
import Xmas2025 from '../components/pages/Misc/Xmas2025/Xmas2025'

export const routes = [
    // Website Pages
    {
        path: '/',
        element: <Home pageName="home" path="/" />,
    },
    {
        path: '/about',
        element: <About pageName="about" path="/about" />,
    },
    {
        path: '/projects',
        element: <Projects pageName="projects" path="/projects" />,
    },
    {
        path: '/contact',
        element: <Contact pageName="contact" path="/contact" />,
    },
    {
        path: '/privacy-policy',
        element: (
            <PrivacyPolicy pageName="privacy-policy" path="/privacy-policy" />
        ),
    },
    {
        path: '/blog',
        element: <Blog pageName="blog" path="/blog" />,
    },
    // Blog Article Pages
    {
        path: '/blog/riffmaster',
        element: <RiffMaster pageName="riffmaster" path="/blog/riffmaster" />,
    },
    {
        path: '/blog/sounds-with-howler',
        element: (
            <SoundsWithHowler
                pageName="sounds-with-howler"
                path="/blog/sounds-with-howler"
            />
        ),
    },
    {
        path: '/blog/js-date-validation',
        element: (
            <JsDateValidation
                pageName="js-date-validation"
                path="/blog/js-date-validation"
            />
        ),
    },
    {
        path: '/blog/js-sorting',
        element: <JsSorting pageName="js-sorting" path="/blog/js-sorting" />,
    },
    {
        path: '/blog/green-rooftop',
        element: (
            <GreenRooftop pageName="green-rooftop" path="/blog/green-rooftop" />
        ),
    },
    {
        path: '/blog/cyclic-email-scheduling',
        element: (
            <CyclicEmailScheduling
                pageName="cyclic-email-scheduling"
                path="/blog/cyclic-email-scheduling"
            />
        ),
    },
    {
        path: '/blog/brief-react-anatomy',
        element: (
            <ReactAnatomy
                pageName="brief-react-anatomy"
                path="/blog/brief-react-anatomy"
            />
        ),
    },
    {
        path: '/blog/git-cheatsheet',
        element: (
            <GitCheatsheet
                pageName="git-cheatsheet"
                path="/blog/git-cheatsheet"
            />
        ),
    },
    {
        path: '/blog/maybe',
        element: <Maybe pageName="maybe" path="/blog/maybe" />,
    },
    {
        path: '/blog/hook-pattern',
        element: (
            <HookPattern pageName="hook-pattern" path="/blog/hook-pattern" />
        ),
    },
    {
        path: '/clock',
        element: <Clock />,
    },

    // API Routes
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
    // Misc Pages (Side projects, etc.)
    {
        path: '/projects/xmas2025',
        element: <Xmas2025 pageName="xmas2025" path="/projects/xmas2025" />,
    },
    // Error
    {
        path: '/*',
        element: <RouteError />,
    },
]

const router = createHashRouter(routes)

export default router
