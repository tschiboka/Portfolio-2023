import { Accessor } from '../Accessor/Accessor'

export class HeadingAccessor extends Accessor {
    get Get() {
        return {
            ...super.Get,
            level: () => {
                const tag = this.element.tagName.toLowerCase()
                const match = tag.match(/^h(\d)$/)
                return match ? Number(match[1]) : null
            },
            tone: () => {
                const cls = this.element.className
                const tones = ['muted', 'info', 'success', 'warning', 'error']
                return tones.find((t) => cls.includes(`typo--${t}`)) ?? 'default'
            },
        }
    }
}

export const Heading = (name: string | RegExp, level?: 1 | 2 | 3 | 4 | 5 | 6): HeadingAccessor => {
    const element = Accessor.screen.getByRole('heading', { name, level })
    return new HeadingAccessor(element, `Heading('${String(name)}'${level ? `, ${level}` : ''})`)
}
