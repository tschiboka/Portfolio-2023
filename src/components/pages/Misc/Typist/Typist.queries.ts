import { useMutation } from '@tanstack/react-query'
import { Keystroke, RoundResponse } from './Typist.types'
import { Paths, Query, QueryKey } from '@common/utils'

export const usePostRound = () => {
    const request = new Query.RequestBuilder(Paths.Projects.Typist).setSubpath('/round').build()

    return useMutation<RoundResponse, Error, Keystroke[]>({
        mutationKey: QueryKey.TypistRound.build(),
        mutationFn: async (keystrokes: Keystroke[]) =>
            request.post<RoundResponse>({ keystrokes }).then((res) => res.data),
    })
}
