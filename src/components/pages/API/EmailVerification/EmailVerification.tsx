import { useMutation } from '@tanstack/react-query'
import LoadingIndicator from '../../../sharedComponents/LoadingIndicator/LoadingIndicator'
import Page from '../../../sharedComponents/Page/Page'
import './EmailVerification.scss'
import { useVerifyEmailRequest } from './EmailVerification.query'
import { AxiosError, AxiosResponse } from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

interface IndexProps {
    path: string
}

const EmailVerification = ({ path }: IndexProps) => {
    const [message, setMessage] = useState('')
    const { verificationToken = '' } = useParams()
    const navigate = useNavigate()

    const { mutate: verifyEmail, isPending } = useMutation<
        AxiosResponse<{ token: string }, any>,
        AxiosError<any>,
        { token: string }
    >({
        mutationKey: ['adsfadsf'],
        mutationFn: (token) => useVerifyEmailRequest(token),
        onError: (error: AxiosError<any>) => {
            setMessage(error.response?.data?.message)
        },
        onSuccess: () => {
            setMessage('Email verified')
            navigate('/api/login')
        },
    })

    useEffect(() => {
        verifyEmail({ token: verificationToken })
    }, [])

    return (
        <Page
            className="EmailVerification"
            title={'Tivadar Debnar | Email Verification'}
            path={path}
            recordVisit={false}
        >
            <h1>Verifing your email address</h1>
            <LoadingIndicator show={isPending} />
            {message && <h2>{message}</h2>}
        </Page>
    )
}

export default EmailVerification
