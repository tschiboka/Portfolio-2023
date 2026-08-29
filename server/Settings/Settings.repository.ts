import { Repository } from '../../common/utils/Server'
import { SettingsModel } from './Settings.model'
import type { ISetting } from './Settings.types'

/** Data-access layer for settings — generic CRUD over the settings model. */
export const SettingsRepository = Repository.define<typeof SettingsModel, ISetting>(SettingsModel)
