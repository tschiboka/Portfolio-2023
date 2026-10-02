import { render, screen } from '@testing-library/react'
import { Accessor } from '../../../Test'
import { Box } from '../Box'
import { BoxSelectors } from '../Box.selectors'
import type { BoxProps } from '../Box.types'
const { selectBackground, selectBorderRadius } = BoxSelectors
type SetProps = Partial<BoxProps> & { ariaLabel: string }

const Set = {
    box: ({ children, ...props }: SetProps) => {
        render(<Box {...props}>{children ?? <span>x</span>}</Box>)
        return new Accessor(screen.getByLabelText(props.ariaLabel), `Box(${props.ariaLabel})`)
    },
}

export const BoxTestUtils = { Set, selectBackground, selectBorderRadius }
