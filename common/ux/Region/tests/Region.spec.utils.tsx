import { render, screen } from '@testing-library/react'
import { Region } from '../Region'
import type { RegionProps } from '../Region.types'
import { RegionAccessor } from '../../Test/Region/Region'

type Props = Partial<RegionProps> & { ariaLabel: string }

export const Set = {
    region: (props: Props) => {
        render(<Region {...props}>{props.children ?? <p>Region content</p>}</Region>)
        return new RegionAccessor(
            screen.getByLabelText(props.ariaLabel),
            `Region(${props.ariaLabel})`,
        )
    },
}
