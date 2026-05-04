import { useAppContext } from '../../context/AppContext/App.context'
import iconDark from '../../assets/images/icon.svg'
import iconLight from '../../assets/images/icon-light.svg'

export const Logo = () => {
    const { themeMode } = useAppContext()
    const icon = themeMode === 'dark' ? iconDark : iconLight

    return <img className="t-logo" src={icon} alt="Logo" title="Home Page" />
}
