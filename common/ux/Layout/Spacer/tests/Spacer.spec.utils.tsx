import { render, screen } from '@testing-library/react'
import { Spacer } from '../Spacer'
import { Accessor } from '../../../Test'
import type { SetProps } from './Spacer.spec.types'

const Set = {
    spacer: (props: SetProps) => {
        render(<Spacer size={props.size ?? '16'} {...props} />)
        return new Accessor(screen.getByLabelText(props.ariaLabel), `Spacer(${props.ariaLabel})`)
    },
}

export const SpacerTestUtils = { Set }
