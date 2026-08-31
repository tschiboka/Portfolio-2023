// Portfolio Pages
import { Home } from './Home/Home'
import { About } from './About/About'
import { Projects } from './Projects/Projects'
import { Blog } from './Blog/Blog'
import { Contact } from './Contact/Contact'
import { PrivacyPolicy } from './PrivacyPolicy/PrivacyPolicy'
// Blog Article Pages
import {
    CyclicEmailScheduling,
    DailyAnalyticsEmail,
    GitCheatsheet,
    GreenRooftop,
    HookPattern,
    JsDateValidation,
    JsSorting,
    Maybe,
    ReactAnatomy,
    RiffMaster,
    SoundsWithHowler,
    StoppingTestEntropy,
    ZIndexLayers,
} from './Article'
import { Clock } from './Clock'
import type { ReactElement } from 'react'
import type { Dictionary } from '@common-utils'

export type PortfolioRoute = {
    path: string
    element: ReactElement
}

export const PortfolioRoutes: Dictionary<PortfolioRoute> = {
    Home: {
        path: '/',
        element: <Home pageName="Home" />,
    },
    About: {
        path: '/about',
        element: <About pageName="About" path="/about" />,
    },
    Projects: {
        path: '/projects',
        element: <Projects pageName="Projects" path="/projects" />,
    },
    Contact: {
        path: '/contact',
        element: <Contact pageName="Contact" path="/contact" />,
    },
    PrivacyPolicy: {
        path: '/privacy-policy',
        element: <PrivacyPolicy pageName="privacy-policy" path="/privacy-policy" />,
    },
    Blog: {
        path: '/blog',
        element: <Blog pageName="Blog" path="/blog" />,
    },
    // Blog Article Pages
    RiffMaster: {
        path: '/blog/riffmaster',
        element: <RiffMaster pageName="riffmaster" path="/blog/riffmaster" />,
    },
    SoundsWithHowler: {
        path: '/blog/sounds-with-howler',
        element: <SoundsWithHowler pageName="sounds-with-howler" path="/blog/sounds-with-howler" />,
    },
    JsDateValidation: {
        path: '/blog/js-date-validation',
        element: <JsDateValidation pageName="js-date-validation" path="/blog/js-date-validation" />,
    },
    JsSorting: {
        path: '/blog/js-sorting',
        element: <JsSorting pageName="js-sorting" path="/blog/js-sorting" />,
    },
    GreenRooftop: {
        path: '/blog/green-rooftop',
        element: <GreenRooftop pageName="green-rooftop" path="/blog/green-rooftop" />,
    },
    CyclicEmailScheduling: {
        path: '/blog/cyclic-email-scheduling',
        element: (
            <CyclicEmailScheduling
                pageName="cyclic-email-scheduling"
                path="/blog/cyclic-email-scheduling"
            />
        ),
    },
    ReactAnatomy: {
        path: '/blog/brief-react-anatomy',
        element: <ReactAnatomy pageName="brief-react-anatomy" path="/blog/brief-react-anatomy" />,
    },
    GitCheatsheet: {
        path: '/blog/git-cheatsheet',
        element: <GitCheatsheet pageName="git-cheatsheet" path="/blog/git-cheatsheet" />,
    },
    Maybe: {
        path: '/blog/maybe',
        element: <Maybe pageName="maybe" path="/blog/maybe" />,
    },
    HookPattern: {
        path: '/blog/hook-pattern',
        element: <HookPattern pageName="hook-pattern" path="/blog/hook-pattern" />,
    },
    StoppingTestEntropy: {
        path: '/blog/stopping-test-entropy',
        element: (
            <StoppingTestEntropy
                pageName="stopping-test-entropy"
                path="/blog/stopping-test-entropy"
            />
        ),
    },
    DailyAnalyticsEmail: {
        path: '/blog/daily-analytics-email',
        element: (
            <DailyAnalyticsEmail
                pageName="daily-analytics-email"
                path="/blog/daily-analytics-email"
            />
        ),
    },
    ZIndexLayers: {
        path: '/blog/z-index-layers',
        element: <ZIndexLayers pageName="z-index-layers" path="/blog/z-index-layers" />,
    },
    Clock: {
        path: '/clock',
        element: <Clock />,
    },
}

export const PortfolioRoutesList: PortfolioRoute[] = Object.values(PortfolioRoutes)
