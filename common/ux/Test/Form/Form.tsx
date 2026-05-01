import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

export const Form = {
    Get: {
        byPlaceholder: (placeholder: string) => screen.getByPlaceholderText(placeholder),
        text: (text: string | RegExp) => screen.getByText(text),
        byLabel: (label: string) => screen.getByLabelText(label),
        byTestId: (id: string) => screen.getByTestId(id),
        radios: () => screen.getAllByRole('radio'),
        checkbox: () => screen.getByRole('checkbox'),
        button: (name?: string | RegExp) =>
            name ? screen.getByRole('button', { name }) : screen.getByRole('button'),
        buttons: () => screen.getAllByRole('button'),
        actionIcon: () => document.querySelector('.action-icon'),
        form: (container: HTMLElement) => container.querySelector('form'),
        label: (container: HTMLElement) => container.querySelector('label'),
        buttonGroup: (container: HTMLElement) => container.querySelector('.button-group'),
        fieldset: (container: HTMLElement) => container.querySelector('fieldset'),
        errorMsg: () => document.querySelector('.error-msg'),
        errorMsgs: () => document.querySelectorAll('.error-msg'),
    },

    Query: {
        text: (text: string | RegExp) => screen.queryByText(text),
        errorMsg: () => document.querySelector('.error-msg'),
    },

    Click: {
        radio: async (index: number) => {
            const user = userEvent.setup()
            await user.click(Form.Get.radios()[index])
            return user
        },
        checkbox: async () => {
            const user = userEvent.setup()
            await user.click(Form.Get.checkbox())
            return user
        },
        button: async (name?: string | RegExp) => {
            const user = userEvent.setup()
            await user.click(Form.Get.button(name))
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
    },

    Date: {
        Get: {
            input: () => document.querySelector('.date-input'),
            icon: () => document.querySelector('.date-input__icon'),
            calendar: () => document.querySelector('.date-input__calendar'),
            days: () => document.querySelectorAll('.date-input__day:not(.empty)'),
            disabledDays: () => document.querySelectorAll('.date-input__day.disabled'),
            selectedDay: () => document.querySelector('.date-input__day.selected'),
            todayDay: () => document.querySelector('.date-input__day.today'),
            focusedDay: () => document.querySelector('.date-input__day.focused'),
            yearPicker: () => document.querySelector('.date-input__year-picker'),
            yearOptions: () => document.querySelectorAll('.date-input__year-option'),
            monthOptions: () => document.querySelectorAll('.date-input__month-option'),
            selectedYear: () => document.querySelector('.date-input__year-option.selected'),
            selectedMonth: () => document.querySelector('.date-input__month-option.selected'),
            monthYearBtn: () => document.querySelector('.date-input__month-year-btn'),
            grid: () => document.querySelector('.date-input__grid'),
        },
        Query: {
            calendar: () => document.querySelector('.date-input__calendar'),
            yearPicker: () => document.querySelector('.date-input__year-picker'),
        },
        Click: {
            icon: async () => {
                const user = userEvent.setup()
                const icon = document.querySelector('.date-input__icon')!
                await user.click(icon)
                return user
            },
            day: async (index: number) => {
                const user = userEvent.setup()
                const days = document.querySelectorAll('.date-input__day:not(.empty)')
                await user.click(days[index])
                return user
            },
            prevMonth: async () => {
                const user = userEvent.setup()
                const buttons = screen.getAllByRole('button')
                await user.click(buttons[0])
                return user
            },
            nextMonth: async () => {
                const user = userEvent.setup()
                const buttons = screen.getAllByRole('button')
                await user.click(buttons[2])
                return user
            },
            monthYearBtn: async () => {
                const user = userEvent.setup()
                const btn = document.querySelector('.date-input__month-year-btn')!
                await user.click(btn)
                return user
            },
            today: async () => {
                const user = userEvent.setup()
                const btn = screen.getByRole('button', { name: /Today/ })
                await user.click(btn)
                return user
            },
            clear: async () => {
                const user = userEvent.setup()
                const btn = screen.getByText(/Clear/).closest('button')!
                await user.click(btn)
                return user
            },
        },
    },

    Search: {
        Get: {
            icon: () => document.querySelector('.action-icon'),
            dropdown: () => document.querySelector('.option-dropdown'),
            options: () => document.querySelectorAll('.option'),
            highlight: () => document.querySelector('.option .highlight'),
        },
        Query: {
            dropdown: () => document.querySelector('.option-dropdown'),
        },
        Click: {
            icon: async () => {
                const user = userEvent.setup()
                const icon = document.querySelector('.action-icon')!
                await user.click(icon.firstElementChild!)
                return user
            },
        },
        Act: {
            selectOption: async (placeholder: string, search: string, option: string | RegExp) => {
                const user = userEvent.setup()
                await user.type(screen.getByPlaceholderText(placeholder), search)
                await user.click(screen.getByText(option))
            },
        },
    },
}
