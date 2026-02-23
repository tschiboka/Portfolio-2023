import { useMutation } from '@tanstack/react-query'
import { apiPathBuilder, ApiPaths } from '../../../../routing/apiPathBuilder'
import axios from 'axios'
import { Keystroke, RoundResponse } from './Typist.types'

export const usePostRound = () =>
    useMutation<RoundResponse, Error, Keystroke[]>({
        mutationKey: ['typist-post-round'],
        mutationFn: async (keystrokes: Keystroke[]) =>
            axios
                .post<RoundResponse>(
                    apiPathBuilder(ApiPaths.PROJECT_TYPIST, { prefix: '' }) +
                        '/round',
                    { keystrokes },
                )
                .then((res) => res.data),
    })
