import { render, screen } from '@testing-library/react'
import { Figure } from '../Figure'
import { FigureAccessor } from '../../Test/Figure/Figure'
import type { FigureProps } from '../Figure.types'

const Set = {
    figure: (props: Partial<FigureProps> = {}) => {
        const label = props.ariaLabel ?? 'Test figure'
        render(
            <Figure
                src={props.src ?? 'test-image.png'}
                alt={props.alt ?? 'Test image'}
                ariaLabel={label}
                {...props}
            />,
        )
        return new FigureAccessor(screen.getByLabelText(label), `Figure('${label}')`)
    },
}

export const FigureTestUtils = { Set }
