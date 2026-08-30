import { Accessor } from '../Accessor/Accessor'

export class ToggleAccessor extends Accessor {
    get Get() {
        return {
            ...super.Get,
            active: () => this.element.getAttribute('aria-checked') === 'true',
            role: () => this.element.getAttribute('role'),
        }
    }

    get Do() {
        return {
            ...super.Do,
            toggle: async (): Promise<void> => {
                await Accessor.user.click(this.element)
            },
        }
    }
}

export const Toggle = (label?: string | RegExp): ToggleAccessor => {
    const element = label
        ? Accessor.screen.getByLabelText(label)
        : Accessor.screen.getByRole('switch')
    return new ToggleAccessor(element, `Toggle(${label ? `'${String(label)}'` : 'switch'})`)
}
