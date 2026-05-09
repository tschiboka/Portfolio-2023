import { Accessor } from '../Accessor/Accessor'

export class SearchAccessor extends Accessor {
    get Get() {
        return {
            ...super.Get,
            icon: (): HTMLElement => this.scope.getByRole('button', { name: 'Search action' }),
            dropdown: () => this.element.querySelector('.option-dropdown'),
            options: () => this.element.querySelectorAll('.option'),
            highlight: () => this.element.querySelector('.option .highlight'),
        }
    }

    get Do() {
        return {
            ...super.Do,
            clickIcon: async () => {
                const wrapper = this.Get.icon()
                const inner = wrapper.firstElementChild as HTMLElement | null
                await Accessor.user.click(inner ?? wrapper)
            },
            selectOption: async (label: string, typeText: string, optionName: string | RegExp) => {
                const input = this.scope.getByLabelText(label)
                await Accessor.user.type(input, typeText)
                const option = this.scope.getByText(optionName)
                await Accessor.user.click(option)
            },
        }
    }
}

export const SearchInput = (label: string): SearchAccessor => {
    const element = Accessor.screen.getByLabelText(label)
    return new SearchAccessor(element, `SearchInput('${label}')`)
}
