import { RequestBuilder, HttpMethods } from '@common-ux/Test'
import { VisitQueriesMocks } from './Visit.queries.mocks'

const postVisit = RequestBuilder({
    path: '/api/visit',
    method: HttpMethods.POST,
    response: VisitQueriesMocks.postVisit,
})

export const VisitQueriesMockHandlers = {
    Post: postVisit,
    Defaults: [postVisit],
}
