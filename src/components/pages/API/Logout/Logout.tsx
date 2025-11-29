import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import './Logout.scss'
import { useSessionContext } from '../../../../context/SessionContext/Session.context'
import { LocalSession } from '../../../../context/SessionContext/LocalSession'

export const useLogout = () => {
    const navigate = useNavigate()
    const { setSession } = useSessionContext()

    return () => {
        LocalSession.getInstance().drop()
        setSession(undefined)
        navigate('/api/index')
    }
}

const Logout = () => {
    const logout = useLogout()

    useEffect(() => {
        logout()
    }, [logout])

    return <></>
}

export default Logout
