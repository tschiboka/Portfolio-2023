import { ApiMessage, ApiResponder } from '@common-utils'
import { SettingsRepository } from './Settings.repository'
import { SettingsSchema } from './Settings.schema'
import type { SettingsInput } from './Settings.types'
import type { ISetting } from './Settings.types'

/** Business logic for settings - persistence via the repository, validation via the schema. */
export const SettingsService = {
    /** Returns the app's settings (a singleton document). */
    get: async (): Promise<ISetting> => {
        const settings = await SettingsRepository.findOne()
        if (!settings) throw ApiResponder.notFound('settings')

        return settings
    },

    /** Creates the app's settings if none exist. */
    create: async (input: SettingsInput): Promise<ISetting> => {
        const result = SettingsSchema.validate(input)
        const existing = await SettingsRepository.findOne()
        if (existing) throw ApiResponder.conflict(ApiMessage.exists('settings'))

        if (result.error) throw ApiResponder.badRequest(result.error)

        const settings = SettingsRepository.create(result.value)
        await SettingsRepository.save(settings)

        return settings
    },
}
