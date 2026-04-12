import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import './Logout.scss'
import { Session } from '../../../../context/SessionContext'
import { LocalSession } from '../../../../context/SessionContext/LocalSession'

export const useLogout = () => {
    const navigate = useNavigate()
    const { setSession } = Session.useContext()

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
