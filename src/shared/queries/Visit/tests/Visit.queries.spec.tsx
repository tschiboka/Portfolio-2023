import { Browser, Paths } from '@common-utils'
import { VisitQueriesTestUtils } from './Visit.queries.spec.utils'

describe('UseRecordVisit', () => {
    beforeEach(() => {
        vi.clearAllMocks()
        VisitQueriesTestUtils.spies.detectIncognito.mockResolvedValue({ isPrivate: false })
        vi.spyOn(Browser, 'isLocalhost').mockReturnValue(false)
    })

    describe('Recording', () => {
        it('should record the path when remote and public', async () => {
            VisitQueriesTestUtils.customRender(Paths.Client.Home)
            await VisitQueriesTestUtils.settle()

            expect(VisitQueriesTestUtils.spies.detectIncognito).toHaveBeenCalledTimes(1)
        })

        it('should not record the path when local', () => {
            vi.mocked(Browser.isLocalhost).mockReturnValue(true)
            VisitQueriesTestUtils.customRender(Paths.Client.Home)

            expect(VisitQueriesTestUtils.spies.detectIncognito).not.toHaveBeenCalled()
        })

        it('should not record the path when private', async () => {
            VisitQueriesTestUtils.spies.detectIncognito.mockResolvedValue({ isPrivate: true })
            VisitQueriesTestUtils.customRender(Paths.Client.Home)
            await VisitQueriesTestUtils.settle()

            expect(VisitQueriesTestUtils.spies.detectIncognito).toHaveBeenCalledTimes(1)
        })

        it('should not record the path when empty', () => {
            VisitQueriesTestUtils.customRender('')

            expect(VisitQueriesTestUtils.spies.detectIncognito).not.toHaveBeenCalled()
        })
    })
})
