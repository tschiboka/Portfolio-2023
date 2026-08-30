import { Navigation } from '.'
import type { Dictionary } from '@utils'

export type NavigationProps = {
    path: keyof typeof Navigation.NavigationPaths
    params?: Dictionary<string | number>
    query?: Dictionary<string>
}
