import { Accessor, TestError } from '../Accessor/Accessor'
import { InputAccessor } from '../Input/Input'
import { ButtonAccessor } from '../Button/Button'
import { CheckboxAccessor } from '../Checkbox/Checkbox'
import { RadioAccessor } from '../Radio/Radio'
import { DateAccessor } from '../DateInput/DateInput'
import { SearchAccessor } from '../SearchInput/SearchInput'

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
            submitErrorMsg: (): HTMLElement | null =>
                this.element.querySelector('.submit-error-message'),
        }
    }

    get Do() {
        return {
            ...super.Do,
            submit: async () => {
                const buttons = this.scope.getAllByRole('button')
                const submit = buttons.find((b) => (b as HTMLButtonElement).type === 'submit')
                // eslint-disable-next-line @typescript-eslint/no-unsafe-call
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
