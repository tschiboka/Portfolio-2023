import { Navigation } from "."

export type NavigationProps = {
    path: keyof typeof Navigation.NavigationPaths
    params?: Record<string, string | number>
    query?: Record<string, string>
}
