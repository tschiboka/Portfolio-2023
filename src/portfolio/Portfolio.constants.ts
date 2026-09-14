import { Home } from './Home/Home'
import { About } from './About/About'
import { Projects } from './Projects/Projects'
import { Blog } from './Blog/Blog'
import { Contact } from './Contact/Contact'
import { PrivacyPolicy } from './PrivacyPolicy/PrivacyPolicy'
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
import type { Dictionary } from '@common-utils'
import type { PortfolioRouteConfig } from './Portfolio.types'

export const PortfolioRouteConfigs: Dictionary<PortfolioRouteConfig> = {
    Home: {
        path: '/',
        Component: Home,
        props: { pageName: 'Home', path: '/' },
    },
    About: {
        path: '/about',
        Component: About,
        props: { pageName: 'About', path: '/about' },
    },
    Projects: {
        path: '/projects',
        Component: Projects,
        props: { pageName: 'Projects', path: '/projects' },
    },
    Blog: {
        path: '/blog',
        Component: Blog,
        props: { pageName: 'Blog', path: '/blog' },
    },
    Contact: {
        path: '/contact',
        Component: Contact,
        props: { pageName: 'Contact', path: '/contact' },
    },
    PrivacyPolicy: {
        path: '/privacy-policy',
        Component: PrivacyPolicy,
        props: { pageName: 'privacy-policy', path: '/privacy-policy' },
    },
    RiffMaster: {
        path: '/blog/riffmaster',
        Component: RiffMaster,
        props: { pageName: 'riffmaster', path: '/blog/riffmaster' },
    },
    SoundsWithHowler: {
        path: '/blog/sounds-with-howler',
        Component: SoundsWithHowler,
        props: { pageName: 'sounds-with-howler', path: '/blog/sounds-with-howler' },
    },
    JsDateValidation: {
        path: '/blog/js-date-validation',
        Component: JsDateValidation,
        props: { pageName: 'js-date-validation', path: '/blog/js-date-validation' },
    },
    JsSorting: {
        path: '/blog/js-sorting',
        Component: JsSorting,
        props: { pageName: 'js-sorting', path: '/blog/js-sorting' },
    },
    GreenRooftop: {
        path: '/blog/green-rooftop',
        Component: GreenRooftop,
        props: { pageName: 'green-rooftop', path: '/blog/green-rooftop' },
    },
    CyclicEmailScheduling: {
        path: '/blog/cyclic-email-scheduling',
        Component: CyclicEmailScheduling,
        props: { pageName: 'cyclic-email-scheduling', path: '/blog/cyclic-email-scheduling' },
    },
    ReactAnatomy: {
        path: '/blog/brief-react-anatomy',
        Component: ReactAnatomy,
        props: { pageName: 'brief-react-anatomy', path: '/blog/brief-react-anatomy' },
    },
    GitCheatsheet: {
        path: '/blog/git-cheatsheet',
        Component: GitCheatsheet,
        props: { pageName: 'git-cheatsheet', path: '/blog/git-cheatsheet' },
    },
    Maybe: {
        path: '/blog/maybe',
        Component: Maybe,
        props: { pageName: 'maybe', path: '/blog/maybe' },
    },
    HookPattern: {
        path: '/blog/hook-pattern',
        Component: HookPattern,
        props: { pageName: 'hook-pattern', path: '/blog/hook-pattern' },
    },
    StoppingTestEntropy: {
        path: '/blog/stopping-test-entropy',
        Component: StoppingTestEntropy,
        props: { pageName: 'stopping-test-entropy', path: '/blog/stopping-test-entropy' },
    },
    DailyAnalyticsEmail: {
        path: '/blog/daily-analytics-email',
        Component: DailyAnalyticsEmail,
        props: { pageName: 'daily-analytics-email', path: '/blog/daily-analytics-email' },
    },
    ZIndexLayers: {
        path: '/blog/z-index-layers',
        Component: ZIndexLayers,
        props: { pageName: 'z-index-layers', path: '/blog/z-index-layers' },
    },
    Clock: {
        path: '/clock',
        Component: Clock,
    },
}
