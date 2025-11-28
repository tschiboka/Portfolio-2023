import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import './Logout.scss'
import { dropToken } from '../Login/Login.utils'
import { useAppContext } from '../../../../context/AppContext'
import { useQueryClient } from '@tanstack/react-query'

export const useLogout = () => {
    const navigate = useNavigate()
    const { setUser } = useAppContext()
    const queryClient = useQueryClient()

    return () => {
        dropToken()
        setUser(undefined as any)
        queryClient.invalidateQueries({ queryKey: ['rehydrateSession'] })
        queryClient.clear()
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
