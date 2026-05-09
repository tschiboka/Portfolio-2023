import { Accessor } from '../Accessor/Accessor'

export class ButtonAccessor extends Accessor {
    get Get() {
        return {
            ...super.Get,
            isDisabled: () => (this.element as HTMLButtonElement).disabled,
        }
    }

    get Do() {
        return {
            ...super.Do,
        }
    }
}

export const Button = (name: string | RegExp): ButtonAccessor => {
    const element = Accessor.screen.getByRole('button', { name })
    return new ButtonAccessor(element, `Button('${String(name)}')`)
}
