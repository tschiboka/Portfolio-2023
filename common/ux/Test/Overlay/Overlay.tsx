import { Accessor } from '../Accessor/Accessor'

export class OverlayAccessor extends Accessor {
    get Get() {
        return {
            ...super.Get,
            // ActionMenu
            menu: () => this.element,
            menuItems: () => this.scope.getAllByRole('menuitem'),
            menuItem: (label: string) => this.scope.getByRole('menuitem', { name: label }),

            // Popup
            dialog: () => this.element,
            closeButton: () => this.scope.getByLabelText('Overlay Close'),
            backdrop: () => this.element.closest('.Overlay--popup__backdrop'),
            heading: () => this.scope.getByRole('heading'),
            byTestId: (id: string) => this.scope.getByTestId(id),
            actionButtons: () =>
                this.scope
                    .getAllByRole('button')
                    .filter((b) => b.classList.contains('Overlay--popup__action-btn')),
        }
    }

    get Do() {
        return {
            ...super.Do,
            close: async () => {
                await Accessor.user.click(this.Get.closeButton())
            },
            clickMenuItem: async (label: string) => {
                await Accessor.user.click(this.Get.menuItem(label))
            },
            clickBackdrop: async () => {
                await Accessor.user.click(this.Get.backdrop()!)
            },
            clickActionButton: async (label: string) => {
                await Accessor.user.click(this.Get.byText(label))
            },
            dismiss: async () => {
                await Accessor.user.keyboard('{Escape}')
            },
            clickOutside: async () => {
                await Accessor.user.click(document.body)
            },
        }
    }
}

export const Overlay = (label: string): OverlayAccessor => {
    const element = Accessor.screen.getByLabelText(label)
    return new OverlayAccessor(element, `Overlay('${label}')`)
}
