import { CSSProperties, ReactNode, MouseEvent, KeyboardEvent, FocusEvent } from 'react'

export type InteractiveProps = {
    onClick?: (event: MouseEvent) => void
    onMouseEnter?: (event: MouseEvent) => void
    onMouseLeave?: (event: MouseEvent) => void
    onKeyDown?: (event: KeyboardEvent) => void
    onFocus?: (event: FocusEvent) => void
    onBlur?: (event: FocusEvent) => void
}

export type AccessibleProps = {
    ariaLabel?: string
    className?: string
    style?: CSSProperties
}

export type ComponentProps = AccessibleProps &
    InteractiveProps & {
        children: ReactNode
    }
