import { render, screen } from '@testing-library/react'
import { Region } from '../Region'
import { RegionAccessor } from '../../Test/Region/Region'
import type { Props } from './Region.spec.types'

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
