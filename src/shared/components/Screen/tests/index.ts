import { Test as CommonTest } from '@common-ux/Test'
import { ScreenTestUtils } from './Screen.spec.utils'

/** The toolkit plus the render helper, so a spec reads `Test.<Thing>` throughout. */
export const Test = { ...CommonTest, Screen: ScreenTestUtils }
