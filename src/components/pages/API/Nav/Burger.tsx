import { HiMenuAlt3 } from 'react-icons/hi'
import { useAppContext } from '../../../../context/AppContext/App.context'
import { CgClose } from 'react-icons/cg'

const Burger = () => {
    const { mobileMenuVisible, setMobileMenuVisible } = useAppContext()

    return !mobileMenuVisible ? (
        <HiMenuAlt3
            className="burger"
            title="Extend Mobile Menu"
            onClick={() => setMobileMenuVisible(true)}
        />
    ) : (
        <CgClose
            title="Close Mobile Menu"
            className="burger"
            onClick={() => setMobileMenuVisible(false)}
        />
    )
}

export default Burger
