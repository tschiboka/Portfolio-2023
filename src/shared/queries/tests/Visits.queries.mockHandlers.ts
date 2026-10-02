import { RequestBuilder, HttpMethods } from '@common-ux/Test'
import { VisitsMocks } from './Visits.queries.mocks'

const postVisit = RequestBuilder({
    path: '/api/visit',
    method: HttpMethods.POST,
    response: VisitsMocks.postVisit,
})

export const VisitsMockHandlers = {
    Post: postVisit,
    Defaults: [postVisit],
}
