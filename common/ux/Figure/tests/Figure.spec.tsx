import { Set } from './Figure.spec.utils'

describe('Figure', () => {
    it('should render a <figure> element', () => {
        expect(Set.figure().Get.tagName()).toBe('FIGURE')
    })

    it('should render an image with the given src', () => {
        expect(Set.figure({ src: 'photo.png' }).Get.src()).toContain('photo.png')
    })

    it('should render an image with the given alt text', () => {
        expect(Set.figure({ alt: 'A photo' }).Get.alt()).toBe('A photo')
    })

    it('should render a caption when provided', () => {
        expect(Set.figure({ caption: 'My caption' }).Get.caption()).toBe('My caption')
    })

    it('should not render a caption when not provided', () => {
        expect(Set.figure().Get.caption()).toBeNull()
    })

    it('should apply the size class', () => {
        expect(Set.figure({ size: 'md' }).Get.size()).toBe('md')
    })

    it('should default to full size', () => {
        expect(Set.figure().Get.size()).toBe('full')
    })

    it('should be zoomable when onZoom is provided', () => {
        expect(Set.figure({ onZoom: vi.fn() }).Get.isZoomable()).toBe(true)
    })

    it('should not be zoomable when onZoom is not provided', () => {
        expect(Set.figure().Get.isZoomable()).toBe(false)
    })

    it('should call onZoom when clicked', async () => {
        const onZoom = vi.fn()
        const figure = Set.figure({ onZoom })
        await figure.Do.zoom()
        expect(onZoom).toHaveBeenCalledTimes(1)
    })

    it('should apply custom className', () => {
        expect(Set.figure({ className: 'custom' }).Get.className()).toContain('custom')
    })

    it('should apply aria-label', () => {
        expect(Set.figure({ ariaLabel: 'Guitar photo' }).Get.attribute('aria-label')).toBe(
            'Guitar photo',
        )
    })

    it('should apply bgColor as background on the image wrapper', () => {
        expect(Set.figure({ bgColor: 'white' }).Get.bgColor()).toBe('white')
    })

    it('should not apply background when bgColor is not provided', () => {
        expect(Set.figure().Get.bgColor()).toBe('')
    })
})
