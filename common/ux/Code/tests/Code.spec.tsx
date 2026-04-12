import { render, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Code } from '..'

// ── Mocks ────────────────────────────────────────────────────────────────────
jest.mock('react-syntax-highlighter', () => {
    const MockHighlighter = ({ children, language }: { children: string; language: string }) => (
        <pre data-testid="syntax-highlighter" data-language={language}>
            {children}
        </pre>
    )
    MockHighlighter.displayName = 'SyntaxHighlighter'
    return { __esModule: true, default: MockHighlighter }
})

jest.mock('react-syntax-highlighter/dist/esm/styles/hljs', () => ({
    atomOneDark: {},
}))

jest.mock('react-icons/ai', () => ({
    AiFillSave: (props: React.HTMLAttributes<HTMLSpanElement>) => (
        <span data-testid="copy-icon" {...props} />
    ),
}))

const mockCopyToClipboard = jest.fn().mockResolvedValue(undefined)
jest.mock('@common/utils/Browser', () => ({
    Browser: {
        copyToClipboard: (...args: unknown[]): Promise<void> =>
            mockCopyToClipboard(...args) as Promise<void>,
    },
}))

// ═════════════════════════════════════════════════════════════════════════════
// Tests
// ═════════════════════════════════════════════════════════════════════════════

describe('Code', () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime })

    beforeEach(() => {
        jest.useFakeTimers()
        mockCopyToClipboard.mockClear()
    })

    afterEach(() => {
        jest.useRealTimers()
    })

    // ── Rendering ────────────────────────────────────────────────────────
    describe('rendering', () => {
        it('should render the root .Code container', () => {
            const { container } = render(<Code language="javascript" content="const x = 1" />)
            expect(container.querySelector('.Code')).toBeInTheDocument()
        })

        it('should render the file name when provided', () => {
            render(<Code fileName="index.js" language="javascript" content="const x = 1" />)
            expect(screen.getByText('index.js')).toBeInTheDocument()
        })

        it('should render the file name span as empty when fileName is omitted', () => {
            const { container } = render(<Code language="javascript" content="const x = 1" />)
            const fileNameSpan = container.querySelector('.Code__file-name')
            expect(fileNameSpan).toBeInTheDocument()
            expect(fileNameSpan).toHaveTextContent('')
        })

        it('should render the language in brackets', () => {
            render(<Code language="typescript" content="const x: number = 1" />)
            expect(screen.getByText('[typescript]')).toBeInTheDocument()
        })

        it('should render the language span with correct class', () => {
            const { container } = render(<Code language="python" content="x = 1" />)
            const langSpan = container.querySelector('.Code__language')
            expect(langSpan).toBeInTheDocument()
            expect(langSpan).toHaveTextContent('[python]')
        })

        it('should pass content to SyntaxHighlighter', () => {
            const content = 'function hello() { return "world" }'
            render(<Code language="javascript" content={content} />)
            const highlighter = screen.getByTestId('syntax-highlighter')
            expect(highlighter).toHaveTextContent(content)
        })

        it('should pass language to SyntaxHighlighter', () => {
            render(<Code language="ruby" content="puts 'hi'" />)
            const highlighter = screen.getByTestId('syntax-highlighter')
            expect(highlighter).toHaveAttribute('data-language', 'ruby')
        })

        it('should render the copy icon', () => {
            render(<Code language="javascript" content="x" />)
            expect(screen.getByTestId('copy-icon')).toBeInTheDocument()
        })

        it('should render the copy icon with correct class', () => {
            render(<Code language="javascript" content="x" />)
            expect(screen.getByTestId('copy-icon')).toHaveClass('Code__copy-icon')
        })

        it('should not show copy message initially', () => {
            render(<Code language="javascript" content="x" />)
            expect(screen.queryByText('Copied')).not.toBeInTheDocument()
        })
    })

    // ── Copy behaviour ───────────────────────────────────────────────────
    describe('copy behaviour', () => {
        it('should call copyToClipboard with content when icon is clicked', async () => {
            const content = 'const myCode = true'
            render(<Code language="javascript" content={content} />)

            await user.click(screen.getByTestId('copy-icon'))

            expect(mockCopyToClipboard).toHaveBeenCalledWith(content)
        })

        it('should call copyToClipboard exactly once per click', async () => {
            render(<Code language="javascript" content="x" />)

            await user.click(screen.getByTestId('copy-icon'))

            expect(mockCopyToClipboard).toHaveBeenCalledTimes(1)
        })

        it('should show "Copied" message after clicking the icon', async () => {
            render(<Code language="javascript" content="x" />)

            await user.click(screen.getByTestId('copy-icon'))

            expect(screen.getByText('Copied')).toBeInTheDocument()
        })

        it('should render the copy message with correct class', async () => {
            const { container } = render(<Code language="javascript" content="x" />)

            await user.click(screen.getByTestId('copy-icon'))

            const msg = container.querySelector('.Code__copy-message')
            expect(msg).toBeInTheDocument()
            expect(msg).toHaveTextContent('Copied')
        })

        it('should hide "Copied" message after 2 seconds', async () => {
            render(<Code language="javascript" content="x" />)

            await user.click(screen.getByTestId('copy-icon'))
            expect(screen.getByText('Copied')).toBeInTheDocument()

            act(() => {
                jest.advanceTimersByTime(2000)
            })

            expect(screen.queryByText('Copied')).not.toBeInTheDocument()
        })

        it('should still show "Copied" message before 2 seconds elapse', async () => {
            render(<Code language="javascript" content="x" />)

            await user.click(screen.getByTestId('copy-icon'))

            act(() => {
                jest.advanceTimersByTime(1999)
            })

            expect(screen.getByText('Copied')).toBeInTheDocument()
        })

        it('should handle multiple clicks — each click resets the message', async () => {
            render(<Code language="javascript" content="x" />)

            await user.click(screen.getByTestId('copy-icon'))
            expect(screen.getByText('Copied')).toBeInTheDocument()

            act(() => {
                jest.advanceTimersByTime(1000)
            })

            await user.click(screen.getByTestId('copy-icon'))
            expect(screen.getByText('Copied')).toBeInTheDocument()

            expect(mockCopyToClipboard).toHaveBeenCalledTimes(2)
        })

        it('should call copyToClipboard with the exact content passed as prop', async () => {
            const multiline = 'line1\nline2\nline3'
            render(<Code language="javascript" content={multiline} />)

            await user.click(screen.getByTestId('copy-icon'))

            expect(mockCopyToClipboard).toHaveBeenCalledWith(multiline)
        })
    })

    // ── Header structure ─────────────────────────────────────────────────
    describe('header structure', () => {
        it('should render the header container', () => {
            const { container } = render(
                <Code fileName="app.ts" language="typescript" content="x" />,
            )
            expect(container.querySelector('.Code__header')).toBeInTheDocument()
        })

        it('should render fileName before language in the header', () => {
            const { container } = render(
                <Code fileName="app.ts" language="typescript" content="x" />,
            )
            const header = container.querySelector('.Code__header')
            const children = header?.children
            expect(children?.[0]).toHaveClass('Code__file-name')
            expect(children?.[1]).toHaveClass('Code__language')
        })
    })

    // ── Different content / languages ────────────────────────────────────
    describe('with various languages and content', () => {
        it('should render with HTML language', () => {
            render(<Code language="html" content="<div>Hello</div>" />)
            expect(screen.getByText('[html]')).toBeInTheDocument()
            expect(screen.getByTestId('syntax-highlighter')).toHaveAttribute(
                'data-language',
                'html',
            )
        })

        it('should render with CSS language', () => {
            render(<Code language="css" content=".class { color: red }" />)
            expect(screen.getByText('[css]')).toBeInTheDocument()
        })

        it('should render empty content', () => {
            render(<Code language="javascript" content="" />)
            const highlighter = screen.getByTestId('syntax-highlighter')
            expect(highlighter).toHaveTextContent('')
        })

        it('should render content with special characters', () => {
            const content = 'const x = a < b && c > d'
            render(<Code language="javascript" content={content} />)
            expect(screen.getByTestId('syntax-highlighter')).toHaveTextContent(content)
        })
    })
})
