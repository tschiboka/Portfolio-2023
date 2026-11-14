import { render, screen } from '@testing-library/react'
import { Box } from '../Box'
import { BoxSelectors } from '../Box.selectors'
import { Accessor } from '../../../Test'
import type { SetProps } from './Box.spec.types'

const { selectBackground, selectBorderRadius } = BoxSelectors

const Set = {
    box: ({ children, ...props }: SetProps) => {
        render(<Box {...props}>{children ?? <span>x</span>}</Box>)
        return new Accessor(screen.getByLabelText(props.ariaLabel), `Box(${props.ariaLabel})`)
    },
}

export const BoxTestUtils = { Set, selectBackground, selectBorderRadius }
