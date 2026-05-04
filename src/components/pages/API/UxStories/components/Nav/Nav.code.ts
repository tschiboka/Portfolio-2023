export const Code = {
    menuItemType: `type MenuItem = {
    label: string
    path?: string
    submenu?: MenuItem[]
    parent?: string
    extended?: boolean
    allowCapabilities?: Capability[]
    allowedFeatures?: Feature[]
    image?: string
    showSubmenuToggle?: boolean
}`,

    navShell: `import { Nav } from '@common/ux/Nav'

<Nav logo={<MyLogo />} burger={<MyBurger />}>
    <li>Home</li>
    <li>About</li>
</Nav>`,

    navMenu: `import { NavMenu } from '@common/ux/Nav'

const menu: MenuItem[] = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Projects', path: '/projects', submenu: [
        { label: 'Project A', path: '/projects/a', parent: 'Projects' },
        { label: 'Project B', path: '/projects/b', parent: 'Projects' },
    ]},
]

<NavMenu
    items={menu}
    pageName="Home"
    logo={<Logo />}
    onSubmenuToggle={(item, stack) => setSubmenuStack(stack)}
/>`,

    subNav: `import { SubNav } from '@common/ux/Nav'

<SubNav
    title={<><span>Tivadar&nbsp;</span><span>Debnar</span></>}
    links={<SocialLinks />}
/>`,

    mobileMenu: `import { MobileMenu } from '@common/ux/Nav'

<MobileMenu
    items={menu}
    pageName="Home"
    className="MobileMenu--portfolio"
    renderImage={getMenuItemImage}
    extras={<div className="social-links"><SocialLinks /></div>}
/>`,

    integration: `// PageNav.tsx — app-level orchestrator
import { NavMenu, MobileMenu, SubNav } from '@common/ux/Nav'
import { Logo } from './Logo'
import { SocialLinks, SubNavTitle } from './PersonalContent'
import { menu, getMenuItemImage } from './menuData'

export const PageNav = ({ variant, pageName }) => (
    <>
        <NavMenu
            items={menu}
            pageName={pageName}
            logo={<Logo />}
            onSubmenuToggle={handleSubmenuToggle}
        />
        <MobileMenu
            items={menu}
            pageName={pageName}
            className={\`MobileMenu--\${variant}\`}
            renderImage={getMenuItemImage}
            extras={<div className="social-links"><SocialLinks /></div>}
        />
        <SubNav title={<SubNavTitle />} links={<SocialLinks />} />
    </>
)`,
}
