import { describe, expect, it } from 'vitest'
import { Set } from './Icon.spec.utils'

describe('Icon', () => {
    it('should render an svg element', () => {
        const icon = Set.icon({ name: 'chart' })
        expect(icon.Get.tagName()).toBe('svg')
    })

    it.each([
        ['chart', 2],
        ['eye', 2],
        ['heart', 1],
    ] as const)('renders %s with %i path(s)', (name, count) => {
        const icon = Set.icon({ name })
        expect(icon.Get.paths()).toBe(count)
    })

    it('defaults to size 16', () => {
        const icon = Set.icon({ name: 'chart' })
        expect(icon.Get.size()).toBe(16)
    })

    it('applies a custom size', () => {
        const icon = Set.icon({ name: 'chart', size: 24 })
        expect(icon.Get.size()).toBe(24)
    })

    it('defaults to currentColor stroke', () => {
        const icon = Set.icon({ name: 'chart' })
        expect(icon.Get.stroke()).toBe('currentColor')
    })

    it('applies a custom color', () => {
        const icon = Set.icon({ name: 'chart', color: '#888' })
        expect(icon.Get.stroke()).toBe('#888')
    })

    it('sets data-icon to the icon name', () => {
        const icon = Set.icon({ name: 'heart' })
        expect(icon.Get.attribute('data-icon')).toBe('heart')
    })
})
