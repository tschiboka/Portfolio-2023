import { HarnessMocks } from './Harness.mocks'
import { HarnessTestUtils } from './Harness.spec.utils'

const { mount, mountAccessor, clear } = HarnessTestUtils
const { appendDelayMs } = HarnessMocks

describe('Harness assertions', () => {
    afterEach(clear)

    describe('Expect', () => {
        it('should pass the checks that hold', () => {
            const Spec = mount()
            Spec.Expect.visible.save()
            Spec.Expect.enabled.save()
            Spec.Expect.disabled.disabled()
            Spec.Expect.checked.checked()
            Spec.Expect.unchecked.agree()
            Spec.Expect.absent.missing()
            Spec.Expect.text.heading('Title')
            Spec.Expect.inputValue.name('Typed')
        })

        it('should fail visible for a hidden element', () =>
            expect(() => mount().Expect.visible.hidden()).toThrow('to be visible'))

        it('should fail enabled for a disabled button', () =>
            expect(() => mount().Expect.enabled.disabled()).toThrow('to be enabled'))

        it('should fail checked for an unchecked box', () =>
            expect(() => mount().Expect.checked.agree()).toThrow('to be checked'))

        it('should fail text when the content differs', () =>
            expect(() => mount().Expect.text.heading('Other')).toThrow('to have text Other'))

        it('should fail inputValue when the field shows another value', () =>
            expect(() => mount().Expect.inputValue.name('Other')).toThrow(
                'to have display value Other',
            ))
    })

    describe('WaitFor', () => {
        it('should resolve enabled once the button stops being disabled', async () => {
            const Spec = mount()
            const Later = Spec.Get.later()
            setTimeout(() => Later.removeAttribute('disabled'), appendDelayMs)

            await expect(Spec.WaitFor.enabled.later()).resolves.toBeUndefined()
        })

        it('should resolve gone once the element is removed', async () => {
            const Spec = mount()
            const Vanish = Spec.Get.vanish()
            setTimeout(() => Vanish.remove(), appendDelayMs)

            await expect(Spec.WaitFor.gone.vanish()).resolves.toBeUndefined()
        })

        it('should resolve inputValue once the field shows it', async () => {
            const Spec = mount()
            const Name = Spec.Get.name() as HTMLInputElement
            setTimeout(() => (Name.value = 'later'), appendDelayMs)

            await expect(Spec.WaitFor.inputValue.name('later')).resolves.toBeUndefined()
        })
    })

    describe('accessor keys', () => {
        it('should assert on the element the accessor holds', () => {
            const Spec = mountAccessor()
            Spec.Expect.visible.panelAccessor()
            Spec.Expect.text.panelAccessor('Title')
        })

        it('should fail text when the accessor holds something else', () =>
            expect(() => mountAccessor().Expect.text.panelAccessor('Other')).toThrow(
                'to have text Other',
            ))

        it('should fail absent when the accessor resolves', () =>
            expect(() => mountAccessor().Expect.absent.panelAccessor()).toThrow(
                'nothing to be in the document',
            ))

        it('should treat an accessor that cannot resolve as absent', () =>
            mountAccessor().Expect.absent.ghostAccessor())

        it('should resolve gone once an unresolvable accessor stays unresolvable', async () => {
            const Spec = mountAccessor()

            await expect(Spec.WaitFor.gone.ghostAccessor()).resolves.toBeUndefined()
        })
    })
})
