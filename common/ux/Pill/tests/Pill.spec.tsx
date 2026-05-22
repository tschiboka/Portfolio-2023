import { render, screen } from '@testing-library/react'
import { Pill } from '../Pill'
import { Test } from '@common/ux/Test'

describe('Pill', () => {
    it('should render the label', () => {
        render(<Pill label="Active" />)
        expect(screen.getByText('Active')).toBeInTheDocument()
    })

    it('should default to accent color', () => {
        render(<Pill label="Default" />)
        expect(Test.Pill('Default').Get.color()).toBe('accent')
    })

    it('should apply the specified color', () => {
        render(<Pill label="Error" color="error" />)
        expect(Test.Pill('Error').Get.color()).toBe('error')
    })

    it('should default to outlined variant', () => {
        render(<Pill label="Outlined" />)
        expect(Test.Pill('Outlined').Get.variant()).toBe('outlined')
    })

    it('should apply solid variant', () => {
        render(<Pill label="Solid" variant="solid" />)
        expect(Test.Pill('Solid').Get.variant()).toBe('solid')
        expect(Test.Pill('Solid').Get.className()).toContain('Pill--solid')
    })

    it('should apply outlined variant explicitly', () => {
        render(<Pill label="Explicit" variant="outlined" />)
        expect(Test.Pill('Explicit').Get.variant()).toBe('outlined')
        expect(Test.Pill('Explicit').Get.className()).toContain('Pill--outlined')
    })

    it('should render with ariaLabel', () => {
        render(<Pill label="Status" ariaLabel="status pill" />)
        expect(Test.Pill.ByLabel('status pill').Get.label()).toBe('Status')
    })

    it('should apply className', () => {
        render(<Pill label="Custom" className="my-pill" />)
        expect(Test.Pill('Custom').Get.className()).toContain('my-pill')
    })

    it('should merge custom style', () => {
        render(<Pill label="Styled" style={{ margin: '4px' }} />)
        expect(Test.Pill('Styled').Get.style().margin).toBe('4px')
    })

    it.each([
        ['accent'],
        ['error'],
        ['success'],
        ['yellow'],
        ['orange'],
        ['purple'],
        ['gray'],
    ] as const)('should apply %s color class', (color) => {
        render(<Pill label={color} color={color} />)
        const pill = Test.Pill(color)
        expect(pill.Get.color()).toBe(color)
    })
})
