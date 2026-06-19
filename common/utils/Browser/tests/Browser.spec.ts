import type { MockInstance } from 'vitest'
import { Browser } from '../index'
import { renderHook, act } from '@testing-library/react'

const { copyToClipboard, useFullScreen } = Browser

// Vendor-prefixed Fullscreen API types — mirrors the hook's interfaces
interface FullScreenElement {
    requestFullscreen?: () => Promise<void>
    webkitRequestFullscreen?: () => Promise<void>
    msRequestFullscreen?: () => Promise<void>
}

interface FullScreenDocument {
    exitFullscreen?: () => Promise<void>
    webkitExitFullscreen?: () => Promise<void>
    msExitFullscreen?: () => Promise<void>
    fullscreenElement?: Element | null
}

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

            renderHook(() => Browser.useIsVisible([el1, el2]))

            const observer = instances[0]
            expect(observer.observe).toHaveBeenCalledTimes(2)
        })

        it('updates visibility when element intersects', () => {
            const el1 = createElement()
            const el2 = createElement()

            const { result } = renderHook(() => Browser.useIsVisible([el1, el2]))

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

            const { result } = renderHook(() => Browser.useIsVisible([el1, el2]))

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

            const { unmount } = renderHook(() => Browser.useIsVisible([el1]))

            const observer = instances[0]

            unmount()

            expect(observer.disconnect).toHaveBeenCalled()
        })
    })
    describe('slugify', () => {
        it('should return an empty string for an empty input', () => {
            expect(Browser.slugify('')).toBe('')
        })

        it('should replace non-word characters with empty string', () => {
            expect(Browser.slugify('Hello World!')).toBe('hello-world')
        })

        it('should replace spaces with dashes', () => {
            expect(Browser.slugify('Hello World!')).toBe('hello-world')
            expect(Browser.slugify('Hello-World!')).toBe('hello-world')
        })

        it('should replace underscores with dashes', () => {
            expect(Browser.slugify('Hello_World!')).toBe('hello-world')
        })

        it('should replace multiple dashes with a single dash', () => {
            expect(Browser.slugify('Hello---World!')).toBe('hello-world')
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

    // --------------------
    // useFullScreen tests
    // --------------------
    describe('useFullScreen', () => {
        afterEach(() => {
            vi.restoreAllMocks()
        })

        it('should start with isFullscreen set to false', () => {
            const { result } = renderHook(() => useFullScreen<HTMLDivElement>())
            expect(result.current.isFullscreen).toBe(false)
        })

        it('should return a ref, enterFullScreen, exitFullScreen and isFullscreen', () => {
            const { result } = renderHook(() => useFullScreen<HTMLDivElement>())
            expect(result.current).toHaveProperty('ref')
            expect(result.current).toHaveProperty('enterFullScreen')
            expect(result.current).toHaveProperty('exitFullScreen')
            expect(result.current).toHaveProperty('isFullscreen')
        })

        it('should call requestFullscreen on the element when enterFullScreen is called', () => {
            const requestFullscreen = vi.fn().mockResolvedValue(undefined)
            const { result } = renderHook(() => useFullScreen<HTMLDivElement>())

            // Attach a mock element to the ref
            const el = document.createElement('div')
            el.requestFullscreen = requestFullscreen
            ;(result.current.ref as React.MutableRefObject<HTMLDivElement>).current = el

            act(() => {
                result.current.enterFullScreen()
            })

            expect(requestFullscreen).toHaveBeenCalledTimes(1)
        })

        it('should call webkitRequestFullscreen when requestFullscreen is not available', () => {
            const webkitRequestFullscreen = vi.fn().mockResolvedValue(undefined)
            const { result } = renderHook(() => useFullScreen<HTMLDivElement>())

            const el = document.createElement('div') as unknown as FullScreenElement
            el.webkitRequestFullscreen = webkitRequestFullscreen
            ;(result.current.ref as React.MutableRefObject<HTMLDivElement>).current =
                el as HTMLDivElement

            act(() => {
                result.current.enterFullScreen()
            })

            expect(webkitRequestFullscreen).toHaveBeenCalledTimes(1)
        })

        it('should call msRequestFullscreen when standard and webkit are not available', () => {
            const msRequestFullscreen = vi.fn().mockResolvedValue(undefined)
            const { result } = renderHook(() => useFullScreen<HTMLDivElement>())

            const el = document.createElement('div') as unknown as FullScreenElement
            el.msRequestFullscreen = msRequestFullscreen
            ;(result.current.ref as React.MutableRefObject<HTMLDivElement>).current =
                el as HTMLDivElement

            act(() => {
                result.current.enterFullScreen()
            })

            expect(msRequestFullscreen).toHaveBeenCalledTimes(1)
        })

        it('should not throw when ref has no current element', () => {
            const { result } = renderHook(() => useFullScreen<HTMLDivElement>())

            expect(() => {
                act(() => {
                    result.current.enterFullScreen()
                })
            }).not.toThrow()
        })

        it('should call exitFullscreen on the document when exitFullScreen is called', () => {
            const exitFullscreen = vi.fn().mockResolvedValue(undefined)
            document.exitFullscreen = exitFullscreen

            const { result } = renderHook(() => useFullScreen<HTMLDivElement>())

            act(() => {
                result.current.exitFullScreen()
            })

            expect(exitFullscreen).toHaveBeenCalledTimes(1)
        })

        it('should call webkitExitFullscreen when exitFullscreen is not available', () => {
            const webkitExitFullscreen = vi.fn().mockResolvedValue(undefined)
            const fullDoc = document as unknown as FullScreenDocument
            fullDoc.webkitExitFullscreen = webkitExitFullscreen
            delete fullDoc.exitFullscreen

            const { result } = renderHook(() => useFullScreen<HTMLDivElement>())

            act(() => {
                result.current.exitFullScreen()
            })

            expect(webkitExitFullscreen).toHaveBeenCalledTimes(1)
        })

        it('should call msExitFullscreen when standard and webkit are not available', () => {
            const msExitFullscreen = vi.fn().mockResolvedValue(undefined)
            const fullDoc = document as unknown as FullScreenDocument
            fullDoc.msExitFullscreen = msExitFullscreen
            delete fullDoc.exitFullscreen
            delete fullDoc.webkitExitFullscreen

            const { result } = renderHook(() => useFullScreen<HTMLDivElement>())

            act(() => {
                result.current.exitFullScreen()
            })

            expect(msExitFullscreen).toHaveBeenCalledTimes(1)
        })

        it('should update isFullscreen when fullscreenchange event fires', () => {
            const { result } = renderHook(() => useFullScreen<HTMLDivElement>())
            expect(result.current.isFullscreen).toBe(false)

            Object.defineProperty(document, 'fullscreenElement', {
                configurable: true,
                get: () => document.createElement('div'),
            })

            act(() => {
                document.dispatchEvent(new Event('fullscreenchange'))
            })

            expect(result.current.isFullscreen).toBe(true)

            // Now set it back to null
            Object.defineProperty(document, 'fullscreenElement', {
                configurable: true,
                get: () => null,
            })

            act(() => {
                document.dispatchEvent(new Event('fullscreenchange'))
            })

            expect(result.current.isFullscreen).toBe(false)
        })

        it('should clean up the fullscreenchange listener on unmount', () => {
            const removeEventListenerSpy = vi.spyOn(document, 'removeEventListener')
            const { unmount } = renderHook(() => useFullScreen<HTMLDivElement>())

            unmount()

            expect(removeEventListenerSpy).toHaveBeenCalledWith(
                'fullscreenchange',
                expect.any(Function),
            )
        })
    })

    // --------------------
    // useOrientation tests
    // --------------------
    describe('useOrientation', () => {
        const PORTRAIT = { innerWidth: 400, innerHeight: 800 }
        const LANDSCAPE = { innerWidth: 1200, innerHeight: 800 }
        const MOBILE = { innerWidth: 600, innerHeight: 900 }
        const DESKTOP = { innerWidth: 1440, innerHeight: 900 }

        afterEach(() => {
            vi.restoreAllMocks()
        })

        it('should detect portrait orientation', () => {
            vi.spyOn(window, 'innerWidth', 'get').mockReturnValue(PORTRAIT.innerWidth)
            vi.spyOn(window, 'innerHeight', 'get').mockReturnValue(PORTRAIT.innerHeight)

            const { result } = renderHook(() => Browser.useOrientation())
            expect(result.current.orientation).toBe('portrait')
        })

        it('should detect landscape orientation', () => {
            vi.spyOn(window, 'innerWidth', 'get').mockReturnValue(LANDSCAPE.innerWidth)
            vi.spyOn(window, 'innerHeight', 'get').mockReturnValue(LANDSCAPE.innerHeight)

            const { result } = renderHook(() => Browser.useOrientation())
            expect(result.current.orientation).toBe('landscape')
        })

        it('should detect mobile width', () => {
            vi.spyOn(window, 'innerWidth', 'get').mockReturnValue(MOBILE.innerWidth)
            vi.spyOn(window, 'innerHeight', 'get').mockReturnValue(MOBILE.innerHeight)

            const { result } = renderHook(() => Browser.useOrientation())
            expect(result.current.isMobile).toBe(true)
        })

        it('should detect desktop width', () => {
            vi.spyOn(window, 'innerWidth', 'get').mockReturnValue(DESKTOP.innerWidth)
            vi.spyOn(window, 'innerHeight', 'get').mockReturnValue(DESKTOP.innerHeight)

            const { result } = renderHook(() => Browser.useOrientation())
            expect(result.current.isMobile).toBe(false)
        })

        it('should update on resize event', () => {
            vi.spyOn(window, 'innerWidth', 'get').mockReturnValue(LANDSCAPE.innerWidth)
            vi.spyOn(window, 'innerHeight', 'get').mockReturnValue(LANDSCAPE.innerHeight)

            const { result } = renderHook(() => Browser.useOrientation())
            expect(result.current.orientation).toBe('landscape')

            // Change to portrait
            vi.spyOn(window, 'innerWidth', 'get').mockReturnValue(PORTRAIT.innerWidth)
            vi.spyOn(window, 'innerHeight', 'get').mockReturnValue(PORTRAIT.innerHeight)

            act(() => {
                window.dispatchEvent(new Event('resize'))
            })

            expect(result.current.orientation).toBe('portrait')
        })

        it('should update isMobile on resize', () => {
            vi.spyOn(window, 'innerWidth', 'get').mockReturnValue(DESKTOP.innerWidth)

            const { result } = renderHook(() => Browser.useOrientation())
            expect(result.current.isMobile).toBe(false)

            // Resize to mobile width
            vi.spyOn(window, 'innerWidth', 'get').mockReturnValue(MOBILE.innerWidth)

            act(() => {
                window.dispatchEvent(new Event('resize'))
            })

            expect(result.current.isMobile).toBe(true)
        })

        it('should clean up the resize listener on unmount', () => {
            const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener')
            const { unmount } = renderHook(() => Browser.useOrientation())

            unmount()

            expect(removeEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function))
        })
    })
})
