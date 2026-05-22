import { Accessor } from '../Accessor/Accessor'

export class RegionAccessor extends Accessor {
    get Get() {
        return {
            ...super.Get,
            isOpen: () => {
                const header = this.element.querySelector('.region__header')
                return header?.getAttribute('aria-expanded') === 'true'
            },
            isCollapsible: () => this.element.querySelector('[aria-expanded]') !== null,
            title: () => this.element.querySelector('.region__title')?.textContent ?? null,
            icon: () => this.element.querySelector('.region__icon'),
            content: () => this.element.querySelector('.region__content'),
            variant: () => {
                const cls = this.element.className
                const match = cls.match(/region--(\w+)/)
                return match?.[1] ?? 'default'
            },
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

export const Region = (label: string): RegionAccessor => {
    const element = Accessor.screen.getByLabelText(label)
    return new RegionAccessor(element, `Region('${label}')`)
}
