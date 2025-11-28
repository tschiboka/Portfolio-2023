import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import './Logout.scss'
import { dropToken } from '../Login/Login.utils'

export const useLogout = () => {
    const navigate = useNavigate()
    return () => {
        dropToken()
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
