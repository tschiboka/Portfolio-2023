import { Accessor } from '../Accessor/Accessor'

export class CounterBadgeAccessor extends Accessor {
    get Get() {
        return {
            ...super.Get,
            text: () => this.element.textContent,
        }
    }

    get Do() {
        return {
            ...super.Do,
        }
    }
}

export const CounterBadge = (): CounterBadgeAccessor | null => {
    const element = document.querySelector<HTMLElement>('.CounterBadge')
    if (!element) return null
    return new CounterBadgeAccessor(element, 'CounterBadge()')
}
