import { render } from '@testing-library/react'
import { ComponentProps } from 'react'
import { Accessor } from '../Accessor/Accessor'
import { ContentNavigator as ContentNavigatorComponent } from '../../ContentNavigator'

type ContentNavigatorProps = ComponentProps<typeof ContentNavigatorComponent>

class ContentNavigatorAccessor extends Accessor {
    get Get() {
        return {
            ...super.Get,
            openButton: () => Accessor.screen.queryByLabelText('Open table of contents'),
            closeButton: () => this.scope.queryByLabelText('Close table of contents'),
            links: () => this.element.querySelectorAll('.ContentNavigator__link'),
            activeLinks: () => this.element.querySelectorAll('[data-active="true"]'),
            title: () => this.element.querySelector('.ContentNavigator__title'),
            isHidden: () => this.element.classList.contains('ContentNavigator__nav--hidden'),
        }
    }

    get Do() {
        return {
            ...super.Do,
            open: async () => {
                const btn = this.Get.openButton()
                if (!btn) throw new Error(`${this.context}: open button not found`)
                await Accessor.user.click(btn)
            },
            close: async () => {
                const btn = this.Get.closeButton()
                if (!btn) throw new Error(`${this.context}: close button not found`)
                await Accessor.user.click(btn)
            },
            clickLink: async (index: number) => {
                const links = this.Get.links()
                if (index >= links.length)
                    throw new Error(`${this.context}: link at index ${index} not found`)
                await Accessor.user.click(links[index])
            },
        }
    }
}

// Set is static (renders the component), Get/Do are instance-level (require a rendered element)
export const ContentNavigator = Object.assign(
    (label?: string): ContentNavigatorAccessor => {
        const element = label
            ? Accessor.screen.getByRole('navigation', { name: label })
            : Accessor.screen.getByRole('navigation')
        return new ContentNavigatorAccessor(
            element,
            label ? `ContentNavigator('${label}')` : 'ContentNavigator()',
        )
    },
    {
        Set: {
            mock: (props: ContentNavigatorProps) =>
                render(<ContentNavigatorComponent {...props} />),
        },
    },
)
