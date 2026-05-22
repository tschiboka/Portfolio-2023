import { Accessor } from '../Accessor/Accessor'

export class PillAccessor extends Accessor {
    get Get() {
        return {
            ...super.Get,
            label: () => this.element.textContent,
            color: () => {
                const cls = this.element.className
                const match = cls.match(/Pill--(?!outlined|solid)(\w+)/)
                return match?.[1] ?? null
            },
            variant: () => {
                if (this.element.classList.contains('Pill--solid')) return 'solid'
                if (this.element.classList.contains('Pill--outlined')) return 'outlined'
                return null
            },
        }
    }

    get Do() {
        return {
            ...super.Do,
        }
    }
}

export const Pill = (label: string | RegExp): PillAccessor => {
    const element = Accessor.screen.getByText(label)
    return new PillAccessor(element, `Pill('${String(label)}')`)
}

Pill.ByLabel = (ariaLabel: string | RegExp): PillAccessor => {
    const element = Accessor.screen.getByLabelText(ariaLabel)
    return new PillAccessor(element, `Pill.ByLabel('${String(ariaLabel)}')`)
}
