import { useNavigate } from 'react-router-dom'
import { Session, SessionStorage } from '@shared-context'

export const LogoutHooks = {
    useLogout: () => {
        const navigate = useNavigate()
        const { setSession } = Session.useContext()

        return () => {
            SessionStorage.getInstance().drop()
            setSession(undefined)
            navigate('/api/home')
        }
    },
}
