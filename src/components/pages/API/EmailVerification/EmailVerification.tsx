import { useMutation } from '@tanstack/react-query'
import { LoadingIndicator } from '@common/ux'
import { Screen } from '../../../sharedComponents/Screen/Screen'
import './EmailVerification.scss'
import { verifyEmailRequest } from './EmailVerification.query'
import { QueryKey } from '@common/utils'
import type { AxiosError, AxiosResponse } from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

interface IndexProps {
    path: string
}

const EmailVerification = ({ path }: IndexProps) => {
    const [message, setMessage] = useState('')
    const { verificationToken = '' } = useParams()
    const navigate = useNavigate()

    const { mutate: verifyEmail, isPending } = useMutation({
        mutationKey: QueryKey.ConfirmRegistration.build(),
        mutationFn: (token: { token: string }): Promise<AxiosResponse<{ token: string }>> =>
            verifyEmailRequest(token),
        onError: (error: AxiosError<{ message?: string }>) => {
            setMessage(error.response?.data?.message ?? 'Verification failed')
        },
        onSuccess: () => {
            setMessage('Email verified')
            navigate('/api/login')
        },
    })

    useEffect(() => {
        verifyEmail({ token: verificationToken })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Screen
            className="EmailVerification"
            title={'Tivadar Debnar | Email Verification'}
            path={path}
        >
            <h1>Verifing your email address</h1>
            <LoadingIndicator show={isPending} />
            {message && <h2>{message}</h2>}
        </Screen>
    )
}

export default EmailVerification
