import { render, screen } from '@testing-library/react'
import { Stack } from '../Stack'
import { selectAlign, selectJustify } from '../Stack.selectors'

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
            render(
                <Stack>
                    <span>child</span>
                </Stack>,
            )
            expect(screen.getByText('child')).toBeInTheDocument()
        })

        it('should default to column direction', () => {
            render(
                <Stack>
                    <span>col</span>
                </Stack>,
            )
            const el = screen.getByText('col').parentElement!
            expect(el.style.flexDirection).toBe('column')
        })

        it('should render as div by default', () => {
            render(
                <Stack ariaLabel="def">
                    <span>div</span>
                </Stack>,
            )
            const el = screen.getByLabelText('def')
            expect(el.tagName).toBe('DIV')
        })

        it('should render as a custom element via "as" prop', () => {
            render(
                <Stack as="section" ariaLabel="sec">
                    <span>as</span>
                </Stack>,
            )
            const el = screen.getByLabelText('sec')
            expect(el.tagName).toBe('SECTION')
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
                render(
                    <Stack align={align} ariaLabel={`a-${align}`}>
                        <span>a</span>
                    </Stack>,
                )
                expect(screen.getByLabelText(`a-${align}`).style.alignItems).toBe(expected)
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
                render(
                    <Stack justify={justify} ariaLabel={`j-${justify}`}>
                        <span>j</span>
                    </Stack>,
                )
                expect(screen.getByLabelText(`j-${justify}`).style.justifyContent).toBe(expected)
            })
        })
    })

    describe('gap', () => {
        it('should not set gap when not provided', () => {
            render(
                <Stack>
                    <span>gap</span>
                </Stack>,
            )
            const el = screen.getByText('gap').parentElement!
            expect(el.style.gap).toBe('')
        })

        it('should apply custom gap', () => {
            render(
                <Stack gap="8">
                    <span>g8</span>
                </Stack>,
            )
            const el = screen.getByText('g8').parentElement!
            expect(el.style.gap).toBe('8px')
        })
    })

    describe('wrap', () => {
        it('should apply wrap', () => {
            render(
                <Stack wrap>
                    <span>w</span>
                </Stack>,
            )
            const el = screen.getByText('w').parentElement!
            expect(el.style.flexWrap).toBe('wrap')
        })

        it('should not set flexWrap when wrap is false', () => {
            render(
                <Stack>
                    <span>nw</span>
                </Stack>,
            )
            const el = screen.getByText('nw').parentElement!
            expect(el.style.flexWrap).toBe('')
        })
    })

    describe('html attributes', () => {
        it('should apply ariaLabel', () => {
            render(
                <Stack ariaLabel="test-label">
                    <span>a</span>
                </Stack>,
            )
            expect(screen.getByLabelText('test-label')).toBeInTheDocument()
        })

        it('should apply className', () => {
            render(
                <Stack className="my-stack">
                    <span>cls</span>
                </Stack>,
            )
            const el = screen.getByText('cls').parentElement!
            expect(el.className).toBe('my-stack')
        })

        it('should apply custom style', () => {
            render(
                <Stack style={{ background: 'red' }}>
                    <span>st</span>
                </Stack>,
            )
            const el = screen.getByText('st').parentElement!
            expect(el.style.background).toBe('red')
        })
    })

    describe('Vertical', () => {
        it('should render with column direction', () => {
            render(
                <Stack.Vertical>
                    <span>vert</span>
                </Stack.Vertical>,
            )
            const el = screen.getByText('vert').parentElement!
            expect(el.style.flexDirection).toBe('column')
        })

        it('should pass through all props', () => {
            render(
                <Stack.Vertical align="end" justify="center" gap={'4'} wrap ariaLabel="vert-stack">
                    <span>vp</span>
                </Stack.Vertical>,
            )
            const el = screen.getByLabelText('vert-stack')
            expect(el.style.alignItems).toBe('flex-end')
            expect(el.style.justifyContent).toBe('center')
            expect(el.style.gap).toBe('4px')
            expect(el.style.flexWrap).toBe('wrap')
        })
    })

    describe('Horizontal', () => {
        it('should render with row direction', () => {
            render(
                <Stack.Horizontal>
                    <span>horiz</span>
                </Stack.Horizontal>,
            )
            const el = screen.getByText('horiz').parentElement!
            expect(el.style.flexDirection).toBe('row')
        })

        it('should pass through all props', () => {
            render(
                <Stack.Horizontal align="start" justify="around" gap={'24'} ariaLabel="horiz-stack">
                    <span>hp</span>
                </Stack.Horizontal>,
            )
            const el = screen.getByLabelText('horiz-stack')
            expect(el.style.alignItems).toBe('flex-start')
            expect(el.style.justifyContent).toBe('space-around')
            expect(el.style.gap).toBe('24px')
        })

        it('should render as a custom element', () => {
            render(
                <Stack.Horizontal as="nav" ariaLabel="nav-stack">
                    <span>n</span>
                </Stack.Horizontal>,
            )
            const el = screen.getByLabelText('nav-stack')
            expect(el.tagName).toBe('NAV')
        })
    })
})
