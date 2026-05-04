import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ComponentProps } from 'react'
import { Code as CodeComponent } from '../../Code'

type CodeProps = ComponentProps<typeof CodeComponent>

export const Code = {
    Get: {
        // Structure
        root: (container: HTMLElement) => container.querySelector('.Code'),
        header: (container: HTMLElement) => container.querySelector('.Code__header'),
        fileName: (container: HTMLElement) => container.querySelector('.Code__file-name'),
        language: (container: HTMLElement) => container.querySelector('.Code__language'),
        highlighter: () => {
            const el = document.querySelector('pre')
            if (!el) throw new Error('Could not find <pre> (syntax highlighter)')
            return el
        },
        highlighterCode: () => {
            const el = document.querySelector('pre > code')
            if (!el) throw new Error('Could not find <code> inside syntax highlighter')
            return el
        },
        copyIcon: () => {
            const el = document.querySelector('.Code__copy-icon')
            if (!el) throw new Error('Could not find .Code__copy-icon')
            return el as HTMLElement
        },
        copyMessage: (container: HTMLElement) => container.querySelector('.Code__copy-message'),
        text: (text: string) => screen.getByText(text),
    },

    Query: {
        copyMessage: () => screen.queryByText('Copied'),
    },

    Click: {
        copyIcon: async () => {
            const user = userEvent.setup({
                advanceTimers: (delay) => void vi.advanceTimersByTime(delay),
            })
            await user.click(Code.Get.copyIcon())
            return user
        },
    },

    Set: {
        mock: (props: CodeProps) => render(<CodeComponent {...props} />),
    },
}
