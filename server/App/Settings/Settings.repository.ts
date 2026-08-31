import { Repository } from '@common-utils'
import { SettingsModel } from './Settings.model'
import type { ISetting } from './Settings.types'

/** Data-access layer for settings â€” generic CRUD over the settings model. */
export const SettingsRepository = Repository.define<typeof SettingsModel, ISetting>(SettingsModel)
