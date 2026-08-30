import { ApiMessage, ApiResponder } from '@utils'
import { SettingsRepository } from './Settings.repository'
import { SettingsSchema } from './Settings.schema'
import type { SettingsInput } from './Settings.types'
import type { ISetting } from './Settings.types'

/** Business logic for settings â€” persistence via the repository, validation via the schema. */
export const SettingsService = {
    /** Returns the app's settings (a singleton document). */
    get: async (): Promise<ISetting> => {
        const settings = await SettingsRepository.findOne()
        if (!settings) throw ApiResponder.notFound('settings')

        return settings
    },

    /** Creates the app's settings if none exist. */
    create: async (input: SettingsInput): Promise<ISetting> => {
        const existing = await SettingsRepository.findOne()
        if (existing) throw ApiResponder.conflict(ApiMessage.exists('settings'))

        const { error, value } = SettingsSchema.validate(input)
        if (error) throw ApiResponder.badRequest(error)

        const settings = SettingsRepository.create(value)
        await SettingsRepository.save(settings)

        return settings
    },
}
