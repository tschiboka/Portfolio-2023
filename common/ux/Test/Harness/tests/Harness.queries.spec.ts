import { HarnessMocks } from './Harness.mocks'
import { HarnessTestUtils } from './Harness.spec.utils'

const { mount, mountRooted, clear, append } = HarnessTestUtils
const { appendDelayMs } = HarnessMocks

describe('Harness queries', () => {
    afterEach(clear)

    describe('a single lookup', () => {
        it('should find an element by every recipe kind', () => {
            const Spec = mount()
            expect(Spec.Get.save().tagName).toBe('BUTTON')
            expect(Spec.Get.heading().textContent).toBe('Title')
            expect(Spec.Get.name().id).toBe('name')
            expect(Spec.Get.placeholder().id).toBe('name')
            expect(Spec.Get.typed().id).toBe('name')
            expect(Spec.Get.copy().tagName).toBe('P')
            expect(Spec.Get.logo().tagName).toBe('IMG')
            expect(Spec.Get.tip().tagName).toBe('I')
            expect(Spec.Get.badge().tagName).toBe('SPAN')
        })

        it('should throw when the index is past the last match', () =>
            expect(() => mount().Get.outOfRange()).toThrow('not found'))

        it('should filter by a regular expression', () =>
            expect(
                mount()
                    .GetAll.bananaRegex()
                    .map((item) => item.textContent),
            ).toEqual(['Banana yellow']))

        it('should find an element inside another declared key', () => {
            const Spec = mount()
            expect(Spec.Get.inner().textContent).toBe('Inner')
        })

        it('should throw when nothing matches', () =>
            expect(() => mount().Get.missing()).toThrow('not found'))

        it('should throw when several match and no index is set', () =>
            expect(() => mount().Get.items()).toThrow('more than one match'))

        it('should pick the match at index', () =>
            expect(mount().Get.secondApple().textContent).toBe('Apple green'))

        it('should narrow by hasText before picking', () =>
            expect(mount().Get.banana().textContent).toBe('Banana yellow'))

        it('should answer null on Query when nothing matches', () =>
            expect(mount().Query.missing()).toBeNull())

        it('should wait for an element that appears later', async () => {
            const Spec = mount('')
            setTimeout(() => append('<button>Late</button>'), appendDelayMs)

            await expect(Spec.Find.late()).resolves.toBeInstanceOf(HTMLElement)
        })
    })

    describe('a list lookup', () => {
        it('should return every match', () => expect(mount().GetAll.items()).toHaveLength(3))

        it('should keep only the matches hasText allows', () =>
            expect(
                mount()
                    .GetAll.apple()
                    .map((item) => item.textContent),
            ).toEqual(['Apple red', 'Apple green']))

        it('should ignore index on the list channels', () =>
            expect(mount().GetAll.secondApple()).toHaveLength(2))

        it('should answer an empty list on QueryAll when nothing matches', () =>
            expect(mount().QueryAll.missing()).toEqual([]))

        it('should wait for the first match on FindAll', async () => {
            const Spec = mount('')
            setTimeout(() => append('<button>Late</button>'), appendDelayMs)

            await expect(Spec.FindAll.late()).resolves.toHaveLength(1)
        })
    })

    describe('a rooted harness', () => {
        it('should search inside the root by default', () =>
            expect(mountRooted().Get.inner().textContent).toBe('Inner'))

        it('should ignore the root when a recipe says screen', () =>
            expect(mountRooted().Get.outside().textContent).toBe('Save'))
    })

    describe('Has', () =>
        it('should answer true for a declared element and false for a missing one', () => {
            const Spec = mount()
            expect(Spec.Has.save()).toBe(true)
            expect(Spec.Has.missing()).toBe(false)
        }))
})
