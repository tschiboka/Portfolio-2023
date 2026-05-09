import { render } from '@testing-library/react'
import { ComponentProps } from 'react'
import { Accessor } from '../Accessor/Accessor'
import { Code as CodeComponent } from '../../Code'

type CodeProps = ComponentProps<typeof CodeComponent>

class CodeAccessor extends Accessor {
    get Get() {
        return {
            ...super.Get,
            header: () => this.element.querySelector('.Code__header'),
            fileName: () => this.element.querySelector('.Code__file-name'),
            language: () => this.element.querySelector('.Code__language'),
            highlighter: () => this.require('pre'),
            highlighterCode: () => this.require('pre > code'),
            copyIcon: () => this.require('.Code__copy-icon'),
            copyMessage: () => this.element.querySelector('.Code__copy-message'),
        }
    }

    get Do() {
        return {
            ...super.Do,
            clickCopyIcon: async () => {
                await Accessor.user.click(this.Get.copyIcon())
            },
        }
    }
}

// Set is static (renders the component), Get/Do are instance-level (require a rendered element)
export const Code = Object.assign(
    (label: string): CodeAccessor => {
        const element = Accessor.screen.getByLabelText(label)
        return new CodeAccessor(element, `Code('${label}')`)
    },
    {
        Set: {
            mock: (props: CodeProps) => render(<CodeComponent {...props} />),
        },
    },
)
