import { Accessor } from '../Accessor/Accessor'

export class InputAccessor extends Accessor {
    get Get() {
        return {
            ...super.Get,
            value: () => (this.element as HTMLInputElement).value,
            isDisabled: () => (this.element as HTMLInputElement).disabled,
            type: () => (this.element as HTMLInputElement).type,
            errorMsg: () => {
                const wrapper = this.element.closest('.wrapped-component')
                return wrapper?.querySelector('[role="alert"]') ?? null
            },
        }
    }

    get Do() {
        return {
            ...super.Do,
            type: async (text: string) => {
                await Accessor.user.type(this.element, text)
                return this.element
            },
            clear: async () => {
                await Accessor.user.clear(this.element)
                return this.element
            },
            clearAndType: async (text: string) => {
                await Accessor.user.clear(this.element)
                await Accessor.user.type(this.element, text)
                return this.element
            },
        }
    }
}

export const Input = (label: string): InputAccessor => {
    const element = Accessor.screen.getByLabelText(label)
    return new InputAccessor(element, `Input('${label}')`)
}
