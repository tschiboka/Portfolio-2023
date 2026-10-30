import { describe, expect, it } from 'vitest'
import { Const } from '@common-ux/Const'
import { IconTestUtils } from './Icon.spec.utils'

const { Set } = IconTestUtils

describe('Icon', () => {
    it('should render an svg element', () => {
        const icon = Set.icon({ name: 'chart' })
        expect(icon.Get.tagName()).toBe('svg')
    })

    it.each([
        ['chart', 2],
        ['eye', 2],
        ['heart', 1],
    ] as const)('should render %s with %i path(s)', (name, count) => {
        const icon = Set.icon({ name })
        expect(icon.Get.paths()).toBe(count)
    })

    it('should default to size 16', () => {
        const icon = Set.icon({ name: 'chart' })
        expect(icon.Get.size()).toBe(16)
    })

    it('should apply a custom size', () => {
        const icon = Set.icon({ name: 'chart', size: 24 })
        expect(icon.Get.size()).toBe(24)
    })

    it('should default to currentColor stroke', () => {
        const icon = Set.icon({ name: 'chart' })
        expect(icon.Get.stroke()).toBe('currentColor')
    })

    it('should apply a custom color', () => {
        const icon = Set.icon({ name: 'chart', color: Const.Color.Gray[3] })
        expect(icon.Get.stroke()).toBe(Const.Color.Gray[3])
    })

    it('should set data-icon to the icon name', () => {
        const icon = Set.icon({ name: 'heart' })
        expect(icon.Get.attribute('data-icon')).toBe('heart')
    })
})
