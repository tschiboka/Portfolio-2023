import { HarnessTestUtils } from './Harness.spec.utils'

const { mountFlow, mountChild, clear } = HarnessTestUtils

describe('Harness flows', () => {
    afterEach(clear)

    it('should run a flow that fills and clicks in one call', async () => {
        const Spec = mountFlow()
        const onClick = vi.fn()
        Spec.Get.save().addEventListener('click', onClick)

        await Spec.Do.submit()

        expect((Spec.Get.name() as HTMLInputElement).value).toBe('submitted')
        expect(onClick).toHaveBeenCalledTimes(1)
    })

    it('should keep the parent elements on a child harness', () => {
        const Spec = mountChild()
        expect(Spec.Get.save()).toBeDefined()
        expect(Spec.Get.extra()).toBeDefined()
    })

    it('should keep the parent actions on a child harness', async () => {
        const Spec = mountChild()
        const onClick = vi.fn()
        Spec.Get.save().addEventListener('click', onClick)

        await Spec.Do.click('save')

        expect(onClick).toHaveBeenCalledTimes(1)
    })

    it('should run a child flow that calls an inherited action', async () => {
        const Spec = mountChild()
        const onClick = vi.fn()
        Spec.Get.save().addEventListener('click', onClick)

        await Spec.Do.clickTwice()

        expect(onClick).toHaveBeenCalledTimes(2)
    })
})
