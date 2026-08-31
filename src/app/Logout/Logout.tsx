import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import './Logout.scss'
import { Session } from '@shared-context/SessionContext'
import { LocalSession } from '@shared-context/SessionContext/LocalSession'

export const useLogout = () => {
    const navigate = useNavigate()
    const { setSession } = Session.useContext()

    return () => {
        LocalSession.getInstance().drop()
        setSession(undefined)
        navigate('/api/home')
    }
}

export const Logout = () => {
    const logout = useLogout()

    useEffect(() => {
        logout()
    }, [logout])

    return <></>
}
