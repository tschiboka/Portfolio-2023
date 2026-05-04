import { Code, Stack } from '@common/ux'
import { Nav } from '@common/ux/Nav/Nav'
import { SubNav } from '@common/ux/Nav/SubNav/SubNav'
import { MobileMenu } from '@common/ux/Nav/MobileMenu/MobileMenu'
import { Screen } from '../../../../../sharedComponents/Screen/Screen'
import { PageSideMenu } from '../../../../../sharedComponents/PageSideMenu/PageSideMenu'
import { StoryNav } from '../StoryNav/StoryNav'
import { Code as Snippets } from './Nav.code'
import { MenuItem } from '@common/ux/Nav/Nav.types'
import { Link } from 'react-router-dom'
import { FaFacebookF } from 'react-icons/fa'
import { TbBrandGithubFilled } from 'react-icons/tb'
import { TfiLinkedin } from 'react-icons/tfi'
import './Nav.styles.css'

type NavStoryProps = { path: string }

const demoMenu: MenuItem[] = [
    { label: 'Home', path: '#' },
    { label: 'About', path: '#' },
    {
        label: 'Projects',
        path: '#',
        submenu: [
            { label: 'Project A', path: '#', parent: 'Projects' },
            { label: 'Project B', path: '#', parent: 'Projects' },
        ],
    },
    { label: 'Contact', path: '#' },
]

const DemoLogo = () => (
    <div
        className="t-logo"
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
        <span style={{ color: 'white', fontSize: '0.8rem', fontWeight: 'bold' }}>T</span>
    </div>
)

const DemoSocialLinks = () => (
    <>
        <FaFacebookF title="Facebook" />
        <TbBrandGithubFilled title="Github" />
        <TfiLinkedin title="LinkedIn" />
    </>
)

const NavShellDemo = () => (
    <div className="NavDemo">
        <Nav logo={<DemoLogo />} burger={null}>
            {demoMenu.map((item) => (
                <li key={item.label} className={item.label === 'Home' ? 'active' : ''}>
                    <Link className="link" to="#">
                        {item.label}
                    </Link>
                </li>
            ))}
        </Nav>
    </div>
)

const SubNavDemo = () => (
    <div className="NavDemo">
        <SubNav
            title={
                <>
                    <span>Tivadar&nbsp;</span>
                    <span>Debnar</span>
                </>
            }
            links={<DemoSocialLinks />}
        />
    </div>
)

const MobileMenuDemo = () => (
    <div className="NavDemo NavDemo--mobile">
        <Nav logo={<DemoLogo />}>{null}</Nav>
        <MobileMenu
            items={demoMenu}
            pageName="Home"
            className="MobileMenu--portfolio"
            extras={
                <div className="social-links">
                    <DemoSocialLinks />
                </div>
            }
        />
    </div>
)

export const NavStory = ({ path }: NavStoryProps) => {
    return (
        <Screen
            title={'Tivadar Debnar | Nav'}
            path={path}
            recordVisit={false}
            loginRequired
            variant="api"
            pageName="Projects"
            sideMenu={<PageSideMenu />}
        >
            <main>
                <StoryNav />
                <h1>Nav</h1>
                <p>
                    The <code>Nav</code> system provides a responsive navigation bar with support
                    for nested submenus, mobile menu, sub-navigation bar, and theme toggling. It is
                    composed of several sub-components that can be used independently or together.
                </p>

                <section>
                    <h2>Components</h2>
                    <Stack.Vertical gap="8">
                        <p>The Nav system exports the following components:</p>
                        <ul>
                            <li>
                                <code>Nav</code> — Generic shell (header with logo, burger, and nav
                                links)
                            </li>
                            <li>
                                <code>NavMenu</code> — Data-driven menu renderer with AccessGuard
                                integration
                            </li>
                            <li>
                                <code>SubNav</code> — Secondary bar with theme toggle and injected
                                content
                            </li>
                            <li>
                                <code>MobileMenu</code> — Full-screen mobile menu with stacked
                                navigation
                            </li>
                        </ul>
                    </Stack.Vertical>
                </section>

                <section>
                    <h2>MenuItem Type</h2>
                    <p>
                        All menu components accept an array of <code>MenuItem</code> objects that
                        define the navigation structure.
                    </p>
                    <Code language="typescript" content={Snippets.menuItemType} />
                </section>

                <section>
                    <h2>Nav Shell</h2>
                    <p>
                        The base <code>Nav</code> component renders a fixed header with optional
                        logo and burger button props. Children are rendered inside the nav links
                        list.
                    </p>
                    <NavShellDemo />
                    <Code language="tsx" content={Snippets.navShell} />
                </section>

                <section>
                    <h2>SubNav</h2>
                    <p>
                        The <code>SubNav</code> component renders a secondary bar below the main
                        nav. It includes a theme toggle and accepts optional title and links as
                        ReactNode props.
                    </p>
                    <SubNavDemo />
                    <Code language="tsx" content={Snippets.subNav} />
                </section>

                <section>
                    <h2>MobileMenu</h2>
                    <p>
                        The <code>MobileMenu</code> component renders a full-screen overlay on
                        mobile. It supports nested submenu navigation via a stack-based approach,
                        theme toggling, and an extras slot for additional content like social links.
                    </p>
                    <MobileMenuDemo />
                    <Code language="tsx" content={Snippets.mobileMenu} />
                </section>

                <section>
                    <h2>NavMenu</h2>
                    <p>
                        <code>NavMenu</code> is a higher-level component that takes an items array
                        and renders a full navigation bar with AccessGuard-wrapped items, submenu
                        chevrons, and active state highlighting.
                    </p>
                    <Code language="tsx" content={Snippets.navMenu} />
                </section>

                <section>
                    <h2>Integration Example</h2>
                    <p>
                        In practice, you compose these components at the app level to create a
                        complete navigation system tailored to your page variant.
                    </p>
                    <Code language="tsx" content={Snippets.integration} />
                </section>
            </main>
        </Screen>
    )
}
