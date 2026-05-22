import { render, screen } from '@testing-library/react'
import { Figure } from '../Figure'
import type { FigureProps } from '../Figure.types'
import { FigureAccessor } from '../../Test/Figure/Figure'

export const Set = {
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
