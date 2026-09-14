// @ts-nocheck — skill example, outside the tsconfig include.

import { Test } from '@common-ux'
import { TestMocks } from '@common-mocks'
import { FeatureTestUtils } from './Feature.spec.utils'

const { button1, heading1, input1 } = FeatureTestUtils.labels

describe('Feature', () => {
    it('should render component', () => {
        FeatureTestUtils.customRender()
        expect(Test.Section(heading1).Get.title()).toBeInTheDocument()
    })

    it('should render items from state', () => {
        FeatureTestUtils.customRender()
        expect(Test.Table(heading1).Get.rows()).toHaveLength(TestMocks.count1)
    })

    it('should call handler on interact', async () => {
        const { user } = FeatureTestUtils.customRender()

        await user.type(Test.Form(heading1).Input(input1), TestMocks.value1)
        await user.click(Test.Form(heading1).Button(button1))

        expect(Test.LoadingIndicator.Has.isLoading()).toBe(false)
    })

    describe('SubFeature', () => {
        it.each([
            ['empty input', ''],
            ['missing input', TestMocks.value1],
        ])('should not dispatch when %s', async (_case, value) => {
            const { user } = FeatureTestUtils.customRender()

            await user.type(Test.Form(heading1).Input(input1), value)
            await user.click(Test.Form(heading1).Button(button1))

            expect(Test.Form(heading1).Input(input1)).toBeInvalid()
        })
    })
})
