import { DateTime } from '@common-utils'
import { WdaSessionStatuses } from '../../../../../common/types/projects/wda'

/** Session statuses and the presence-loop timing, each in its own unit. */
export const SessionConstants = {
    statuses: WdaSessionStatuses,
    checkIntervalMs: DateTime.Units.Ms.fromSec(5),
    inactiveTimeoutMs: DateTime.Units.Ms.fromSec(30),
}
