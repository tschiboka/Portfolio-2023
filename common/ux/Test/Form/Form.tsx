import { Accessor, TestError } from '../Accessor'
import { InputAccessor } from '../Input'
import { ButtonAccessor } from '../Button'
import { CheckboxAccessor } from '../Checkbox'
import { RadioAccessor } from '../Radio'
import { DateAccessor } from '../DateInput'
import { SearchAccessor } from '../SearchInput'
import type { Nullable } from '@common-utils'

class FormInstance extends Accessor {
    Button = (name: string | RegExp): ButtonAccessor => {
        const element = this.scope.getByRole('button', { name })
        return new ButtonAccessor(element, `${this.context}.Button('${String(name)}')`)
    }

    Checkbox = (name: string | RegExp): CheckboxAccessor => {
        const element = this.scope.getByRole('checkbox', { name })
        return new CheckboxAccessor(element, `${this.context}.Checkbox('${String(name)}')`)
    }

    Date = (label: string): DateAccessor => {
        const element = this.scope.getByLabelText(label)
        return new DateAccessor(element, `${this.context}.Date('${label}')`)
    }

    Input = (label: string): InputAccessor => {
        const element = this.scope.getByLabelText(label)
        return new InputAccessor(element, `${this.context}.Input('${label}')`)
    }

    Radio = (name: string | RegExp): RadioAccessor => {
        const element = this.scope.getByRole('radio', { name })
        return new RadioAccessor(element, `${this.context}.Radio('${String(name)}')`)
    }

    Search = (label: string): SearchAccessor => {
        const element = this.scope.getByLabelText(label)
        return new SearchAccessor(element, `${this.context}.Search('${label}')`)
    }

    get Get() {
        return {
            ...super.Get,
            byTestId: (id: string): HTMLElement => this.scope.getByTestId(id),
            errorMsg: () => this.scope.queryByRole('alert'),
            errorMsgs: (): HTMLElement[] => this.scope.getAllByRole('alert'),
            fieldset: (name: string | RegExp): HTMLElement =>
                this.scope.getByRole('group', { name }),
            submitErrorMsg: (): Nullable<HTMLElement> =>
                this.element.querySelector('.submit-error-message'),
        }
    }

    get Do() {
        return {
            ...super.Do,
            submit: async () => {
                const buttons = this.scope.getAllByRole('button')
                const submit = buttons.find((b) => (b as HTMLButtonElement).type === 'submit')
                if (!submit) throw TestError.notFound(this.context, 'submit button')
                await Accessor.user.click(submit)
            },
        }
    }
}

export const Form = (label: string): FormInstance => {
    const element = Accessor.screen.getByRole('form', { name: label })
    return new FormInstance(element, `Form('${label}')`)
}
