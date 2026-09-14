import { useNavigate } from 'react-router-dom'
import { Session, LocalSession } from '@shared-context'

export const LogoutHooks = {
    useLogout: () => {
        const navigate = useNavigate()
        const { setSession } = Session.useContext()

        return () => {
            LocalSession.getInstance().drop()
            setSession(undefined)
            navigate('/api/home')
        }
    },
}
