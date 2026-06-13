import type { MockInstance } from 'vitest'
import { Browser } from '../index'
import { renderHook, act } from '@testing-library/react'
import { useIsVisible } from '../useIsVisible'
import { slugify } from '../slugify'

const { copyToClipboard } = Browser

const observeMock = vi.fn()
const unobserveMock = vi.fn()
const disconnectMock = vi.fn()

interface MockObserver {
    observe: ReturnType<typeof vi.fn>
    unobserve: ReturnType<typeof vi.fn>
    disconnect: ReturnType<typeof vi.fn>
    trigger: (entries: Partial<IntersectionObserverEntry>[]) => void
}

let latestInstance: MockObserver
let instances: MockObserver[] = []

const IntersectionObserverMock = vi.fn((callback: IntersectionObserverCallback) => {
    latestInstance = {
        observe: observeMock,
        unobserve: unobserveMock,
        disconnect: disconnectMock,
        trigger: (entries: Partial<IntersectionObserverEntry>[]) => {
            callback(
                entries as IntersectionObserverEntry[],
                latestInstance as unknown as IntersectionObserver,
            )
        },
    }

    return latestInstance
})

vi.stubGlobal('IntersectionObserver', IntersectionObserverMock)

describe('Browser', () => {
    describe('copyToClipboard', () => {
        beforeEach(() => {
            instances = [] // Reset instances before each test
        })

        afterEach(() => {
            vi.restoreAllMocks()
        })

        describe('when navigator.clipboard is available', () => {
            const writeTextMock = vi.fn().mockResolvedValue(undefined)

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
            let execCommandMock: MockInstance

            beforeEach(() => {
                // Remove clipboard to trigger fallback
                // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
                delete (navigator as any).clipboard
                execCommandMock = vi.fn().mockReturnValue(true) as unknown as MockInstance
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

    // --------------------
    // useIsVisible tests
    // --------------------
    describe('useIsVisible', () => {
        beforeEach(() => {
            instances = []
        })

        class IntersectionObserverMock {
            callback: IntersectionObserverCallback
            observe = vi.fn()
            unobserve = vi.fn()
            disconnect = vi.fn()

            constructor(callback: IntersectionObserverCallback) {
                this.callback = callback
                instances.push(this)
            }

            trigger(entries: Partial<IntersectionObserverEntry>[]) {
                this.callback(
                    entries as IntersectionObserverEntry[],
                    this as unknown as IntersectionObserver,
                )
            }
        }

        globalThis.IntersectionObserver =
            IntersectionObserverMock as unknown as typeof IntersectionObserver

        function createElement() {
            return document.createElement('div')
        }

        it('observes multiple elements', () => {
            const el1 = createElement()
            const el2 = createElement()

            renderHook(() => useIsVisible([el1, el2]))

            const observer = instances[0]
            expect(observer.observe).toHaveBeenCalledTimes(2)
        })

        it('updates visibility when element intersects', () => {
            const el1 = createElement()
            const el2 = createElement()

            const { result } = renderHook(() => useIsVisible([el1, el2]))

            const observer = instances[0]

            act(() => {
                observer.trigger([
                    {
                        target: el1,
                        isIntersecting: true,
                    },
                ])
            })

            expect(result.current[0]).toEqual({ element: el1, isVisible: true })
        })

        it('tracks multiple elements independently', () => {
            const el1 = createElement()
            const el2 = createElement()

            const { result } = renderHook(() => useIsVisible([el1, el2]))

            const observer = instances[0]

            act(() => {
                observer.trigger([
                    {
                        target: el1,
                        isIntersecting: true,
                    },
                    {
                        target: el2,
                        isIntersecting: false,
                    },
                ])
            })

            expect(result.current).toEqual([
                { element: el1, isVisible: true },
                { element: el2, isVisible: false },
            ])
        })

        it('disconnects on unmount', () => {
            const el1 = createElement()

            const { unmount } = renderHook(() => useIsVisible([el1]))

            const observer = instances[0]

            unmount()

            expect(observer.disconnect).toHaveBeenCalled()
        })
    })
    describe('slugify', () => {
        it('should return an empty string for an empty input', () => {
            expect(slugify('')).toBe('')
        })

        it('should replace non-word characters with empty string', () => {
            expect(slugify('Hello World!')).toBe('hello-world')
        })

        it('should replace spaces with dashes', () => {
            expect(slugify('Hello World!')).toBe('hello-world')
            expect(slugify('Hello-World!')).toBe('hello-world')
        })

        it('should replace underscores with dashes', () => {
            expect(slugify('Hello_World!')).toBe('hello-world')
        })

        it('should replace multiple dashes with a single dash', () => {
            expect(slugify('Hello---World!')).toBe('hello-world')
        })
    })

    describe('isLocalhost', () => {
        it('should return true when hostname is localhost', () => {
            expect(Browser.isLocalhost('localhost')).toBe(true)
        })

        it('should return true when hostname is 127.0.0.1', () => {
            expect(Browser.isLocalhost('127.0.0.1')).toBe(true)
        })

        it('should return false for other hostnames', () => {
            expect(Browser.isLocalhost('example.com')).toBe(false)
        })

        it('should return false for production domain', () => {
            expect(Browser.isLocalhost('tschiboka.com')).toBe(false)
        })
    })
})
