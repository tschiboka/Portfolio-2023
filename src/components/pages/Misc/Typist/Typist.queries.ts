import { useMutation } from '@tanstack/react-query'
import { Keystroke, RoundResponse } from './Typist.types'
import { Paths, QueryKey } from '@common/utils'
import { useApi } from '@common/utils/Query/Query'

export const usePostRound = () => {
    const api = useApi(Paths.Projects.Typist).setPath('/round').build()

    return useMutation<RoundResponse, Error, Keystroke[]>({
        mutationKey: QueryKey.TypistRound.build(),
        mutationFn: async (keystrokes: Keystroke[]) =>
            api.post<RoundResponse>({ keystrokes }).then((res) => res.data),
    })
}
