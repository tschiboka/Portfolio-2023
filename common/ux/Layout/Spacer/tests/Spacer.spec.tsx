import { render } from '@testing-library/react'
import { Spacer } from '../Spacer'
import { Set } from './Spacer.spec.utils'

describe('Spacer', () => {
    describe('vertical (default)', () => {
        it('should set height based on size', () => {
            const spacer = Set.spacer({ size: '24', ariaLabel: 'v24' })
            expect(spacer.Get.style().height).toBe('24px')
        })

        it('should not set width when vertical', () => {
            const spacer = Set.spacer({ size: '16', ariaLabel: 'vw' })
            expect(spacer.Get.style().width).toBe('')
        })

        it('should have flexShrink 0', () => {
            const spacer = Set.spacer({ size: '8', ariaLabel: 'fs' })
            expect(spacer.Get.style().flexShrink).toBe('0')
        })
    })

    describe('horizontal', () => {
        it('should set width based on size', () => {
            const spacer = Set.spacer({ size: '32', axis: 'horizontal', ariaLabel: 'h32' })
            expect(spacer.Get.style().width).toBe('32px')
        })

        it('should not set height when horizontal', () => {
            const spacer = Set.spacer({ size: '16', axis: 'horizontal', ariaLabel: 'hh' })
            expect(spacer.Get.style().height).toBe('')
        })
    })

    describe('accessibility', () => {
        it('should apply ariaLabel', () => {
            const spacer = Set.spacer({ ariaLabel: 'divider' })
            expect(spacer.Get.attribute('aria-label')).toBe('divider')
        })

        it('should not be aria-hidden when ariaLabel is provided', () => {
            const spacer = Set.spacer({ ariaLabel: 'divider' })
            expect(spacer.Get.attribute('aria-hidden')).toBeNull()
        })

        it('should be aria-hidden when no ariaLabel is provided', () => {
            const { container } = render(<Spacer size="16" />)
            const element = container.firstChild as HTMLElement
            expect(element.getAttribute('aria-hidden')).toBe('true')
        })
    })

    describe('rendering', () => {
        it('should render as div', () => {
            const spacer = Set.spacer({ ariaLabel: 'div' })
            expect(spacer.Get.tagName()).toBe('DIV')
        })
    })
})
