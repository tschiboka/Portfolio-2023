import { render } from '@testing-library/react'
import { Functions } from '@common-utils'
import { Test } from '@common-ux/Test'
import { Toggle } from '../Toggle'
import type { ToggleProps } from '../Toggle'

export const Set = {
    toggle: (props: Partial<ToggleProps> = {}) => {
        render(
            <Toggle handleClick={Functions.noop} active={false} {...props}>
                <span>icon</span>
            </Toggle>,
        )
        return Test.Toggle()
    },
}
