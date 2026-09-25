import { describe, expect, it } from 'vitest'
import { Const } from '@common-ux'
import { CategoriesOptions } from '../Categories.options'
import { icons } from '../components/Icons'

describe('CategoriesOptions', () => {
    describe('iconOptions', () => {
        it('builds one option per icon key', () => {
            expect(CategoriesOptions.iconOptions).toHaveLength(Object.keys(icons).length)
        })

        it('maps every icon key to an option with label/value/icon', () => {
            for (const key of Object.keys(icons)) {
                const option = CategoriesOptions.iconOptions.find((o) => o.value === key)
                expect(option).toBeDefined()
                expect(option?.label).toBe(key)
                expect(option?.icon).toBeDefined()
            }
        })

        it('is sorted by label ascending', () => {
            const labels = CategoriesOptions.iconOptions.map((o) => o.label)
            expect(labels).toEqual([...labels].sort())
        })
    })

    describe('colorOptions', () => {
        it('builds one option per ColorSign key', () => {
            expect(CategoriesOptions.colorOptions).toHaveLength(Object.keys(Const.ColorSign).length)
        })

        it('maps every color key to an option', () => {
            for (const key of Object.keys(Const.ColorSign)) {
                const option = CategoriesOptions.colorOptions.find((o) => o.value === key)
                expect(option).toBeDefined()
                expect(option?.label).toBe(key)
            }
        })

        it('is sorted by label ascending', () => {
            const labels = CategoriesOptions.colorOptions.map((o) => o.label)
            expect(labels).toEqual([...labels].sort())
        })
    })
})
