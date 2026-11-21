import { HarnessTestUtils } from './Harness.spec.utils'

const { mount, clear } = HarnessTestUtils

describe('Harness actions', () => {
    afterEach(clear)

    it('should click the element a key names', async () => {
        const Spec = mount()
        const onClick = vi.fn()
        Spec.Get.save().addEventListener('click', onClick)

        await Spec.Do.click('save')

        expect(onClick).toHaveBeenCalledTimes(1)
    })

    it('should double-click the element a key names', async () => {
        const Spec = mount()
        const onDoubleClick = vi.fn()
        Spec.Get.save().addEventListener('dblclick', onDoubleClick)

        await Spec.Do.dblClick('save')

        expect(onDoubleClick).toHaveBeenCalledTimes(1)
    })

    it('should hover the element a key names', async () => {
        const Spec = mount()
        const onHover = vi.fn()
        Spec.Get.save().addEventListener('mouseover', onHover)

        await Spec.Do.hover('save')

        expect(onHover).toHaveBeenCalledTimes(1)
    })

    it('should fill a field, replacing what it held', async () => {
        const Spec = mount()

        await Spec.Do.fill('name', 'replaced')

        expect((Spec.Get.name() as HTMLInputElement).value).toBe('replaced')
    })

    it('should clear a field', async () => {
        const Spec = mount()

        await Spec.Do.clear('name')

        expect((Spec.Get.name() as HTMLInputElement).value).toBe('')
    })

    it('should paste into a field', async () => {
        const Spec = mount()

        await Spec.Do.paste('note', 'pasted')

        expect((Spec.Get.note() as HTMLInputElement).value).toBe('pasted')
    })

    it('should upload files to a file input', async () => {
        const Spec = mount()

        await Spec.Do.upload('file', [new File(['a'], 'a.txt'), new File(['b'], 'b.txt')])

        expect((Spec.Get.file() as HTMLInputElement).files).toHaveLength(2)
    })

    it('should pick an option in a select', async () => {
        const Spec = mount()

        await Spec.Do.pick('color', 'Blue')

        expect((Spec.Get.color() as HTMLSelectElement).value).toBe('Blue')
    })

    it('should check a box and uncheck it again', async () => {
        const Spec = mount()
        const agree = Spec.Get.agree() as HTMLInputElement

        await Spec.Do.check('agree')
        expect(agree.checked).toBe(true)

        await Spec.Do.uncheck('agree')
        expect(agree.checked).toBe(false)
    })
})
