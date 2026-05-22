import { Accessor } from '../Accessor/Accessor'

export class TypographyAccessor extends Accessor {
    get Get() {
        return {
            ...super.Get,
            tone: () => {
                const cls = this.element.className
                const tones = ['muted', 'info', 'success', 'warning', 'error']
                return tones.find((t) => cls.includes(`typo--${t}`)) ?? 'default'
            },
        }
    }
}

export const Typography = (text: string | RegExp): TypographyAccessor => {
    const element = Accessor.screen.getByText(text)
    return new TypographyAccessor(element, `Typography('${String(text)}')`)
}

Typography.byLabel = (label: string | RegExp): TypographyAccessor => {
    const element = Accessor.screen.getByLabelText(label)
    return new TypographyAccessor(element, `Typography.byLabel('${String(label)}')`)
}
