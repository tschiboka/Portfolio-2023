import { render, screen } from '@testing-library/react'
import { Grid } from '../Grid'
import { Accessor } from '../../../Test'
import type { SetProps } from './Grid.spec.types'

const Set = {
    grid: ({ children, ...props }: SetProps) => {
        render(<Grid {...props}>{children ?? <span>x</span>}</Grid>)
        return new Accessor(screen.getByLabelText(props.ariaLabel), `Grid(${props.ariaLabel})`)
    },
}

export const GridTestUtils = { Set }
