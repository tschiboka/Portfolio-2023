// Website Pages
import Home from '../components/pages/Home/Home'
import About from '../components/pages/About/About'
import Projects from '../components/pages/Projects/Projects'
import Blog from '../components/pages/Blog/Blog'
import Contact from '../components/pages/Contact/Contact'
import PrivacyPolicy from '../components/pages/PrivacyPolicy/PrivacyPolicy'
// Blog Article Pages
import RiffMaster from '../articles/RiffMaster/RiffMaster'
import JsDateValidation from '../articles/JsDateValidation/JsDateValidation'
import SoundsWithHowler from '../articles/SoundsWithHowler/SoundsWithHowler'
import JsSorting from '../articles/JsSorting/JsSorting'
import GreenRooftop from '../articles/GreenRooftop/GreenRooftop'
import CyclicEmailScheduling from '../articles/CyclicEmailScheduling/CyclicEmailScheduling'
import ReactAnatomy from '../articles/ReactAnatomy/RactAnatomy'
import GitCheatsheet from '../articles/GitCheatsheet/GitCheatsheet'
import Maybe from '../articles/Maybe/Maybe'
import HookPattern from '../articles/HookPattern/HookPattern'
import { Clock } from '../components/sharedComponents/Clock/Clock'

export const PortfolioRoutes = [
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
        element: <PrivacyPolicy pageName="privacy-policy" path="/privacy-policy" />,
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
        element: <SoundsWithHowler pageName="sounds-with-howler" path="/blog/sounds-with-howler" />,
    },
    {
        path: '/blog/js-date-validation',
        element: <JsDateValidation pageName="js-date-validation" path="/blog/js-date-validation" />,
    },
    {
        path: '/blog/js-sorting',
        element: <JsSorting pageName="js-sorting" path="/blog/js-sorting" />,
    },
    {
        path: '/blog/green-rooftop',
        element: <GreenRooftop pageName="green-rooftop" path="/blog/green-rooftop" />,
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
        element: <ReactAnatomy pageName="brief-react-anatomy" path="/blog/brief-react-anatomy" />,
    },
    {
        path: '/blog/git-cheatsheet',
        element: <GitCheatsheet pageName="git-cheatsheet" path="/blog/git-cheatsheet" />,
    },
    {
        path: '/blog/maybe',
        element: <Maybe pageName="maybe" path="/blog/maybe" />,
    },
    {
        path: '/blog/hook-pattern',
        element: <HookPattern pageName="hook-pattern" path="/blog/hook-pattern" />,
    },
    {
        path: '/clock',
        element: <Clock />,
    },
]
