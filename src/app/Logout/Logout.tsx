/* eslint-disable standards/matching-spec -- TODO [0011] check the convention */
import { useEffect } from 'react'
import { LogoutHooks } from './Logout.hooks'
import './Logout.scss'

export const Logout = () => {
    const logout = LogoutHooks.useLogout()
    useEffect(() => logout(), [logout])

    return <></>
}
