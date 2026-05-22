import { Accessor } from '../Accessor/Accessor'

export class ButtonAccessor extends Accessor {
    get Get() {
        return {
            ...super.Get,
            isDisabled: () => (this.element as HTMLButtonElement).disabled,
            size: () => {
                if (this.element.classList.contains('btn--sm')) return 'sm'
                if (this.element.classList.contains('standalone-btn')) return 'md'
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

export class LinkButtonAccessor extends Accessor {
    get Get() {
        return {
            ...super.Get,
            href: () => (this.element as HTMLAnchorElement).href,
            hasDownload: () => (this.element as HTMLAnchorElement).hasAttribute('download'),
            target: () => (this.element as HTMLAnchorElement).target,
            rel: () => (this.element as HTMLAnchorElement).rel,
        }
    }

    get Do() {
        return {
            ...super.Do,
        }
    }
}

export const Button = (name: string | RegExp): ButtonAccessor => {
    const element = Accessor.screen.getByRole('button', { name })
    return new ButtonAccessor(element, `Button('${String(name)}')`)
}

Button.Link = (name: string | RegExp): LinkButtonAccessor => {
    const element = Accessor.screen.getByRole('link', { name })
    return new LinkButtonAccessor(element, `Button.Link('${String(name)}')`)
}
