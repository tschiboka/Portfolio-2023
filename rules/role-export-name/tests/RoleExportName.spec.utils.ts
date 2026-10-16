import { RoleExportTokenMap } from '../../constants.js'
import { messageFor } from '../RoleExportName.utils.js'

const fileName = (role: string, stem = 'Blog', extension = 'ts') => `${stem}.${role}.${extension}`

const roleFile = (role: string, stem = 'Blog', extension = 'ts') =>
    `/a/Feature/${fileName(role, stem, extension)}`

const expectedName = (role: string, stem = 'Blog') =>
    stem +
    role
        .split('.')
        .map((segment) => RoleExportTokenMap[segment])
        .join('')

/** One case per role the map carries, but not `spec`, which names nothing on its own. */
const roleCases = Object.entries(RoleExportTokenMap)
    .filter(([role]) => role !== 'spec')
    .map(([role]) => ({
        role,
        filename: roleFile(role),
        expected: expectedName(role),
    }))

/**
 * Shared wiring for the rule's spec: the message a report must carry, a path whose
 * role segment is the one under test, and the name that role expects.
 *
 * @example
 * RoleExportNameTestUtils.expectedName('utils') // 'BlogUtils'
 */
export const RoleExportNameTestUtils = { messageFor, roleFile, fileName, expectedName, roleCases }
