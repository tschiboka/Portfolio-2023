import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

export const Form = {
    Get: {
        // Queries
        byPlaceholder: (placeholder: string) => screen.getByPlaceholderText(placeholder),
        text: (text: string | RegExp) => screen.getByText(text),
        byLabel: (label: string) => screen.getByLabelText(label),
        byTestId: (id: string) => screen.getByTestId(id),
        radios: () => screen.getAllByRole('radio'),

        // DOM
        actionIcon: () => document.querySelector('.action-icon'),
        dropdown: () => document.querySelector('.option-dropdown'),
        options: () => document.querySelectorAll('.option'),
        highlight: () => document.querySelector('.option .highlight'),
        form: (container: HTMLElement) => container.querySelector('form'),
        label: (container: HTMLElement) => container.querySelector('label'),
    },

    Query: {
        text: (text: string | RegExp) => screen.queryByText(text),
        dropdown: () => document.querySelector('.option-dropdown'),
    },

    Click: {
        actionIcon: async () => {
            const user = userEvent.setup()
            const icon = Form.Get.actionIcon()!
            await user.click(icon.firstElementChild!)
            return user
        },
        radio: async (index: number) => {
            const user = userEvent.setup()
            await user.click(Form.Get.radios()[index])
            return user
        },
    },

    Act: {
        type: async (placeholder: string, text: string) => {
            const user = userEvent.setup()
            const el = Form.Get.byPlaceholder(placeholder)
            await user.type(el, text)
            return el
        },
        clickText: async (text: string | RegExp) => {
            const user = userEvent.setup()
            await user.click(Form.Get.text(text))
        },
        clickOutside: async () => {
            const user = userEvent.setup()
            await user.click(document.body)
        },
        selectOption: async (placeholder: string, search: string, option: string | RegExp) => {
            const user = userEvent.setup()
            await user.type(Form.Get.byPlaceholder(placeholder), search)
            await user.click(Form.Get.text(option))
        },
    },
}
