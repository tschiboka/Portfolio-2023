import { render } from '@testing-library/react'
import { Test } from '@common/ux/Test'
import { Button } from '../Button'
import type { AsButton, AsAnchor } from '../Button.types'

export const Set = {
    button: (props: Partial<AsButton> = {}) => {
        const label = (props.children as string) ?? 'Click me'
        render(<Button {...props}>{label}</Button>)
        return Test.Button(props.ariaLabel ?? label)
    },
    link: (props: Partial<Omit<AsAnchor, 'as'>> = {}) => {
        const label = (props.children as string) ?? 'Link text'
        render(
            <Button as="a" href="/test" {...props}>
                {label}
            </Button>,
        )
        return Test.Button.Link(props.ariaLabel ?? label)
    },
}
