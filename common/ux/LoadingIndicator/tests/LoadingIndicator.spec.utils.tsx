import { render } from '@testing-library/react'
import { Test } from '@common-ux/Test'
import { LoadingIndicator } from '../LoadingIndicator'
import type { Props } from './LoadingIndicator.spec.types'

const Set = {
    loading: (props: Props = {}) => {
        render(<LoadingIndicator show={true} {...props} />)
        return Test.LoadingIndicator(props.ariaLabel)
    },
}

export const LoadingIndicatorTestUtils = { Set }
