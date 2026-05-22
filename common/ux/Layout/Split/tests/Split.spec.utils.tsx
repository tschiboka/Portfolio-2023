import { render, screen } from '@testing-library/react'
import { Accessor } from '../../../Test'
import { Split } from '../Split'
import { selectRatio } from '../Split.selectors'
import type { SplitProps } from '../Split.types'

type SetProps = Partial<SplitProps> & { ariaLabel: string }

export const Set = {
    split: (props: SetProps) => {
        render(
            <Split
                left={props.left ?? <span>Left</span>}
                right={props.right ?? <span>Right</span>}
                {...props}
            />,
        )
        return new Accessor(screen.getByLabelText(props.ariaLabel), `Split(${props.ariaLabel})`)
    },
}

export { selectRatio }
