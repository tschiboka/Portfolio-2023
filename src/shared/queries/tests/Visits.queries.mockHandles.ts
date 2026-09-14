import { RequestBuilder, HttpMethods } from '@common-ux/Test'
import { MockPostVisit } from './Visits.queries.mocks'

const postVisit = RequestBuilder({
    path: '/api/visit',
    method: HttpMethods.POST,
    response: MockPostVisit,
})

export const VisitsMockHandlers = {
    Post: postVisit,
    Defaults: [postVisit],
}
