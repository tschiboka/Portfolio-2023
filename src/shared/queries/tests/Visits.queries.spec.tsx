import { Browser, Paths } from '@common-utils'
import { VisitsTestUtils } from './Visits.queries.spec.utils'

describe('UseRecordVisit', () => {
    beforeEach(() => {
        vi.clearAllMocks()
        VisitsTestUtils.spies.detectIncognito.mockResolvedValue({ isPrivate: false })
        vi.spyOn(Browser, 'isLocalhost').mockReturnValue(false)
    })

    describe('Recording', () => {
        it('should record the path when remote and public', async () => {
            VisitsTestUtils.customRender(Paths.Client.Home)
            await VisitsTestUtils.settle()

            expect(VisitsTestUtils.spies.detectIncognito).toHaveBeenCalledTimes(1)
        })

        it('should not record the path when local', () => {
            vi.mocked(Browser.isLocalhost).mockReturnValue(true)
            VisitsTestUtils.customRender(Paths.Client.Home)

            expect(VisitsTestUtils.spies.detectIncognito).not.toHaveBeenCalled()
        })

        it('should not record the path when private', async () => {
            VisitsTestUtils.spies.detectIncognito.mockResolvedValue({ isPrivate: true })
            VisitsTestUtils.customRender(Paths.Client.Home)
            await VisitsTestUtils.settle()

            expect(VisitsTestUtils.spies.detectIncognito).toHaveBeenCalledTimes(1)
        })

        it('should not record the path when empty', () => {
            VisitsTestUtils.customRender('')

            expect(VisitsTestUtils.spies.detectIncognito).not.toHaveBeenCalled()
        })
    })
})
