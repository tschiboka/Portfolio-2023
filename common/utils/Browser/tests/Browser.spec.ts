import { Browser } from '../index'

const { copyToClipboard } = Browser

describe('Browser', () => {
    describe('copyToClipboard', () => {
        afterEach(() => {
            jest.restoreAllMocks()
        })

        describe('when navigator.clipboard is available', () => {
            const writeTextMock = jest.fn().mockResolvedValue(undefined)

            beforeEach(() => {
                Object.assign(navigator, {
                    clipboard: { writeText: writeTextMock },
                })
            })

            it.each([['hello world'], [''], ['special chars: <>&"\''], ['multi\nline\ntext']])(
                'should call navigator.clipboard.writeText with "%s"',
                async (text: string) => {
                    await copyToClipboard(text)
                    expect(writeTextMock).toHaveBeenCalledWith(text)
                },
            )

            it('should resolve without a value', async () => {
                const result = await copyToClipboard('test')
                expect(result).toBeUndefined()
            })

            it('should propagate clipboard errors', async () => {
                writeTextMock.mockRejectedValueOnce(new Error('Clipboard blocked'))
                await expect(copyToClipboard('fail')).rejects.toThrow('Clipboard blocked')
            })
        })

        describe('when navigator.clipboard is NOT available', () => {
            let execCommandMock: jest.SpyInstance

            beforeEach(() => {
                // Remove clipboard to trigger fallback
                // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
                delete (navigator as any).clipboard
                execCommandMock = jest.fn().mockReturnValue(true) as unknown as jest.SpyInstance
                document.execCommand = execCommandMock as unknown as typeof document.execCommand
            })

            it.each([['hello world'], [''], ['special chars: <>&"\'']])(
                'should fall back to document.execCommand for "%s"',
                async (text: string) => {
                    await copyToClipboard(text)
                    expect(execCommandMock).toHaveBeenCalledWith('copy', true, text)
                },
            )

            it('should return the execCommand result', async () => {
                execCommandMock.mockReturnValue(false)
                const result = await copyToClipboard('test')
                expect(result).toBe(false)
            })
        })
    })
})
