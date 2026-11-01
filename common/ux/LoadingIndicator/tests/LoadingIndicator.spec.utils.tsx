import { render } from '@testing-library/react'
import { Test } from '@common-ux/Test'
import { LoadingIndicator } from '../LoadingIndicator'

type Props = Partial<Parameters<typeof LoadingIndicator>[0]>

const Set = {
    loading: (props: Props = {}) => {
        render(<LoadingIndicator show={true} {...props} />)
        return Test.LoadingIndicator(props.ariaLabel)
    },
}

export const LoadingIndicatorTestUtils = { Set }
