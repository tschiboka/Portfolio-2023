import { Accessor } from '../Accessor/Accessor'

export class CheckboxAccessor extends Accessor {
    get Get() {
        return {
            ...super.Get,
            isChecked: () => (this.element as HTMLInputElement).checked,
            isDisabled: () => (this.element as HTMLInputElement).disabled,
            errorMsg: () => {
                const wrapper = this.element.closest('.checkbox-field')
                return wrapper?.querySelector('[role="alert"]') ?? null
            },
        }
    }

    get Do() {
        return {
            ...super.Do,
            toggle: async () => {
                await Accessor.user.click(this.element)
            },
        }
    }
}

export const Checkbox = (name: string | RegExp): CheckboxAccessor => {
    const element = Accessor.screen.getByRole('checkbox', { name })
    return new CheckboxAccessor(element, `Checkbox('${String(name)}')`)
}
