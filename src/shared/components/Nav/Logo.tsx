import { useAppContext } from '@shared-context/AppContext/App.context'
import iconDark from '@shared-assets/icon.svg'
import iconLight from '@shared-assets/icon-light.svg'

export const Logo = () => {
    const { themeMode } = useAppContext()
    const icon = themeMode === 'dark' ? iconDark : iconLight

    return <img className="t-logo" src={icon} alt="Logo" title="Home Page" />
}
