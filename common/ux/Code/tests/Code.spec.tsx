import { waitFor } from '@testing-library/react'
import { Browser } from '@common/utils/Browser'
import { Accessor, Test } from '@common/ux/Test'

const LABEL = 'test-code'
const codeBlock = () => Test.Code('test-code')
const clickCopyIcon = async () => Accessor.user.click(codeBlock().Get.copyIcon())

const mockCopyToClipboard = vi.fn().mockResolvedValue(undefined)

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
            Test.Code.Set.mock({ ariaLabel: LABEL, language: 'javascript', content: 'const x = 1' })
            expect(codeBlock().Get.className()).toBe('Code')
        })

        it('should render the file name when provided', () => {
            Test.Code.Set.mock({
                ariaLabel: LABEL,
                fileName: 'index.js',
                language: 'javascript',
                content: 'const x = 1',
            })
            expect(codeBlock().Get.byText('index.js')).toBeInTheDocument()
        })

        it('should render the file name span as empty when fileName is omitted', () => {
            Test.Code.Set.mock({ ariaLabel: LABEL, language: 'javascript', content: 'const x = 1' })
            const fileNameSpan = codeBlock().Get.fileName()
            expect(fileNameSpan).toBeInTheDocument()
            expect(fileNameSpan).toHaveTextContent('')
        })

        it('should render the language in brackets', () => {
            Test.Code.Set.mock({
                ariaLabel: LABEL,
                language: 'typescript',
                content: 'const x: number = 1',
            })
            expect(codeBlock().Get.byText('[typescript]')).toBeInTheDocument()
        })

        it('should render the language span with correct class', () => {
            Test.Code.Set.mock({ ariaLabel: LABEL, language: 'python', content: 'x = 1' })
            const langSpan = codeBlock().Get.language()
            expect(langSpan).toBeInTheDocument()
            expect(langSpan).toHaveTextContent('[python]')
        })

        it('should pass content to SyntaxHighlighter', () => {
            const content = 'function hello() { return "world" }'
            Test.Code.Set.mock({ ariaLabel: LABEL, language: 'javascript', content })
            expect(codeBlock().Get.highlighter()).toHaveTextContent(content)
        })

        it('should pass language to SyntaxHighlighter', () => {
            Test.Code.Set.mock({ ariaLabel: LABEL, language: 'ruby', content: "puts 'hi'" })
            expect(codeBlock().Get.highlighterCode()).toHaveClass('language-ruby')
        })

        it('should render the copy icon', () => {
            Test.Code.Set.mock({ ariaLabel: LABEL, language: 'javascript', content: 'x' })
            expect(codeBlock().Get.copyIcon()).toBeInTheDocument()
        })

        it('should render the copy icon with correct class', () => {
            Test.Code.Set.mock({ ariaLabel: LABEL, language: 'javascript', content: 'x' })
            expect(codeBlock().Get.copyIcon()).toHaveClass('Code__copy-icon')
        })

        it('should not show copy message initially', () => {
            Test.Code.Set.mock({ ariaLabel: LABEL, language: 'javascript', content: 'x' })
            expect(codeBlock().Has.copyMessage()).toBe(false)
        })
    })

    describe('copy behaviour', () => {
        it('should call copyToClipboard with content when icon is clicked', async () => {
            const content = 'const myCode = true'
            Test.Code.Set.mock({ ariaLabel: LABEL, language: 'javascript', content })

            await clickCopyIcon()

            expect(mockCopyToClipboard).toHaveBeenCalledWith(content)
        })

        it('should call copyToClipboard exactly once per click', async () => {
            Test.Code.Set.mock({ ariaLabel: LABEL, language: 'javascript', content: 'x' })

            await clickCopyIcon()

            expect(mockCopyToClipboard).toHaveBeenCalledTimes(1)
        })

        it('should show "Copied" message after clicking the icon', async () => {
            Test.Code.Set.mock({ ariaLabel: LABEL, language: 'javascript', content: 'x' })

            await clickCopyIcon()

            expect(codeBlock().Get.byText('Copied')).toBeInTheDocument()
        })

        it('should render the copy message with correct class', async () => {
            Test.Code.Set.mock({ ariaLabel: LABEL, language: 'javascript', content: 'x' })

            await clickCopyIcon()

            const msg = codeBlock().Get.copyMessage()
            expect(msg).toBeInTheDocument()
            expect(msg).toHaveTextContent('Copied')
        })

        it('should hide "Copied" message after 2 seconds', async () => {
            Test.Code.Set.mock({ ariaLabel: LABEL, language: 'javascript', content: 'x' })

            await clickCopyIcon()
            expect(codeBlock().Get.byText('Copied')).toBeInTheDocument()

            vi.advanceTimersByTime(2000)

            await waitFor(() => expect(codeBlock().Has.copyMessage()).toBe(false))
        })

        it('should still show "Copied" message before 2 seconds elapse', async () => {
            Test.Code.Set.mock({ ariaLabel: LABEL, language: 'javascript', content: 'x' })

            await clickCopyIcon()

            vi.advanceTimersByTime(1900)

            expect(codeBlock().Get.byText('Copied')).toBeInTheDocument()
        })

        it('should handle multiple clicks — each click resets the message', async () => {
            Test.Code.Set.mock({ ariaLabel: LABEL, language: 'javascript', content: 'x' })

            await clickCopyIcon()
            expect(codeBlock().Get.byText('Copied')).toBeInTheDocument()

            vi.advanceTimersByTime(1000)

            await clickCopyIcon()
            expect(codeBlock().Get.byText('Copied')).toBeInTheDocument()

            expect(mockCopyToClipboard).toHaveBeenCalledTimes(2)
        })

        it('should call copyToClipboard with the exact content passed as prop', async () => {
            const multiline = 'line1\nline2\nline3'
            Test.Code.Set.mock({ ariaLabel: LABEL, language: 'javascript', content: multiline })

            await clickCopyIcon()

            expect(mockCopyToClipboard).toHaveBeenCalledWith(multiline)
        })
    })

    describe('header structure', () => {
        it('should render the header container', () => {
            Test.Code.Set.mock({
                ariaLabel: LABEL,
                fileName: 'app.ts',
                language: 'typescript',
                content: 'x',
            })
            expect(codeBlock().Get.header()).toBeInTheDocument()
        })

        it('should render fileName before language in the header', () => {
            Test.Code.Set.mock({
                ariaLabel: LABEL,
                fileName: 'app.ts',
                language: 'typescript',
                content: 'x',
            })
            const header = codeBlock().Get.header()
            const children = header?.children
            expect(children?.[0]).toHaveClass('Code__file-name')
            expect(children?.[1]).toHaveClass('Code__language')
        })
    })

    describe('with various languages and content', () => {
        it('should render with HTML language', () => {
            Test.Code.Set.mock({ ariaLabel: LABEL, language: 'html', content: '<div>Hello</div>' })
            expect(codeBlock().Get.byText('[html]')).toBeInTheDocument()
            expect(codeBlock().Get.highlighterCode()).toHaveClass('language-html')
        })

        it('should render with CSS language', () => {
            Test.Code.Set.mock({
                ariaLabel: LABEL,
                language: 'css',
                content: '.class { color: red }',
            })
            expect(codeBlock().Get.byText('[css]')).toBeInTheDocument()
        })

        it('should render empty content', () => {
            Test.Code.Set.mock({ ariaLabel: LABEL, language: 'javascript', content: '' })
            expect(codeBlock().Get.highlighter()).toHaveTextContent('')
        })

        it('should render content with special characters', () => {
            const content = 'const x = a < b && c > d'
            Test.Code.Set.mock({ ariaLabel: LABEL, language: 'javascript', content })
            expect(codeBlock().Get.highlighter()).toHaveTextContent(content)
        })
    })
})
