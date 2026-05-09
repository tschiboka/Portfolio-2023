import { screen } from '@testing-library/react'
import { Accessor } from '../Accessor/Accessor'

export class RadioAccessor extends Accessor {
    get Get() {
        return {
            ...super.Get,
            isChecked: () => (this.element as HTMLInputElement).checked,
            isDisabled: () => (this.element as HTMLInputElement).disabled,
        }
    }

    get Do() {
        return {
            ...super.Do,
            select: async () => {
                await Accessor.user.click(this.element)
            },
        }
    }
}

export const Radio = (name: string | RegExp): RadioAccessor => {
    const element = screen.getByRole('radio', { name })
    return new RadioAccessor(element, `Radio('${String(name)}')`)
}
