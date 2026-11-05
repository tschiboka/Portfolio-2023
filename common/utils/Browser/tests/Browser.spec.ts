import { renderHook, act } from '@testing-library/react'
import { BrowserTestUtils } from './Browser.spec.utils'
import { Browser, BrowserHooks } from '..'
import type { MutableRefObject } from 'react'
import type { FullScreenDocument, FullScreenElement } from './Browser.spec.types'

const { copyToClipboard } = Browser
const { useFullScreen, useIsVisible, useOrientation } = BrowserHooks
const {
    reset,
    latest,
    createElement,
    writeText,
    execCommand,
    mockClipboard,
    mockExecCommand,
    viewports,
} = BrowserTestUtils

describe('Browser', () => {
    describe('copyToClipboard', () => {
        beforeEach(() => reset())

        afterEach(() => vi.restoreAllMocks())

        describe('when navigator.clipboard is available', () => {
            beforeEach(() => mockClipboard())

            it.each([['hello world'], [''], ['special chars: <>&"\''], ['multi\nline\ntext']])(
                'should call navigator.clipboard.writeText with "%s"',
                async (text: string) => {
                    await copyToClipboard(text)
                    expect(writeText).toHaveBeenCalledWith(text)
                },
            )

            it('should resolve without a value', async () => {
                const result = await copyToClipboard('test')
                expect(result).toBeUndefined()
            })

            it('should propagate clipboard errors', async () => {
                writeText.mockRejectedValueOnce(new Error('Clipboard blocked'))
                await expect(copyToClipboard('fail')).rejects.toThrow('Clipboard blocked')
            })
        })

        describe('when navigator.clipboard is NOT available', () => {
            beforeEach(() => mockExecCommand())

            it.each([['hello world'], [''], ['special chars: <>&"\'']])(
                'should fall back to document.execCommand for "%s"',
                async (text: string) => {
                    await copyToClipboard(text)
                    expect(execCommand).toHaveBeenCalledWith('copy', true, text)
                },
            )

            it('should return the execCommand result', async () => {
                execCommand.mockReturnValue(false)
                const result = await copyToClipboard('test')
                expect(result).toBe(false)
            })
        })
    })

    // --------------------
    // useIsVisible tests
    // --------------------
    describe('useIsVisible', () => {
        beforeEach(() => reset())

        it('should observe multiple elements', () => {
            const el1 = createElement()
            const el2 = createElement()

            renderHook(() => useIsVisible([el1, el2]))

            const observer = latest()
            expect(observer.observe).toHaveBeenCalledTimes(2)
        })

        it('should update visibility when element intersects', () => {
            const el1 = createElement()
            const el2 = createElement()

            const { result } = renderHook(() => useIsVisible([el1, el2]))

            const observer = latest()

            act(() =>
                observer.trigger([
                    {
                        target: el1,
                        isIntersecting: true,
                    },
                ]),
            )

            expect(result.current[0]).toEqual({ element: el1, isVisible: true })
        })

        it('should track multiple elements independently', () => {
            const el1 = createElement()
            const el2 = createElement()

            const { result } = renderHook(() => useIsVisible([el1, el2]))

            const observer = latest()

            act(() =>
                observer.trigger([
                    {
                        target: el1,
                        isIntersecting: true,
                    },
                    {
                        target: el2,
                        isIntersecting: false,
                    },
                ]),
            )

            expect(result.current).toEqual([
                { element: el1, isVisible: true },
                { element: el2, isVisible: false },
            ])
        })

        it('should disconnect on unmount', () => {
            const el1 = createElement()

            const { unmount } = renderHook(() => useIsVisible([el1]))

            const observer = latest()

            unmount()

            expect(observer.disconnect).toHaveBeenCalled()
        })
    })
    describe('slugify', () => {
        it('should return an empty string for an empty input', () =>
            expect(Browser.slugify('')).toBe(''))

        it('should replace non-word characters with empty string', () =>
            expect(Browser.slugify('Hello World!')).toBe('hello-world'))

        it('should replace spaces with dashes', () => {
            expect(Browser.slugify('Hello World!')).toBe('hello-world')
            expect(Browser.slugify('Hello-World!')).toBe('hello-world')
        })

        it('should replace underscores with dashes', () =>
            expect(Browser.slugify('Hello_World!')).toBe('hello-world'))

        it('should replace multiple dashes with a single dash', () =>
            expect(Browser.slugify('Hello---World!')).toBe('hello-world'))
    })

    describe('isLocalhost', () => {
        it('should return true when hostname is localhost', () =>
            expect(Browser.isLocalhost('localhost')).toBe(true))

        it('should return true when hostname is 127.0.0.1', () =>
            expect(Browser.isLocalhost('127.0.0.1')).toBe(true))

        it('should return false for other hostnames', () =>
            expect(Browser.isLocalhost('example.com')).toBe(false))

        it('should return false for production domain', () =>
            expect(Browser.isLocalhost('tschiboka.com')).toBe(false))
    })

    // --------------------
    // useFullScreen tests
    // --------------------
    describe('useFullScreen', () => {
        afterEach(() => vi.restoreAllMocks())

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
            ;(result.current.ref as MutableRefObject<HTMLDivElement>).current = el
            act(() => void result.current.enterFullScreen())

            expect(requestFullscreen).toHaveBeenCalledTimes(1)
        })

        it('should call webkitRequestFullscreen when requestFullscreen is not available', () => {
            const webkitRequestFullscreen = vi.fn().mockResolvedValue(undefined)
            const { result } = renderHook(() => useFullScreen<HTMLDivElement>())

            const el = document.createElement('div') as unknown as FullScreenElement
            el.webkitRequestFullscreen = webkitRequestFullscreen
            ;(result.current.ref as MutableRefObject<HTMLDivElement>).current = el as HTMLDivElement
            act(() => void result.current.enterFullScreen())

            expect(webkitRequestFullscreen).toHaveBeenCalledTimes(1)
        })

        it('should call msRequestFullscreen when standard and webkit are not available', () => {
            const msRequestFullscreen = vi.fn().mockResolvedValue(undefined)
            const { result } = renderHook(() => useFullScreen<HTMLDivElement>())

            const el = document.createElement('div') as unknown as FullScreenElement
            el.msRequestFullscreen = msRequestFullscreen
            ;(result.current.ref as MutableRefObject<HTMLDivElement>).current = el as HTMLDivElement

            act(() => void result.current.enterFullScreen())
            expect(msRequestFullscreen).toHaveBeenCalledTimes(1)
        })

        it('should not throw when ref has no current element', () => {
            const { result } = renderHook(() => useFullScreen<HTMLDivElement>())
            expect(() => act(() => void result.current.enterFullScreen())).not.toThrow()
        })

        it('should call exitFullscreen on the document when exitFullScreen is called', () => {
            const exitFullscreen = vi.fn().mockResolvedValue(undefined)
            document.exitFullscreen = exitFullscreen

            const { result } = renderHook(() => useFullScreen<HTMLDivElement>())
            act(() => void result.current.exitFullScreen())

            expect(exitFullscreen).toHaveBeenCalledTimes(1)
        })

        it('should call webkitExitFullscreen when exitFullscreen is not available', () => {
            const webkitExitFullscreen = vi.fn().mockResolvedValue(undefined)
            const fullDoc = document as unknown as FullScreenDocument
            fullDoc.webkitExitFullscreen = webkitExitFullscreen
            delete fullDoc.exitFullscreen

            const { result } = renderHook(() => useFullScreen<HTMLDivElement>())

            act(() => void result.current.exitFullScreen())

            expect(webkitExitFullscreen).toHaveBeenCalledTimes(1)
        })

        it('should call msExitFullscreen when standard and webkit are not available', () => {
            const msExitFullscreen = vi.fn().mockResolvedValue(undefined)
            const fullDoc = document as unknown as FullScreenDocument
            fullDoc.msExitFullscreen = msExitFullscreen
            delete fullDoc.exitFullscreen
            delete fullDoc.webkitExitFullscreen

            const { result } = renderHook(() => useFullScreen<HTMLDivElement>())

            act(() => void result.current.exitFullScreen())

            expect(msExitFullscreen).toHaveBeenCalledTimes(1)
        })

        it('should update isFullscreen when fullscreenchange event fires', () => {
            const { result } = renderHook(() => useFullScreen<HTMLDivElement>())
            expect(result.current.isFullscreen).toBe(false)

            Object.defineProperty(document, 'fullscreenElement', {
                configurable: true,
                get: () => document.createElement('div'),
            })

            act(() => void document.dispatchEvent(new Event('fullscreenchange')))

            expect(result.current.isFullscreen).toBe(true)

            // Now set it back to null
            Object.defineProperty(document, 'fullscreenElement', {
                configurable: true,
                get: () => null,
            })

            act(() => void document.dispatchEvent(new Event('fullscreenchange')))

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
        afterEach(() => vi.restoreAllMocks())

        it('should detect portrait orientation', () => {
            vi.spyOn(window, 'innerWidth', 'get').mockReturnValue(viewports.portrait.innerWidth)
            vi.spyOn(window, 'innerHeight', 'get').mockReturnValue(viewports.portrait.innerHeight)

            const { result } = renderHook(() => useOrientation())
            expect(result.current.orientation).toBe('portrait')
        })

        it('should detect landscape orientation', () => {
            vi.spyOn(window, 'innerWidth', 'get').mockReturnValue(viewports.landscape.innerWidth)
            vi.spyOn(window, 'innerHeight', 'get').mockReturnValue(viewports.landscape.innerHeight)

            const { result } = renderHook(() => useOrientation())
            expect(result.current.orientation).toBe('landscape')
        })

        it('should detect mobile width', () => {
            vi.spyOn(window, 'innerWidth', 'get').mockReturnValue(viewports.mobile.innerWidth)
            vi.spyOn(window, 'innerHeight', 'get').mockReturnValue(viewports.mobile.innerHeight)

            const { result } = renderHook(() => useOrientation())
            expect(result.current.isMobile).toBe(true)
        })

        it('should detect desktop width', () => {
            vi.spyOn(window, 'innerWidth', 'get').mockReturnValue(viewports.desktop.innerWidth)
            vi.spyOn(window, 'innerHeight', 'get').mockReturnValue(viewports.desktop.innerHeight)

            const { result } = renderHook(() => useOrientation())
            expect(result.current.isMobile).toBe(false)
        })

        it('should update on resize event', () => {
            vi.spyOn(window, 'innerWidth', 'get').mockReturnValue(viewports.landscape.innerWidth)
            vi.spyOn(window, 'innerHeight', 'get').mockReturnValue(viewports.landscape.innerHeight)

            const { result } = renderHook(() => useOrientation())
            expect(result.current.orientation).toBe('landscape')

            // Change to portrait
            vi.spyOn(window, 'innerWidth', 'get').mockReturnValue(viewports.portrait.innerWidth)
            vi.spyOn(window, 'innerHeight', 'get').mockReturnValue(viewports.portrait.innerHeight)

            act(() => void window.dispatchEvent(new Event('resize')))

            expect(result.current.orientation).toBe('portrait')
        })

        it('should update isMobile on resize', () => {
            vi.spyOn(window, 'innerWidth', 'get').mockReturnValue(viewports.desktop.innerWidth)

            const { result } = renderHook(() => useOrientation())
            expect(result.current.isMobile).toBe(false)

            // Resize to mobile width
            vi.spyOn(window, 'innerWidth', 'get').mockReturnValue(viewports.mobile.innerWidth)

            act(() => void window.dispatchEvent(new Event('resize')))

            expect(result.current.isMobile).toBe(true)
        })

        it('should clean up the resize listener on unmount', () => {
            const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener')
            const { unmount } = renderHook(() => useOrientation())

            unmount()

            expect(removeEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function))
        })
    })
})
