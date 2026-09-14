import { useEffect, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { ClientMessage, ErrorResponse, Paths, Query, QueryKey, errorMessage } from '@common-utils'
import type { PostConfirmRequest, PostConfirmResponse } from '@common-types'
import type { AxiosError } from 'axios'

type UsePostResult = {
    message: string
    isPending: boolean
}

/**
 * Confirms the token once on mount and returns what the screen renders. The
 * token is a route param, so it must not re-trigger the mutation.
 */
const usePost = (token: string): UsePostResult => {
    const [message, setMessage] = useState('')
    const navigate = useNavigate()
    const request = Query.FeatureQuery().path('ConfirmRegistration').build()

    const { mutate, isPending } = useMutation<
        PostConfirmResponse,
        AxiosError<ErrorResponse>,
        PostConfirmRequest
    >({
        mutationKey: QueryKey.ConfirmRegistration.build(),
        ...request.Post({
            onSuccess: () => {
                setMessage(ClientMessage.Success.Verified('email'))
                navigate(Paths.Client.Login)
            },
            onError: (error) =>
                setMessage(errorMessage(error, ClientMessage.Failure.Verify('email'))),
        }),
    })

    useEffect(() => {
        mutate({ token })
        // Fires once on mount; the token is a route param and must not re-trigger the mutation.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return { message, isPending }
}

export const EmailVerificationQueries = {
    Verify: {
        usePost,
    },
}
