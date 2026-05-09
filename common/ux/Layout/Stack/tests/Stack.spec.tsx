import { render, screen } from '@testing-library/react'
import { Stack } from '../Stack'
import { selectAlign, selectJustify } from '../Stack.selectors'
import { StackProps } from '../Stack.types'
import { Accessor } from '../../../Test'

type SetProps = Omit<StackProps, 'ariaLabel' | 'children'> & {
    ariaLabel: string
    children?: React.ReactNode
}

const Set = {
    stack: ({ children, ...props }: SetProps) => {
        render(<Stack {...props}>{children ?? <span>x</span>}</Stack>)
        return new Accessor(screen.getByLabelText(props.ariaLabel), `Stack(${props.ariaLabel})`)
    },
    vertical: ({ children, ...props }: SetProps) => {
        render(<Stack.Vertical {...props}>{children ?? <span>x</span>}</Stack.Vertical>)
        return new Accessor(
            screen.getByLabelText(props.ariaLabel),
            `Stack.Vertical(${props.ariaLabel})`,
        )
    },
    horizontal: ({ children, ...props }: SetProps) => {
        render(<Stack.Horizontal {...props}>{children ?? <span>x</span>}</Stack.Horizontal>)
        return new Accessor(
            screen.getByLabelText(props.ariaLabel),
            `Stack.Horizontal(${props.ariaLabel})`,
        )
    },
}

describe('Stack', () => {
    describe('selectAlign', () => {
        const cases: { input: Parameters<typeof selectAlign>[0]; expected: string | undefined }[] =
            [
                { input: 'start', expected: 'flex-start' },
                { input: 'center', expected: 'center' },
                { input: 'end', expected: 'flex-end' },
                { input: 'stretch', expected: 'stretch' },
                { input: undefined, expected: undefined },
            ]

        cases.forEach(({ input, expected }) => {
            it(`should map "${String(input)}" to "${String(expected)}"`, () => {
                expect(selectAlign(input)).toBe(expected)
            })
        })
    })

    describe('selectJustify', () => {
        const cases: {
            input: Parameters<typeof selectJustify>[0]
            expected: string | undefined
        }[] = [
            { input: 'start', expected: 'flex-start' },
            { input: 'center', expected: 'center' },
            { input: 'end', expected: 'flex-end' },
            { input: 'between', expected: 'space-between' },
            { input: 'around', expected: 'space-around' },
            { input: undefined, expected: undefined },
        ]

        cases.forEach(({ input, expected }) => {
            it(`should map "${String(input)}" to "${String(expected)}"`, () => {
                expect(selectJustify(input)).toBe(expected)
            })
        })
    })

    describe('rendering', () => {
        it('should render children', () => {
            const stack = Set.stack({ ariaLabel: 'children', children: <span>child</span> })
            expect(stack.Get.byText('child')).toBeInTheDocument()
        })

        it('should default to column direction', () => {
            const stack = Set.stack({ ariaLabel: 'col' })
            expect(stack.Get.style().flexDirection).toBe('column')
        })

        it('should render as div by default', () => {
            const stack = Set.stack({ ariaLabel: 'def' })
            expect(stack.Get.tagName()).toBe('DIV')
        })

        it('should render as a custom element via "as" prop', () => {
            const stack = Set.stack({ as: 'section', ariaLabel: 'sec' })
            expect(stack.Get.tagName()).toBe('SECTION')
        })
    })

    describe('alignment', () => {
        const alignCases: { align: 'start' | 'center' | 'end' | 'stretch'; expected: string }[] = [
            { align: 'start', expected: 'flex-start' },
            { align: 'center', expected: 'center' },
            { align: 'end', expected: 'flex-end' },
            { align: 'stretch', expected: 'stretch' },
        ]

        alignCases.forEach(({ align, expected }) => {
            it(`should set alignItems to "${expected}" when align="${align}"`, () => {
                const stack = Set.stack({ align, ariaLabel: `a-${align}` })
                expect(stack.Get.style().alignItems).toBe(expected)
            })
        })

        const justifyCases: {
            justify: 'start' | 'center' | 'end' | 'between' | 'around'
            expected: string
        }[] = [
            { justify: 'start', expected: 'flex-start' },
            { justify: 'center', expected: 'center' },
            { justify: 'end', expected: 'flex-end' },
            { justify: 'between', expected: 'space-between' },
            { justify: 'around', expected: 'space-around' },
        ]

        justifyCases.forEach(({ justify, expected }) => {
            it(`should set justifyContent to "${expected}" when justify="${justify}"`, () => {
                const stack = Set.stack({ justify, ariaLabel: `j-${justify}` })
                expect(stack.Get.style().justifyContent).toBe(expected)
            })
        })
    })

    describe('gap', () => {
        it('should not set gap when not provided', () => {
            const stack = Set.stack({ ariaLabel: 'gap' })
            expect(stack.Get.style().gap).toBe('')
        })

        it('should apply custom gap', () => {
            const stack = Set.stack({ gap: '8', ariaLabel: 'g8' })
            expect(stack.Get.style().gap).toBe('8px')
        })
    })

    describe('wrap', () => {
        it('should apply wrap', () => {
            const stack = Set.stack({ wrap: true, ariaLabel: 'w' })
            expect(stack.Get.style().flexWrap).toBe('wrap')
        })

        it('should not set flexWrap when wrap is false', () => {
            const stack = Set.stack({ ariaLabel: 'nw' })
            expect(stack.Get.style().flexWrap).toBe('')
        })
    })

    describe('html attributes', () => {
        it('should apply ariaLabel', () => {
            Set.stack({ ariaLabel: 'test-label' })
            expect(screen.getByLabelText('test-label')).toBeInTheDocument()
        })

        it('should apply className', () => {
            const stack = Set.stack({ className: 'my-stack', ariaLabel: 'cls' })
            expect(stack.Get.className()).toBe('my-stack')
        })

        it('should apply custom style', () => {
            const stack = Set.stack({ style: { background: 'red' }, ariaLabel: 'st' })
            expect(stack.Get.style().background).toBe('red')
        })
    })

    describe('Vertical', () => {
        it('should render with column direction', () => {
            const stack = Set.vertical({ ariaLabel: 'vert' })
            expect(stack.Get.style().flexDirection).toBe('column')
        })

        it('should pass through all props', () => {
            const stack = Set.vertical({
                align: 'end',
                justify: 'center',
                gap: '4',
                wrap: true,
                ariaLabel: 'vert-stack',
            })
            expect(stack.Get.style().alignItems).toBe('flex-end')
            expect(stack.Get.style().justifyContent).toBe('center')
            expect(stack.Get.style().gap).toBe('4px')
            expect(stack.Get.style().flexWrap).toBe('wrap')
        })
    })

    describe('Horizontal', () => {
        it('should render with row direction', () => {
            const stack = Set.horizontal({ ariaLabel: 'horiz' })
            expect(stack.Get.style().flexDirection).toBe('row')
        })

        it('should pass through all props', () => {
            const stack = Set.horizontal({
                align: 'start',
                justify: 'around',
                gap: '24',
                ariaLabel: 'horiz-stack',
            })
            expect(stack.Get.style().alignItems).toBe('flex-start')
            expect(stack.Get.style().justifyContent).toBe('space-around')
            expect(stack.Get.style().gap).toBe('24px')
        })

        it('should render as a custom element', () => {
            const stack = Set.horizontal({ as: 'nav', ariaLabel: 'nav-stack' })
            expect(stack.Get.tagName()).toBe('NAV')
        })
    })
})
