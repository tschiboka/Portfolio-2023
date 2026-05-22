import type { BoxBackground, BoxBorderRadius } from './Box.types'

const BackgroundMap: Record<BoxBackground, string> = {
    transparent: 'transparent',
    surface: 'var(--black-2)',
    raised: 'var(--black-3)',
    sunken: 'var(--black-1)',
    accent: 'var(--accent-dark-5)',
}

const BorderRadiusMap: Record<BoxBorderRadius, string> = {
    none: 'var(--radius-none)',
    sm: 'var(--radius-sm)',
    md: 'var(--radius-md)',
    lg: 'var(--radius-lg)',
    full: 'var(--radius-full)',
}

export const selectBackground = (bg?: BoxBackground) => (bg ? BackgroundMap[bg] : undefined)

export const selectBorderRadius = (br?: BoxBorderRadius) => (br ? BorderRadiusMap[br] : undefined)
