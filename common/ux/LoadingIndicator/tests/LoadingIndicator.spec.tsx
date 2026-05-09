import { render, screen } from '@testing-library/react'
import { Test } from '@common/ux/Test'
import { LoadingIndicator } from '../LoadingIndicator'

type Props = Partial<Parameters<typeof LoadingIndicator>[0]>

const Set = {
    loading: (props: Props = {}) => {
        render(<LoadingIndicator show={true} {...props} />)
        return Test.LoadingIndicator(props.ariaLabel)
    },
}

describe('LoadingIndicator', () => {
    it('should render when show is true', () => {
        const loading = Set.loading()
        expect(loading.Has.isLoading()).toBe(true)
    })

    it('should not render when show is false', () => {
        render(<LoadingIndicator show={false} />)
        expect(screen.queryByRole('progressbar')).not.toBeInTheDocument()
    })

    it('should use "Loading" as default aria-label', () => {
        const loading = Set.loading()
        expect(loading.Get.attribute('aria-label')).toBe('Loading')
    })

    it('should apply custom ariaLabel', () => {
        const loading = Set.loading({ ariaLabel: 'Fetching data' })
        expect(loading.Get.attribute('aria-label')).toBe('Fetching data')
    })

    it('should render three animated bars', () => {
        Set.loading()
        expect(screen.getByRole('progressbar').children).toHaveLength(3)
    })

    it('should apply custom color', () => {
        const loading = Set.loading({ color: 'red' })
        expect(loading.Get.style().color).toBe('red')
    })

    it('should apply className', () => {
        const loading = Set.loading({ className: 'my-loader' })
        expect(loading.Get.className()).toContain('my-loader')
    })

    it('should merge custom style', () => {
        const loading = Set.loading({ style: { margin: '8px' } })
        expect(loading.Get.style().margin).toBe('8px')
    })
})
