import { describe, expect, it } from 'vitest'
import { Const } from '@common-ux'
import { CategoriesOptions } from '../Categories.options'
import { Icons } from '../components/Icons'

describe('CategoriesOptions', () => {
    describe('iconOptions', () => {
        it('should build one option per icon key', () =>
            expect(CategoriesOptions.iconOptions).toHaveLength(Object.keys(Icons).length))

        it('should map every icon key to an option with label/value/icon', () =>
            Object.keys(Icons).forEach((key) => {
                const option = CategoriesOptions.iconOptions.find((o) => o.value === key)
                expect(option).toBeDefined()
                expect(option?.label).toBe(key)
                expect(option?.icon).toBeDefined()
            }))

        it('should sort by label ascending', () => {
            const labels = CategoriesOptions.iconOptions.map((o) => o.label)
            expect(labels).toEqual([...labels].sort())
        })
    })

    describe('colorOptions', () => {
        it('should build one option per ColorSign key', () =>
            expect(CategoriesOptions.colorOptions).toHaveLength(
                Object.keys(Const.ColorSign).length,
            ))

        it('should map every color key to an option', () =>
            Object.keys(Const.ColorSign).forEach((key) => {
                const option = CategoriesOptions.colorOptions.find((o) => o.value === key)
                expect(option).toBeDefined()
                expect(option?.label).toBe(key)
            }))

        it('should sort by label ascending', () => {
            const labels = CategoriesOptions.colorOptions.map((o) => o.label)
            expect(labels).toEqual([...labels].sort())
        })
    })
})
