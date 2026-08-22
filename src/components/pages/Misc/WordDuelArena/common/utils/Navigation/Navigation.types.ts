import { Navigation } from '.'
import type { Dictionary } from '@common/utils'

export type NavigationProps = {
    path: keyof typeof Navigation.NavigationPaths
    params?: Dictionary<string | number>
    query?: Dictionary<string>
}
