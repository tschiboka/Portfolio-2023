import { Accessor } from '../Accessor/Accessor'

export class BoxAccessor extends Accessor {
    get Get() {
        return {
            ...super.Get,
            padding: () => ({
                top: this.element.style.paddingTop,
                right: this.element.style.paddingRight,
                bottom: this.element.style.paddingBottom,
                left: this.element.style.paddingLeft,
            }),
            margin: () => this.element.style.margin,
            background: () => this.element.style.background,
            borderRadius: () => this.element.style.borderRadius,
            display: () => this.element.style.display,
        }
    }
}

export const Box = (label: string): BoxAccessor => {
    const element = Accessor.screen.getByLabelText(label)
    return new BoxAccessor(element, `Box('${label}')`)
}
