import { Login } from './Login/Login'
import { Home } from './Home/Home'
import { Register } from './Register/Register'
import { Stats } from './Stats/Stats'
import { AddRecords } from './Record/components/AddRecords/AddRecords'
import { ViewRecord } from './Record/Record'
import { UpdateRecords } from './Record/components/UpdateRecords'
import { Remote } from './Remote/Remote'
import { Tasks } from './Tasks/Tasks'
import { Events } from './Events/Events'
import { User } from './User/User'
import { Logout } from './Logout/Logout'
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
import { Paths } from '@common-utils'
import { Activities, Admin, Categories, EmailVerification } from '@app'
import type { Dictionary } from '@common-utils'
import type { AppRouteConfig } from './App.types'

export const AppRouteConfigs: Dictionary<AppRouteConfig> = {
    Login: {
        name: 'Login',
        path: Paths.Client.Login,
        Component: Login,
        props: { path: Paths.Client.Login, pageName: 'login' },
    },
    Register: {
        name: 'Register',
        path: Paths.Client.Register,
        Component: Register,
        props: { path: Paths.Client.Register, pageName: 'register' },
    },
    Home: {
        name: 'Home',
        path: Paths.Client.Home,
        Component: Home,
        props: { path: Paths.Client.Home },
    },
    EmailVerification: {
        name: 'Email Verification',
        path: `${Paths.Client.EmailVerification}/:verificationToken`,
        Component: EmailVerification,
        props: { path: Paths.Client.EmailVerification },
    },
    Stats: {
        name: 'Stats',
        path: '/api/stats',
        Component: Stats,
        props: { path: '/api/stats' },
    },
    ViewRecord: {
        name: 'View Records',
        path: '/api/view-records',
        Component: ViewRecord,
        props: { path: '/api/view-records' },
    },
    AddRecords: {
        name: 'Add Records',
        path: '/api/add-records',
        Component: AddRecords,
        props: { path: '/api/add-records' },
    },
    UpdateRecords: {
        name: 'Update Records',
        path: '/api/update-records',
        Component: UpdateRecords,
        props: { path: '/api/update-records' },
    },
    Remote: {
        name: 'Remote',
        path: '/api/remote',
        Component: Remote,
        props: { path: '/api/remote' },
    },
    Tasks: {
        name: 'Tasks',
        path: '/api/tasks',
        Component: Tasks,
        props: { path: '/api/tasks' },
    },
    Activities: {
        name: 'Activities',
        path: '/api/activities',
        Component: Activities,
        props: { path: '/api/activities' },
    },
    Events: {
        name: 'Events',
        path: '/api/events',
        Component: Events,
        props: { path: '/api/events' },
    },
    Categories: {
        name: 'Categories',
        path: '/api/categories',
        Component: Categories,
        props: { path: '/api/categories' },
    },
    User: {
        name: 'User',
        path: '/api/user',
        Component: User,
        props: { path: '/api/user' },
    },
    Admin: {
        name: 'Admin',
        path: '/api/admin',
        Component: Admin,
        props: { path: '/api/admin' },
    },
    Logout: {
        name: 'Logout',
        path: '/api/logout',
        Component: Logout,
    },
    UxStories: {
        name: 'Ux Stories',
        path: '/api/ux-stories',
        Component: UxStories,
        props: { path: '/api/ux-stories' },
    },
    AccessGuards: {
        name: 'Access Guards',
        path: '/api/ux-stories/access-guards',
        Component: AccessGuards,
        props: { path: '/api/ux-stories/access-guards' },
    },
    Buttons: {
        name: 'Buttons',
        path: '/api/ux-stories/buttons',
        Component: Buttons,
        props: { path: '/api/ux-stories/buttons' },
    },
    CodeBlocks: {
        name: 'Code Blocks',
        path: '/api/ux-stories/code-blocks',
        Component: CodeBlocks,
        props: { path: '/api/ux-stories/code-blocks' },
    },
    Figures: {
        name: 'Figures',
        path: '/api/ux-stories/figures',
        Component: Figures,
        props: { path: '/api/ux-stories/figures' },
    },
    Forms: {
        name: 'Forms',
        path: '/api/ux-stories/forms',
        Component: Forms,
        props: { path: '/api/ux-stories/forms' },
    },
    Layouts: {
        name: 'Layouts',
        path: '/api/ux-stories/layouts',
        Component: Layouts,
        props: { path: '/api/ux-stories/layouts' },
    },
    Links: {
        name: 'Links',
        path: '/api/ux-stories/links',
        Component: Links,
        props: { path: '/api/ux-stories/links' },
    },
    LoadingIndicators: {
        name: 'Loading Indicators',
        path: '/api/ux-stories/loading-indicators',
        Component: LoadingIndicators,
        props: { path: '/api/ux-stories/loading-indicators' },
    },
    Overlays: {
        name: 'Overlays',
        path: '/api/ux-stories/overlays',
        Component: Overlays,
        props: { path: '/api/ux-stories/overlays' },
    },
    Pills: {
        name: 'Pills',
        path: '/api/ux-stories/pills',
        Component: Pills,
        props: { path: '/api/ux-stories/pills' },
    },
    Regions: {
        name: 'Regions',
        path: '/api/ux-stories/regions',
        Component: Regions,
        props: { path: '/api/ux-stories/regions' },
    },
    Tables: {
        name: 'Tables',
        path: '/api/ux-stories/tables',
        Component: Tables,
        props: { path: '/api/ux-stories/tables' },
    },
    TestAccessor: {
        name: 'Test Accessor',
        path: '/api/ux-stories/test-accessor',
        Component: TestAccessor,
        props: { path: '/api/ux-stories/test-accessor' },
    },
    Toggles: {
        name: 'Toggles',
        path: '/api/ux-stories/toggles',
        Component: Toggles,
        props: { path: '/api/ux-stories/toggles' },
    },
    Typography: {
        name: 'Typography',
        path: '/api/ux-stories/typography',
        Component: TypographyStory,
        props: { path: '/api/ux-stories/typography' },
    },
}
