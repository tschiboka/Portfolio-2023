import { Accessor } from '../Accessor/Accessor'

export class SectionAccessor extends Accessor {
    get Get() {
        return {
            ...super.Get,
            isOpen: () => {
                const header = this.element.querySelector('.region__header')
                return header?.getAttribute('aria-expanded') === 'true'
            },
            isExpandable: () => this.element.querySelector('[aria-expanded]') !== null,
            title: () => this.element.querySelector('.region__title')?.textContent ?? null,
            icon: () => this.element.querySelector('.region__icon'),
            content: () => this.element.querySelector('.region__content'),
        }
    }

    get Do() {
        return {
            ...super.Do,
            toggle: async () => {
                const header = this.require('[aria-expanded]')
                await Accessor.user.click(header)
            },
        }
    }
}

export const Section = (label: string): SectionAccessor => {
    const element = Accessor.screen.getByRole('region', { name: label })
    return new SectionAccessor(element, `Section('${label}')`)
}

Section.byTitle = (title: string): SectionAccessor => {
    const element = Accessor.screen.getByText(title).closest('section')
    return new SectionAccessor(element as HTMLElement, `Section.byTitle('${title}')`)
}
