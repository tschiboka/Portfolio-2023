import { render, screen } from '@testing-library/react'
import { Accessor } from '../../../Test'
import { Inline } from '../Inline'
import type { InlineProps } from '../Inline.types'

type SetProps = Partial<InlineProps> & { ariaLabel: string }

export const Set = {
    inline: ({ children, ...props }: SetProps) => {
        render(<Inline {...props}>{children ?? <span>x</span>}</Inline>)
        return new Accessor(screen.getByLabelText(props.ariaLabel), `Inline(${props.ariaLabel})`)
    },
}
