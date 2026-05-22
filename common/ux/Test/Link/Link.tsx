import { Accessor } from '../Accessor/Accessor'

export class LinkAccessor extends Accessor {
    get Get() {
        return {
            ...super.Get,
            href: () => this.element.getAttribute('href'),
            target: () => this.element.getAttribute('target'),
            rel: () => this.element.getAttribute('rel'),
            hasDownload: () => this.element.hasAttribute('download'),
            isExternal: () => this.element.getAttribute('target') === '_blank',
        }
    }

    get Do() {
        return {
            ...super.Do,
        }
    }
}

export const Link = (name: string | RegExp): LinkAccessor => {
    const element = Accessor.screen.getByRole('link', { name })
    return new LinkAccessor(element, `Link('${String(name)}')`)
}
