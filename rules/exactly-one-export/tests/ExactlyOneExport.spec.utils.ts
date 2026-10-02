import { messageFor } from '../ExactlyOneExport.rules.js'

const roleFile = (role: string, extension = 'ts') => `/a/Feature/Blog.${role}.${extension}`

/**
 * Shared wiring for the rule's spec: the message a report must carry, and a path
 * whose role segment is the one under test.
 *
 * @example
 * ExactlyOneExportTestUtils.roleFile('utils') // '/a/Feature/Blog.utils.ts'
 */
export const ExactlyOneExportTestUtils = { messageFor, roleFile }
