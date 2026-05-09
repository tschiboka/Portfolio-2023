import { Accessor } from '../Accessor/Accessor'

export class DateAccessor extends Accessor {
    get Get() {
        return {
            ...super.Get,
            icon: (): HTMLElement => this.scope.getByRole('button', { name: 'Toggle calendar' }),
            calendar: () => this.element.querySelector('.date-input__calendar'),
            days: () => this.element.querySelectorAll('.date-input__day:not(.empty)'),
            disabledDays: () => this.element.querySelectorAll('.date-input__day.disabled'),
            selectedDay: () => this.element.querySelector('.date-input__day.selected'),
            todayDay: () => this.element.querySelector('.date-input__day.today'),
            focusedDay: () => this.element.querySelector('.date-input__day.focused'),
            yearPicker: () => this.element.querySelector('.date-input__year-picker'),
            yearOptions: () => this.element.querySelectorAll('.date-input__year-option'),
            monthOptions: () => this.element.querySelectorAll('.date-input__month-option'),
            selectedYear: () => this.element.querySelector('.date-input__year-option.selected'),
            selectedMonth: () => this.element.querySelector('.date-input__month-option.selected'),
            monthYearBtn: () => this.element.querySelector('.date-input__month-year-btn'),
            grid: () => this.element.querySelector('.date-input__grid'),
        }
    }

    get Do() {
        return {
            ...super.Do,
            toggleCalendar: async () => {
                await Accessor.user.click(this.Get.icon())
            },
            selectDay: async (dayIndex: number) => {
                const days = this.Get.days()
                await Accessor.user.click(days[dayIndex])
            },
            selectToday: async () => {
                const btn = this.scope.getByRole('button', { name: 'Today' })
                await Accessor.user.click(btn)
            },
            clear: async () => {
                const btn = this.scope.getByRole('button', { name: /Clear/i })
                await Accessor.user.click(btn)
            },
            nextMonth: async () => {
                const header = this.require('.date-input__header')
                const buttons = header.querySelectorAll('button')
                await Accessor.user.click(buttons[buttons.length - 1])
            },
            prevMonth: async () => {
                const header = this.require('.date-input__header')
                const buttons = header.querySelectorAll('button')
                await Accessor.user.click(buttons[0])
            },
            clickMonthYear: async () => {
                const btn = this.require('.date-input__month-year-btn')
                await Accessor.user.click(btn)
            },
        }
    }
}

export const DateInput = (label: string): DateAccessor => {
    const element = Accessor.screen.getByLabelText(label)
    return new DateAccessor(element, `DateInput('${label}')`)
}
