import { render, screen } from '@testing-library/react'
import { Split } from '../Split'
import { SplitSelectors } from '../Split.selectors'
import { Accessor } from '../../../Test'
import type { SetProps } from './Split.spec.types'

const Set = {
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

export const SplitTestUtils = { Set, SplitSelectors }
