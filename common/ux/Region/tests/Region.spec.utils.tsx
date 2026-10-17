import { render, screen } from '@testing-library/react'
import { Region } from '../Region'
import { RegionAccessor } from '../../Test/Region/Region'
import type { RegionProps } from '../Region.types'

type Props = Partial<RegionProps> & { ariaLabel: string }

const Set = {
    region: (props: Props) => {
        render(<Region {...props}>{props.children ?? <p>Region content</p>}</Region>)
        return new RegionAccessor(
            screen.getByLabelText(props.ariaLabel),
            `Region(${props.ariaLabel})`,
        )
    },
}

export const RegionTestUtils = { Set }
