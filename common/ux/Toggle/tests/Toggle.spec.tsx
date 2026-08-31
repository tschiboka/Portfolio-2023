import { fireEvent, render, screen } from '@testing-library/react'
import { Functions } from '@common-utils'
import { Test } from '@common-ux/Test'
import { Toggle } from '../Toggle'
import { Set } from './Toggle.spec.utils'

describe('Toggle', () => {
    describe('Layout', () => {
        it('should render with switch role', () => {
            Set.toggle()
            expect(Test.Toggle().Get.role()).toBe('switch')
        })

        it('should render the icon children', () => {
            Set.toggle()
            expect(screen.getByText('icon')).toBeInTheDocument()
        })

        it('should render without an icon when no children passed', () => {
            render(<Toggle handleClick={Functions.noop} active={false} />)
            expect(Test.Toggle().Get.active()).toBe(false)
            expect(document.querySelector('.Toggle__icon')).not.toBeInTheDocument()
        })

        it('should not be active by default', () => {
            Set.toggle()
            expect(Test.Toggle().Get.active()).toBe(false)
        })

        it('should reflect the active state via aria-checked', () => {
            const { rerender } = render(
                <Toggle handleClick={Functions.noop} active={false}>
                    <span>icon</span>
                </Toggle>,
            )
            expect(Test.Toggle().Get.active()).toBe(false)
            rerender(
                <Toggle handleClick={Functions.noop} active>
                    <span>icon</span>
                </Toggle>,
            )
            expect(Test.Toggle().Get.active()).toBe(true)
        })

        it('should apply the active class when active', () => {
            Set.toggle({ active: true })
            expect(Test.Toggle().Get.className()).toContain('Toggle--active')
        })

        it('should apply activeColor as background when active', () => {
            const toggle = Set.toggle({ active: true, activeColor: '#00ff00' })
            expect(toggle.Get.style().backgroundColor).toBe('rgb(0, 255, 0)')
        })

        it('should not apply activeColor when inactive', () => {
            const toggle = Set.toggle({ active: false, activeColor: '#00ff00' })
            expect(toggle.Get.style().backgroundColor).toBe('')
        })
    })

    describe('Interaction', () => {
        it('should call handleClick on click', async () => {
            const handleClick = vi.fn()
            const toggle = Set.toggle({ handleClick })
            await toggle.Do.toggle()
            expect(handleClick).toHaveBeenCalledTimes(1)
        })

        it('should call handleClick on Enter key', () => {
            const handleClick = vi.fn()
            Set.toggle({ handleClick })
            fireEvent.keyDown(screen.getByRole('switch'), { key: 'Enter' })
            expect(handleClick).toHaveBeenCalledTimes(1)
        })

        it('should call handleClick on Space key', () => {
            const handleClick = vi.fn()
            Set.toggle({ handleClick })
            fireEvent.keyDown(screen.getByRole('switch'), { key: ' ' })
            expect(handleClick).toHaveBeenCalledTimes(1)
        })

        it('should not call handleClick on other keys', () => {
            const handleClick = vi.fn()
            Set.toggle({ handleClick })
            fireEvent.keyDown(screen.getByRole('switch'), { key: 'Tab' })
            expect(handleClick).not.toHaveBeenCalled()
        })
    })
})
