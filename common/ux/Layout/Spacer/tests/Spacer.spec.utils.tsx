import { render, screen } from '@testing-library/react'
import { Accessor } from '../../../Test'
import { Spacer } from '../Spacer'
import type { SpacerProps } from '../Spacer.types'

type SetProps = Partial<SpacerProps> & { ariaLabel: string }

export const Set = {
    spacer: (props: SetProps) => {
        render(<Spacer size={props.size ?? '16'} {...props} />)
        return new Accessor(screen.getByLabelText(props.ariaLabel), `Spacer(${props.ariaLabel})`)
    },
}
