import { Accessor } from '../Accessor/Accessor'

export class FigureAccessor extends Accessor {
    get Get() {
        return {
            ...super.Get,
            image: () => this.element.querySelector('img'),
            src: () => this.element.querySelector('img')?.getAttribute('src') ?? null,
            alt: () => this.element.querySelector('img')?.getAttribute('alt') ?? null,
            caption: () => this.element.querySelector('figcaption')?.textContent ?? null,
            size: () => {
                const cls = this.element.className
                const match = cls.match(/figure--(\w+)/)
                return match?.[1] ?? null
            },
            isZoomable: () => this.element.classList.contains('figure--zoomable'),
            bgColor: () =>
                (this.element.querySelector('.figure__image-wrapper') as HTMLElement)?.style
                    .backgroundColor ?? null,
        }
    }

    get Do() {
        return {
            ...super.Do,
            zoom: async () => {
                await Accessor.user.click(this.element)
            },
        }
    }
}

export const Figure = (label: string): FigureAccessor => {
    const element = Accessor.screen.getByLabelText(label)
    return new FigureAccessor(element, `Figure('${label}')`)
}
