import { useState } from 'react'
import { useAppContext } from '../../../../context/AppContext'
import Page from '../../../sharedComponents/Page/Page'
import MobileMenu from '../MobileMenu/MobileMenu'
import Nav from '../Nav/Nav'
import { Submenu } from '../Nav'
import SubmenuPanel from '../Nav/SubmenuPanel/SubmenuPanel'
import { useNavigate } from 'react-router-dom'
import './Logout.scss'
import { dropToken } from '../Login/Login.utils'

interface LogoutProps {
    path: string
}

const Logout = ({ path }: LogoutProps) => {
    const { mobileMenuVisible } = useAppContext()
    const [submenuStack, setSubmenuStack] = useState<Submenu[]>([])
    const navigate = useNavigate()

    const handleLogoutClick = () => {
        dropToken()
        navigate('/api/index')
    }

    return (
        <Page title={'Tivadar Debnar | Logout'} path={path} recordVisit={false}>
            <Nav
                pageName="Logout"
                submenuStack={submenuStack}
                setSubmenuStack={setSubmenuStack}
            />
            {submenuStack.map((sub) => (
                <SubmenuPanel
                    key={sub.parentLabel}
                    submenu={sub}
                    submenuStack={submenuStack}
                    setSubmenuStack={setSubmenuStack}
                    pageName="Logout"
                />
            ))}
            {mobileMenuVisible && <MobileMenu pageName="Logout" />}
            <main className="Logout">
                <h1>Logout</h1>
                <p>Would you like to log out?</p>
                <div className="logout-wrapper">
                    <button className="button" onClick={handleLogoutClick}>
                        Log me out
                    </button>
                    <button
                        className="button"
                        onClick={() => navigate('/api/index')}
                    >
                        Back to Home
                    </button>
                </div>
            </main>
        </Page>
    )
}

export default Logout
