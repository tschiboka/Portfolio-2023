import { render, screen } from '@testing-library/react'
import { Accessor } from '../../../Test'
import { Box } from '../Box'
import { selectBackground, selectBorderRadius } from '../Box.selectors'
import type { BoxProps } from '../Box.types'

type SetProps = Partial<BoxProps> & { ariaLabel: string }

export const Set = {
    box: ({ children, ...props }: SetProps) => {
        render(<Box {...props}>{children ?? <span>x</span>}</Box>)
        return new Accessor(screen.getByLabelText(props.ariaLabel), `Box(${props.ariaLabel})`)
    },
}

export { selectBackground, selectBorderRadius }
