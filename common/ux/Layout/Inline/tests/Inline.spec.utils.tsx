import { render, screen } from '@testing-library/react'
import { Inline } from '../Inline'
import { Accessor } from '../../../Test'
import type { InlineProps } from '../Inline.types'

type SetProps = Partial<InlineProps> & { ariaLabel: string }

const Set = {
    inline: ({ children, ...props }: SetProps) => {
        render(<Inline {...props}>{children ?? <span>x</span>}</Inline>)
        return new Accessor(screen.getByLabelText(props.ariaLabel), `Inline(${props.ariaLabel})`)
    },
}

export const InlineTestUtils = { Set }
