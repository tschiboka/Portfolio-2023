import { render, screen } from '@testing-library/react'
import { Stack } from '../Stack'
import { Accessor } from '../../../Test'
import type { ReactNode } from 'react'
import type { StackProps } from '../Stack.types'

type SetProps = Omit<StackProps, 'ariaLabel' | 'children'> & {
    ariaLabel: string
    children?: ReactNode
}

const Set = {
    stack: ({ children, ...props }: SetProps) => {
        render(<Stack {...props}>{children ?? <span>x</span>}</Stack>)
        return new Accessor(screen.getByLabelText(props.ariaLabel), `Stack(${props.ariaLabel})`)
    },
    vertical: ({ children, ...props }: SetProps) => {
        render(<Stack.Vertical {...props}>{children ?? <span>x</span>}</Stack.Vertical>)
        return new Accessor(
            screen.getByLabelText(props.ariaLabel),
            `Stack.Vertical(${props.ariaLabel})`,
        )
    },
    horizontal: ({ children, ...props }: SetProps) => {
        render(<Stack.Horizontal {...props}>{children ?? <span>x</span>}</Stack.Horizontal>)
        return new Accessor(
            screen.getByLabelText(props.ariaLabel),
            `Stack.Horizontal(${props.ariaLabel})`,
        )
    },
}

export const StackTestUtils = { Set }
