import { HarnessMocks } from './Harness.mocks'
import { HarnessTestUtils } from './Harness.spec.utils'

const { mount, create, mountMap, clear } = HarnessTestUtils
const { renderFirstMessage } = HarnessMocks

describe('Harness guards', () => {
    afterEach(clear)

    describe('render', () => {
        it('should throw when nothing has been rendered', () =>
            expect(() => create().Get.save()).toThrow(renderFirstMessage))

        it('should throw when the rendered container has gone', () => {
            const Spec = mount()
            clear()

            expect(() => Spec.Get.save()).toThrow(renderFirstMessage)
        })
    })

    describe('within', () => {
        it('should throw when the target is not a declared key', () =>
            expect(() => mountMap({ a: { role: 'button', within: 'ghost' } }).Get.a()).toThrow(
                '"a" is searched inside "ghost", which is not an element of this harness',
            ))

        it('should throw when two elements are inside each other', () =>
            expect(() =>
                mountMap({
                    a: { role: 'button', within: 'b' },
                    b: { role: 'button', within: 'a' },
                }).Get.a(),
            ).toThrow('a > b > a'))

        it('should throw when a recipe sets both within and scope', () =>
            expect(() =>
                mountMap({
                    a: { role: 'button', within: 'b', scope: 'screen' },
                    b: { role: 'button' },
                }).Get.a(),
            ).toThrow('cannot set both within and scope'))
    })
})
