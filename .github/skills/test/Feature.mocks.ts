// @ts-nocheck — skill example, outside the tsconfig include.

import { MockBuilder, RequestBuilder, HttpMethods } from '@common-ux/Test'
import { HttpStatus } from '@common-utils'
import { MockResource, TestMocks } from '@common-mocks'

/** Feature-local mocks — derived from the common base, never re-declared. */
export const FeatureMocks = {
    defaultResource: MockResource.modify({ field1: TestMocks.id1 }),
    otherResource: MockResource.modify({ field2: 'other' }),
}

/** GET /api/feature — the default read. */
const getFeature = RequestBuilder({
    path: '/api/feature',
    method: HttpMethods.GET,
    response: FeatureMocks.defaultResource,
})

/** POST /api/feature — accepts the payload. */
const postFeature = RequestBuilder({
    path: '/api/feature',
    method: HttpMethods.POST,
    response: FeatureMocks.defaultResource,
})

/** POST /api/feature — rejected with the server's message. */
const postFeatureRejected = RequestBuilder({
    path: '/api/feature',
    method: HttpMethods.POST,
    status: HttpStatus.BAD_REQUEST,
    response: { message: 'Rejected' },
})

/** The handler set a spec registers wholesale. */
export const FeatureMockHandlers = {
    Get: getFeature,
    Post: postFeature,
    PostRejected: postFeatureRejected,
    Defaults: [getFeature, postFeature],
}
