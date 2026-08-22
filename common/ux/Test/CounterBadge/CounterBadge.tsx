import { Accessor } from '../Accessor/Accessor'
import type { Nullable } from '@common/utils'

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

export const CounterBadge = (): Nullable<CounterBadgeAccessor> => {
    const element = document.querySelector<HTMLElement>('.CounterBadge')
    if (!element) return null
    return new CounterBadgeAccessor(element, 'CounterBadge()')
}
