import { render, screen } from '@testing-library/react'
import { Accessor } from '../../../Test'
import { Grid } from '../Grid'
import type { GridProps } from '../Grid.types'

type SetProps = Partial<GridProps> & { ariaLabel: string }

export const Set = {
    grid: ({ children, ...props }: SetProps) => {
        render(<Grid {...props}>{children ?? <span>x</span>}</Grid>)
        return new Accessor(screen.getByLabelText(props.ariaLabel), `Grid(${props.ariaLabel})`)
    },
}
