import { act } from '@testing-library/react'
import { Browser } from '@common/utils/Browser'
import { Test } from '../../Test'

const { Code } = Test

const mockCopyToClipboard = vi.fn().mockResolvedValue(undefined)

// ═════════════════════════════════════════════════════════════════════════════
// Tests
// ═════════════════════════════════════════════════════════════════════════════

describe('Code', () => {
    beforeEach(() => {
        vi.useFakeTimers({ shouldAdvanceTime: true })
        mockCopyToClipboard.mockClear()
        vi.spyOn(Browser, 'copyToClipboard').mockImplementation(mockCopyToClipboard)
    })

    afterEach(() => {
        vi.restoreAllMocks()
        vi.useRealTimers()
    })

    describe('rendering', () => {
        it('should render the root .Code container', () => {
            const { container } = Code.Set.mock({ language: 'javascript', content: 'const x = 1' })
            expect(Code.Get.root(container)).toBeInTheDocument()
        })

        it('should render the file name when provided', () => {
            Code.Set.mock({ fileName: 'index.js', language: 'javascript', content: 'const x = 1' })
            expect(Code.Get.text('index.js')).toBeInTheDocument()
        })

        it('should render the file name span as empty when fileName is omitted', () => {
            const { container } = Code.Set.mock({ language: 'javascript', content: 'const x = 1' })
            const fileNameSpan = Code.Get.fileName(container)
            expect(fileNameSpan).toBeInTheDocument()
            expect(fileNameSpan).toHaveTextContent('')
        })

        it('should render the language in brackets', () => {
            Code.Set.mock({ language: 'typescript', content: 'const x: number = 1' })
            expect(Code.Get.text('[typescript]')).toBeInTheDocument()
        })

        it('should render the language span with correct class', () => {
            const { container } = Code.Set.mock({ language: 'python', content: 'x = 1' })
            const langSpan = Code.Get.language(container)
            expect(langSpan).toBeInTheDocument()
            expect(langSpan).toHaveTextContent('[python]')
        })

        it('should pass content to SyntaxHighlighter', () => {
            const content = 'function hello() { return "world" }'
            Code.Set.mock({ language: 'javascript', content })
            expect(Code.Get.highlighter()).toHaveTextContent(content)
        })

        it('should pass language to SyntaxHighlighter', () => {
            Code.Set.mock({ language: 'ruby', content: "puts 'hi'" })
            expect(Code.Get.highlighterCode()).toHaveClass('language-ruby')
        })

        it('should render the copy icon', () => {
            Code.Set.mock({ language: 'javascript', content: 'x' })
            expect(Code.Get.copyIcon()).toBeInTheDocument()
        })

        it('should render the copy icon with correct class', () => {
            Code.Set.mock({ language: 'javascript', content: 'x' })
            expect(Code.Get.copyIcon()).toHaveClass('Code__copy-icon')
        })

        it('should not show copy message initially', () => {
            Code.Set.mock({ language: 'javascript', content: 'x' })
            expect(Code.Query.copyMessage()).not.toBeInTheDocument()
        })
    })

    describe('copy behaviour', () => {
        it('should call copyToClipboard with content when icon is clicked', async () => {
            const content = 'const myCode = true'
            Code.Set.mock({ language: 'javascript', content })

            await Code.Click.copyIcon()

            expect(mockCopyToClipboard).toHaveBeenCalledWith(content)
        })

        it('should call copyToClipboard exactly once per click', async () => {
            Code.Set.mock({ language: 'javascript', content: 'x' })

            await Code.Click.copyIcon()

            expect(mockCopyToClipboard).toHaveBeenCalledTimes(1)
        })

        it('should show "Copied" message after clicking the icon', async () => {
            Code.Set.mock({ language: 'javascript', content: 'x' })

            await Code.Click.copyIcon()

            expect(Code.Get.text('Copied')).toBeInTheDocument()
        })

        it('should render the copy message with correct class', async () => {
            const { container } = Code.Set.mock({ language: 'javascript', content: 'x' })

            await Code.Click.copyIcon()

            const msg = Code.Get.copyMessage(container)
            expect(msg).toBeInTheDocument()
            expect(msg).toHaveTextContent('Copied')
        })

        it('should hide "Copied" message after 2 seconds', async () => {
            Code.Set.mock({ language: 'javascript', content: 'x' })

            await Code.Click.copyIcon()
            expect(Code.Get.text('Copied')).toBeInTheDocument()

            act(() => {
                vi.advanceTimersByTime(2000)
            })

            expect(Code.Query.copyMessage()).not.toBeInTheDocument()
        })

        it('should still show "Copied" message before 2 seconds elapse', async () => {
            Code.Set.mock({ language: 'javascript', content: 'x' })

            await Code.Click.copyIcon()

            act(() => {
                vi.advanceTimersByTime(1900)
            })

            expect(Code.Get.text('Copied')).toBeInTheDocument()
        })

        it('should handle multiple clicks — each click resets the message', async () => {
            Code.Set.mock({ language: 'javascript', content: 'x' })

            await Code.Click.copyIcon()
            expect(Code.Get.text('Copied')).toBeInTheDocument()

            act(() => {
                vi.advanceTimersByTime(1000)
            })

            await Code.Click.copyIcon()
            expect(Code.Get.text('Copied')).toBeInTheDocument()

            expect(mockCopyToClipboard).toHaveBeenCalledTimes(2)
        })

        it('should call copyToClipboard with the exact content passed as prop', async () => {
            const multiline = 'line1\nline2\nline3'
            Code.Set.mock({ language: 'javascript', content: multiline })

            await Code.Click.copyIcon()

            expect(mockCopyToClipboard).toHaveBeenCalledWith(multiline)
        })
    })

    describe('header structure', () => {
        it('should render the header container', () => {
            const { container } = Code.Set.mock({
                fileName: 'app.ts',
                language: 'typescript',
                content: 'x',
            })
            expect(Code.Get.header(container)).toBeInTheDocument()
        })

        it('should render fileName before language in the header', () => {
            const { container } = Code.Set.mock({
                fileName: 'app.ts',
                language: 'typescript',
                content: 'x',
            })
            const header = Code.Get.header(container)
            const children = header?.children
            expect(children?.[0]).toHaveClass('Code__file-name')
            expect(children?.[1]).toHaveClass('Code__language')
        })
    })

    describe('with various languages and content', () => {
        it('should render with HTML language', () => {
            Code.Set.mock({ language: 'html', content: '<div>Hello</div>' })
            expect(Code.Get.text('[html]')).toBeInTheDocument()
            expect(Code.Get.highlighterCode()).toHaveClass('language-html')
        })

        it('should render with CSS language', () => {
            Code.Set.mock({ language: 'css', content: '.class { color: red }' })
            expect(Code.Get.text('[css]')).toBeInTheDocument()
        })

        it('should render empty content', () => {
            Code.Set.mock({ language: 'javascript', content: '' })
            expect(Code.Get.highlighter()).toHaveTextContent('')
        })

        it('should render content with special characters', () => {
            const content = 'const x = a < b && c > d'
            Code.Set.mock({ language: 'javascript', content })
            expect(Code.Get.highlighter()).toHaveTextContent(content)
        })
    })
})
