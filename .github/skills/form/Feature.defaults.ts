// @ts-nocheck — skill example, outside the tsconfig include.
import type { FeatureFormData } from './Feature.types'

// Initial field values. Declared once — the component reads this, it does not
// restate a field's starting value.
export const FeatureDefaults = {
    form: {
        name: '',
        userName: '',
        email: '',
        password: '',
        passwordConfirmation: '',
        category: undefined,
    } satisfies FeatureFormData,
    // Add other skills defaults if needed
}
