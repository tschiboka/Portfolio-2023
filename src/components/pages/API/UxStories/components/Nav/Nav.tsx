import { Code, CodeText, Heading, List, Main, Paragraph, Section, Stack } from '@common/ux'
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

export const NavStory = ({ path }: NavStoryProps) => (
    <Screen
        title={'Tivadar Debnar | Nav'}
        path={path}
        variant="api"
        pageName="Projects"
        sideMenu={<PageSideMenu />}
        hasContentNavigator
    >
        <Main>
            <StoryNav />
            <Heading as="h1">Nav</Heading>
            <Paragraph>
                The <CodeText>Nav</CodeText> system provides a responsive navigation bar with
                support for nested submenus, mobile menu, sub-navigation bar, and theme toggling. It
                is composed of several sub-components that can be used independently or together.
            </Paragraph>
            <Section>
                <Heading as="h2" id="components">
                    Components
                </Heading>
                <Stack.Vertical gap="8">
                    <Paragraph>The Nav system exports the following components:</Paragraph>
                    <List
                        items={[
                            <>
                                <CodeText>Nav</CodeText> — Generic shell (header with logo, burger,
                                and nav links)
                            </>,
                            <>
                                <CodeText>NavMenu</CodeText> — Data-driven menu renderer with
                                AccessGuard integration
                            </>,
                            <>
                                <CodeText>SubNav</CodeText> — Secondary bar with theme toggle and
                                injected content
                            </>,
                            <>
                                <CodeText>MobileMenu</CodeText> — Full-screen mobile menu with
                                stacked navigation
                            </>,
                        ]}
                    />
                </Stack.Vertical>
            </Section>

            <Section>
                <Heading as="h2" id="menu-item-type">
                    MenuItem Type
                </Heading>
                <Paragraph>
                    All menu components accept an array of <CodeText>MenuItem</CodeText> objects
                    that define the navigation structure.
                </Paragraph>
                <Code language="typescript" content={Snippets.menuItemType} />
            </Section>

            <Section>
                <Heading as="h2" id="nav-shell">
                    Nav Shell
                </Heading>
                <Paragraph>
                    The base <CodeText>Nav</CodeText> component renders a fixed header with optional
                    logo and burger button props. Children are rendered inside the nav links list.
                </Paragraph>
                <NavShellDemo />
                <Code language="tsx" content={Snippets.navShell} />
            </Section>

            <Section>
                <Heading as="h2" id="sub-nav">
                    SubNav
                </Heading>
                <Paragraph>
                    The <CodeText>SubNav</CodeText> component renders a secondary bar below the main
                    nav. It includes a theme toggle and accepts optional title and links as
                    ReactNode props.
                </Paragraph>
                <SubNavDemo />
                <Code language="tsx" content={Snippets.subNav} />
            </Section>

            <Section>
                <Heading as="h2" id="mobile-menu">
                    MobileMenu
                </Heading>
                <Paragraph>
                    The <CodeText>MobileMenu</CodeText> component renders a full-screen overlay on
                    mobile. It supports nested submenu navigation via a stack-based approach, theme
                    toggling, and an extras slot for additional content like social links.
                </Paragraph>
                <MobileMenuDemo />
                <Code language="tsx" content={Snippets.mobileMenu} />
            </Section>

            <Section>
                <Heading as="h2" id="nav-menu">
                    NavMenu
                </Heading>
                <Paragraph>
                    <CodeText>NavMenu</CodeText> is a higher-level component that takes an items
                    array and renders a full navigation bar with AccessGuard-wrapped items, submenu
                    chevrons, and active state highlighting.
                </Paragraph>
                <Code language="tsx" content={Snippets.navMenu} />
            </Section>

            <Section>
                <Heading as="h2" id="integration-example">
                    Integration Example
                </Heading>
                <Paragraph>
                    In practice, you compose these components at the app level to create a complete
                    navigation system tailored to your page variant.
                </Paragraph>
                <Code language="tsx" content={Snippets.integration} />
            </Section>
        </Main>
    </Screen>
)
