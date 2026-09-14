// @ts-nocheck — skill example, outside the tsconfig include.

import { Accessor, Test } from '@common-ux'
import { TestMocks } from '@common-mocks'
import { AppRoutes } from '@app'
import { TestScreen } from '@shared-queries'

import { FeatureMockHandlers } from './Feature.mocks'

/** Everything the spec needs that is not imports or `describe`. */
export const FeatureTestUtils = {
    labels: {
        heading1: 'Heading 1',
        button1: /Button 1/,
        input1: 'Input 1',
    },
    customRender: (handlers = FeatureMockHandlers.Defaults) => {
        TestScreen.Do.render({
            path: AppRoutes.Feature,
            handlers,
            session: { session: { token: TestMocks.token } },
        })

        return { user: Accessor.user }
    },
}
