import { createHashRouter } from 'react-router-dom'
// Main Site Structure
import Home from '../components/pages/Home/Home'
import About from '../components/pages/About/About'
import Projects from '../components/pages/Projects/Projects'
import Blog from '../components/pages/Blog/Blog'
import Contact from '../components/pages/Contact/Contact'
import PrivacyPolicy from '../components/pages/PrivacyPolicy/PrivacyPolicy'
import RouteError from '../components/sharedComponents/RouteError/RouteError'
// App
import Login from '../components/pages/Login/Login'
// Blog Articles
import RiffMaster from '../components/articles/RiffMaster/RiffMaster'
import JsDateValidation from '../components/articles/JsDateValidation/JsDateValidation'
import SoundsWithHowler from '../components/articles/SoundsWithHowler/SoundsWithHowler'
import JsSorting from '../components/articles/JsSorting/JsSorting'
import GreenRooftop from '../components/articles/GreenRooftop/GreenRooftop'
import CyclicEmailScheduling from '../components/articles/CyclicEmailScheduling/CyclicEmailScheduling'
import ReactAnatomy from '../components/articles/ReactAnatomy/RactAnatomy'
import GitCheatsheet from '../components/articles/GitCheatsheet/GitCheatsheet'

export const routes = [
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
    {
        path: '/login',
        element: <Login pageName="login" path="/login" />,
    },
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
        path: '/*',
        element: <RouteError />,
    },
]

const router = createHashRouter(routes)

export default router
