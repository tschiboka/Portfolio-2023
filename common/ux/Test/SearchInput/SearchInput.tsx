import { Accessor, TestError } from '../Accessor/Accessor'

export class SearchAccessor extends Accessor {
    /** The SearchInput wrapper (`.wrapped-component`) — hosts the input + option dropdown. */
    protected get wrapper(): HTMLElement {
        const wrapper = this.element.closest('.wrapped-component')
        if (!wrapper) throw TestError.notFound(this.context, '.wrapped-component')
        return wrapper as HTMLElement
    }

    get Get() {
        return {
            ...super.Get,
            icon: (): HTMLElement => this.scope.getByRole('button', { name: 'Search action' }),
            dropdown: () => this.wrapper.querySelector('.option-dropdown'),
            options: () => this.wrapper.querySelectorAll('.option'),
            highlight: () => this.wrapper.querySelector('.option .highlight'),
            option: (name: string | RegExp): HTMLElement => {
                const option = Array.from(this.wrapper.querySelectorAll('.option')).find((el) => {
                    const text = (el as HTMLElement).textContent?.trim() ?? ''
                    return typeof name === 'string' ? text === name : name.test(text)
                })
                if (!option) throw TestError.notFound(this.context, `option '${String(name)}'`)
                return option as HTMLElement
            },
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
            selectOption: async (typeText: string, optionName: string | RegExp) => {
                await Accessor.user.type(this.element, typeText)
                const option = this.Get.option(optionName)
                await Accessor.user.click(option)
            },
        }
    }
}

export const SearchInput = (label: string): SearchAccessor => {
    const element = Accessor.screen.getByLabelText(label)
    return new SearchAccessor(element, `SearchInput('${label}')`)
}
