import { AppHooks } from '@shared-context'
import iconDark from '@shared-assets/icon.svg'
import iconLight from '@shared-assets/icon-light.svg'

export const Logo = () => {
    const { themeMode } = AppHooks.useContext()
    const icon = themeMode === 'dark' ? iconDark : iconLight

    return <img className="t-logo" src={icon} alt="Logo" title="Home Page" />
}
