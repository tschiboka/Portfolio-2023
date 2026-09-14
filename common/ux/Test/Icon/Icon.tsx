import { Accessor } from '../Accessor/Accessor'

export class IconAccessor extends Accessor {
    get Get() {
        return {
            ...super.Get,
            paths: () => this.element.querySelectorAll('path').length,
            size: () => Number(this.element.getAttribute('width')),
            stroke: () => this.element.getAttribute('stroke'),
        }
    }
}

export const Icon = (name: string): IconAccessor => {
    const element = Accessor.screen.getByRole('img', { name })
    return new IconAccessor(element, `Icon(${name})`)
}
