import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

export const Overlay = {
    Get: {
        // ActionMenu
        menu: () => screen.getByRole('menu'),
        menuItems: () => screen.getAllByRole('menuitem'),
        menuItem: (label: string) => screen.getByRole('menuitem', { name: label }),

        // Popup
        dialog: () => screen.getByRole('dialog'),
        closeButton: () => screen.getByLabelText('Overlay Close'),
        backdrop: () => document.querySelector('.Overlay--popup__backdrop'),
        heading: () => screen.getByRole('heading'),
        text: (text: string | RegExp) => screen.getByText(text),
        byLabel: (label: string) => screen.getByLabelText(label),
        byTestId: (id: string) => screen.getByTestId(id),
        actionButtons: () =>
            screen
                .getAllByRole('button')
                .filter((b) => b.classList.contains('Overlay--popup__action-btn')),
    },

    Query: {
        menu: () => screen.queryByRole('menu'),
        dialog: () => screen.queryByRole('dialog'),
        closeButton: () => screen.queryByLabelText('Overlay Close'),
        heading: () => screen.queryByRole('heading'),
        text: (text: string | RegExp) => screen.queryByText(text),
    },

    Click: {
        closeButton: async () => {
            const user = userEvent.setup()
            await user.click(Overlay.Get.closeButton())
            return user
        },
        menuItem: async (label: string) => {
            const user = userEvent.setup()
            await user.click(Overlay.Get.menuItem(label))
            return user
        },
        backdrop: async () => {
            const user = userEvent.setup()
            await user.click(Overlay.Get.backdrop()!)
            return user
        },
        actionButton: async (label: string) => {
            const user = userEvent.setup()
            await user.click(Overlay.Get.text(label))
            return user
        },
    },

    Act: {
        dismiss: async () => {
            const user = userEvent.setup()
            await user.keyboard('{Escape}')
            return user
        },
        dismissByBackdrop: async () => {
            return Overlay.Click.backdrop()
        },
        selectMenuItem: async (label: string) => {
            return Overlay.Click.menuItem(label)
        },
        clickOutside: async () => {
            const user = userEvent.setup()
            await user.click(document.body)
            return user
        },
    },
}
