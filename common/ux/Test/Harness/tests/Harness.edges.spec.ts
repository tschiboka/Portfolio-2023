import { configure } from '@testing-library/react'
import { HarnessMocks } from './Harness.mocks'
import { HarnessTestUtils } from './Harness.spec.utils'

const { mount, mountAccessor, mountRootWithin, clear, append } = HarnessTestUtils
const { appendDelayMs, shortTimeoutMs } = HarnessMocks

describe('Harness edges', () => {
    afterEach(clear)

    describe('a key that holds an accessor', () => {
        it('should return it from Get and Query', () => {
            const Spec = mountAccessor()
            expect(Spec.Get.panelAccessor()).toBeDefined()
            expect(Spec.Query.panelAccessor()).toBeDefined()
        })

        it('should keep it off the plural channels', () =>
            expect(Object.keys(mountAccessor().GetAll)).not.toContain('panelAccessor'))
    })

    describe('Wait', () =>
        it('should resolve once the element appears', async () => {
            const Spec = mount('')
            setTimeout(() => append('<button>Late</button>'), appendDelayMs)

            await expect(Spec.Wait.late()).resolves.toBeInstanceOf(HTMLElement)
        }))

    describe('Query', () => {
        it('should throw when several match', () =>
            expect(() => mount().Query.items()).toThrow('more than one match'))

        it('should answer null when the index is past the last match', () =>
            expect(mount().Query.outOfRange()).toBeNull())
    })

    describe('hasText', () =>
        it('should compare a number as text', () =>
            expect(mount().GetAll.step2()).toHaveLength(1)))

    describe('Has', () =>
        it('should answer false when several match', () => expect(mount().Has.items()).toBe(false)))

    describe('Do', () =>
        it('should click the root when no key is given', async () =>
            await expect(mount().Do.click()).resolves.toBeUndefined()))

    describe('Expect', () => {
        it('should fail absent when the element is present', () =>
            expect(() => mount().Expect.absent.save()).toThrow('nothing to be in the document'))

        it('should fail disabled for an enabled button', () =>
            expect(() => mount().Expect.disabled.save()).toThrow('to be disabled'))

        it('should fail unchecked for a checked box', () =>
            expect(() => mount().Expect.unchecked.checked()).toThrow('not to be checked'))
    })

    describe('a root naming its own within', () =>
        it('should ignore that within and search the document', () =>
            expect(mountRootWithin().Get.inner().textContent).toBe('Inner')))

    describe('a wait that never settles', () => {
        beforeAll(() => configure({ asyncUtilTimeout: shortTimeoutMs }))
        afterAll(() => configure({ asyncUtilTimeout: 1000 }))

        it('should reject Find with the harness wording', async () =>
            await expect(mount().Find.missing()).rejects.toThrow('not found'))

        it('should reject FindAll', async () =>
            await expect(mount().FindAll.missing()).rejects.toThrow())

        it('should reject WaitFor with the harness wording', async () =>
            await expect(mount().WaitFor.gone.save()).rejects.toThrow(
                'nothing to be in the document',
            ))
    })
})
