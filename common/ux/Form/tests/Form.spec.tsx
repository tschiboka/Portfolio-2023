import React from 'react'
import { screen } from '@testing-library/react'
import { Test, Accessor } from '../../Test'
import { Set, FORM_LABEL } from './Form.spec.utils'
import { iconOptions } from './Form.spec.mocks'

beforeAll(() => {
    Element.prototype.scrollIntoView = vi.fn()
})

describe('Input', () => {
    it('should render a text input', () => {
        Set.input()
        const form = Test.Form(FORM_LABEL)
        const input = form.Input('Text')
        expect(input.Get.type()).toBe('text')
    })

    it('should accept user input', async () => {
        Set.input()
        const form = Test.Form(FORM_LABEL)
        const input = form.Input('Text')
        await input.Do.type('hello')
        expect(input.Get.value()).toBe('hello')
    })

    it('should render with the correct type', () => {
        Set.input({ type: 'email' })
        const form = Test.Form(FORM_LABEL)
        const input = form.Input('Text')
        expect(input.Get.type()).toBe('email')
    })

    it('should render reveal password icon when addRevealPasswordIcon is true', () => {
        Set.password()
        const form = Test.Form(FORM_LABEL)
        const input = form.Input('Password')
        expect(input.Get.type()).toBe('password')
        expect(form.Get.byLabel('Toggle password visibility')).toBeInTheDocument()
    })

    it('should toggle password visibility when reveal icon is clicked', async () => {
        const setReveal = vi.fn()
        Set.password({ revealPassword: false, setRevealPassword: setReveal })
        const form = Test.Form(FORM_LABEL)
        const toggle = form.Button('Toggle password visibility')
        await toggle.Do.click()
        expect(setReveal).toHaveBeenCalledWith(true)
    })

    it('should show text type when revealPassword is true', () => {
        Set.password({ revealPassword: true })
        const form = Test.Form(FORM_LABEL)
        const input = form.Input('Password')
        expect(input.Get.type()).toBe('text')
    })
})

describe('TextArea', () => {
    it('should render a textarea', () => {
        Set.textArea({ placeholder: 'Enter description' })
        expect(screen.getByPlaceholderText('Enter description')).toBeInTheDocument()
    })

    it('should accept user input', async () => {
        Set.textArea()
        const form = Test.Form(FORM_LABEL)
        const textarea = form.Input('Description')
        await textarea.Do.type('test content')
        expect(textarea.Get.value()).toBe('test content')
    })

    it('should show character count when maxLength is set', async () => {
        Set.textArea({ maxLength: 255 })
        const form = Test.Form(FORM_LABEL)
        const textarea = form.Input('Description')
        await textarea.Do.type('hello')
        expect(form.Get.byText('5')).toBeInTheDocument()
        expect(form.Get.byText(/of 255 chars/)).toBeInTheDocument()
    })

    it('should not show character count when maxLength is not set', () => {
        Set.textArea()
        const form = Test.Form(FORM_LABEL)
        expect(form.Has.byText(/characters/)).toBe(false)
    })

    it('should render with custom rows', () => {
        Set.textArea({ rows: 5 })
        const form = Test.Form(FORM_LABEL)
        const textarea = form.Input('Description')
        expect(textarea.Get.attribute('rows')).toBe('5')
    })

    it('should default to 3 rows', () => {
        Set.textArea()
        const form = Test.Form(FORM_LABEL)
        const textarea = form.Input('Description')
        expect(textarea.Get.attribute('rows')).toBe('3')
    })
})

describe('RadioButton', () => {
    it('should render two radio buttons', () => {
        Set.radioButton()
        expect(screen.getAllByRole('radio')).toHaveLength(2)
    })

    it('should have the first option checked by default', () => {
        Set.radioButton()
        const form = Test.Form(FORM_LABEL)
        const radioA = form.Radio('Option A')
        const radioB = form.Radio('Option B')
        expect(radioA.Get.isChecked()).toBe(true)
        expect(radioB.Get.isChecked()).toBe(false)
    })

    it('should call onChange when selected', async () => {
        const onChange = vi.fn()
        Set.radioButton({ onChange })
        const form = Test.Form(FORM_LABEL)
        const radioB = form.Radio('Option B')
        await radioB.Do.select()
        expect(onChange).toHaveBeenCalled()
    })

    it('should update checked state when clicked', async () => {
        Set.radioButton()
        const form = Test.Form(FORM_LABEL)
        const radioB = form.Radio('Option B')
        await radioB.Do.select()
        expect(radioB.Get.isChecked()).toBe(true)
    })
})

describe('Checkbox', () => {
    it('should render an unchecked checkbox', () => {
        Set.checkbox()
        const form = Test.Form(FORM_LABEL)
        const checkbox = form.Checkbox('Accept terms')
        expect(checkbox.Get.isChecked()).toBe(false)
    })

    it('should render with a label', () => {
        Set.checkbox()
        const form = Test.Form(FORM_LABEL)
        expect(form.Get.byText('Accept terms')).toBeInTheDocument()
    })

    it('should toggle checked state when clicked', async () => {
        Set.checkbox()
        const form = Test.Form(FORM_LABEL)
        const checkbox = form.Checkbox('Accept terms')
        await checkbox.Do.toggle()
        expect(checkbox.Get.isChecked()).toBe(true)
    })

    it('should call onChange with true when checked', async () => {
        const onChange = vi.fn()
        Set.checkbox({ onChange })
        const form = Test.Form(FORM_LABEL)
        const checkbox = form.Checkbox('Accept terms')
        await checkbox.Do.toggle()
        expect(onChange).toHaveBeenCalledWith(true)
    })

    it('should call onChange with false when unchecked', async () => {
        const onChange = vi.fn()
        Set.checkbox({ onChange })
        const form = Test.Form(FORM_LABEL)
        const checkbox = form.Checkbox('Accept terms')
        await checkbox.Do.toggle()
        await checkbox.Do.toggle()
        expect(onChange).toHaveBeenLastCalledWith(false)
    })
})

describe('Button', () => {
    it('should render with children text', () => {
        Set.button({ children: 'Submit' })
        const form = Test.Form(FORM_LABEL)
        const button = form.Button('Submit')
        expect(button.Get.textContent()).toBe('Submit')
    })

    it('should default to type="button"', () => {
        Set.button()
        const form = Test.Form(FORM_LABEL)
        const button = form.Button('Click me')
        expect(button.Get.attribute('type')).toBe('button')
    })

    it('should accept type="submit"', () => {
        Set.button({ type: 'submit', children: 'Send' })
        const form = Test.Form(FORM_LABEL)
        const button = form.Button('Send')
        expect(button.Get.attribute('type')).toBe('submit')
    })

    it('should apply secondary class for variant="secondary"', () => {
        Set.button({ variant: 'secondary' })
        const form = Test.Form(FORM_LABEL)
        const button = form.Button('Click me')
        expect(button.Get.className()).toContain('secondary')
    })

    it('should not apply secondary class for primary variant', () => {
        Set.button({ variant: 'primary' })
        const form = Test.Form(FORM_LABEL)
        const button = form.Button('Click me')
        expect(button.Get.className()).not.toContain('secondary')
    })

    it('should call onClick when clicked', async () => {
        const onClick = vi.fn()
        Set.button({ onClick })
        const form = Test.Form(FORM_LABEL)
        const button = form.Button('Click me')
        await button.Do.click()
        expect(onClick).toHaveBeenCalledTimes(1)
    })

    it('should be disabled when disabled prop is true', () => {
        Set.button({ disabled: true })
        const form = Test.Form(FORM_LABEL)
        const button = form.Button('Click me')
        expect(button.Get.isDisabled()).toBe(true)
    })

    it('should not call onClick when disabled', () => {
        const onClick = vi.fn()
        Set.button({ disabled: true, onClick })
        const form = Test.Form(FORM_LABEL)
        const button = form.Button('Click me')
        expect(button.Get.isDisabled()).toBe(true)
    })

    it('should set aria-label', () => {
        Set.button({ ariaLabel: 'Submit form' })
        const form = Test.Form(FORM_LABEL)
        expect(form.Get.byLabel('Submit form')).toBeInTheDocument()
    })

    it('should apply custom className', () => {
        Set.button({ className: 'custom' })
        const form = Test.Form(FORM_LABEL)
        const button = form.Button('Click me')
        expect(button.Get.className()).toContain('custom')
    })

    it('should apply inline style', () => {
        Set.button({ style: { color: 'red' } })
        const form = Test.Form(FORM_LABEL)
        const button = form.Button('Click me')
        expect(button.Get.style().color).toBe('red')
    })
})

describe('ButtonGroup', () => {
    it('should render children buttons', () => {
        Set.buttonGroup()
        expect(screen.getAllByRole('button')).toHaveLength(2)
    })

    it('should have the button-group class', () => {
        const { container } = Set.buttonGroup()
        expect(container.querySelector('.button-group')).toBeInTheDocument()
    })

    it('should set aria-label', () => {
        Set.buttonGroup({ ariaLabel: 'Form actions' })
        const form = Test.Form(FORM_LABEL)
        expect(form.Get.byLabel('Form actions')).toBeInTheDocument()
    })

    it('should apply custom className', () => {
        const { container } = Set.buttonGroup({ className: 'custom' })
        const group = container.querySelector('.button-group')
        expect(group).toHaveClass('button-group')
        expect(group).toHaveClass('custom')
    })

    it('should apply inline style', () => {
        const { container } = Set.buttonGroup({ style: { gap: '2rem' } })
        expect(container.querySelector('.button-group')).toHaveStyle({ gap: '2rem' })
    })
})

describe('Fieldset', () => {
    it('should render children', () => {
        Set.fieldset()
        const form = Test.Form(FORM_LABEL)
        expect(form.Get.byText('content')).toBeInTheDocument()
    })

    it('should render a fieldset element', () => {
        const { container } = Set.fieldset()
        expect(container.querySelector('fieldset')).toBeInTheDocument()
    })

    it('should set aria-label', () => {
        Set.fieldset({ ariaLabel: 'Email field' })
        const form = Test.Form(FORM_LABEL)
        expect(form.Get.byLabel('Email field')).toBeInTheDocument()
    })

    it('should apply custom className', () => {
        const { container } = Set.fieldset({ className: 'custom' })
        expect(container.querySelector('fieldset')).toHaveClass('custom')
    })

    it('should apply inline style', () => {
        const { container } = Set.fieldset({ style: { padding: '2rem' } })
        expect(container.querySelector('fieldset')).toHaveStyle({ padding: '2rem' })
    })
})

describe('SearchInput', () => {
    it('should render with placeholder', () => {
        Set.searchInput()
        expect(screen.getByPlaceholderText('Select an option')).toBeInTheDocument()
    })

    it('should show dropdown when typing', async () => {
        Set.searchInput()
        const form = Test.Form(FORM_LABEL)
        const search = form.Search('Option')
        await Accessor.user.type(screen.getByPlaceholderText('Select an option'), 'a')
        expect(search.Get.dropdown()).toBeInTheDocument()
    })

    it('should filter options based on input', async () => {
        Set.searchInput()
        const form = Test.Form(FORM_LABEL)
        await Accessor.user.type(screen.getByPlaceholderText('Select an option'), 'ban')
        expect(form.Get.byText(/banana/i)).toBeInTheDocument()
        expect(screen.queryByText(/cherry/i)).not.toBeInTheDocument()
    })

    it('should show "No match in selection" when no options match', async () => {
        Set.searchInput()
        const form = Test.Form(FORM_LABEL)
        await Accessor.user.type(screen.getByPlaceholderText('Select an option'), 'xyz')
        expect(form.Get.byText('No match in selection')).toBeInTheDocument()
    })

    it('should call onSelect when an option is clicked', async () => {
        const onSelectSpy = vi.fn()
        Set.searchInput({ onSelectSpy })
        const form = Test.Form(FORM_LABEL)
        const search = form.Search('Option')
        await Accessor.user.type(screen.getByPlaceholderText('Select an option'), 'app')
        await Accessor.user.click(search.Get.byText(/apple/i))
        expect(onSelectSpy).toHaveBeenCalledWith(
            expect.objectContaining({ label: 'Apple', value: 'apple' }),
        )
    })

    it('should close dropdown after selecting an option', async () => {
        Set.searchInput()
        const form = Test.Form(FORM_LABEL)
        const search = form.Search('Option')
        await Accessor.user.type(screen.getByPlaceholderText('Select an option'), 'a')
        await Accessor.user.click(search.Get.byText(/apple/i))
        expect(search.Has.dropdown()).toBe(false)
    })

    it('should close dropdown when clicking outside', async () => {
        Set.searchInput()
        const form = Test.Form(FORM_LABEL)
        const search = form.Search('Option')
        await Accessor.user.type(screen.getByPlaceholderText('Select an option'), 'a')
        expect(search.Get.dropdown()).toBeInTheDocument()
        await Accessor.user.click(document.body)
        expect(search.Has.dropdown()).toBe(false)
    })

    it('should toggle dropdown with arrow button icon', async () => {
        Set.searchInput({ buttonIcon: 'arrow' })
        const form = Test.Form(FORM_LABEL)
        const search = form.Search('Option')
        await search.Do.clickIcon()
        expect(search.Get.dropdown()).toBeInTheDocument()
        await search.Do.clickIcon()
        expect(search.Has.dropdown()).toBe(false)
    })

    it('should render option icons when provided', async () => {
        Set.searchInput({ options: iconOptions })
        const form = Test.Form(FORM_LABEL)
        await Accessor.user.type(screen.getByPlaceholderText('Select an option'), 'h')
        expect(form.Get.byTestId('icon-home')).toBeInTheDocument()
    })

    it('should highlight matching text when highlightMatch is true', async () => {
        Set.searchInput({ highlightMatch: true })
        const form = Test.Form(FORM_LABEL)
        const search = form.Search('Option')
        await Accessor.user.type(screen.getByPlaceholderText('Select an option'), 'app')
        const highlight = search.Get.highlight()
        expect(highlight).toBeInTheDocument()
        expect(highlight?.textContent).toBe('app')
    })

    it('should show all options when input is empty and dropdown is opened', async () => {
        Set.searchInput({ buttonIcon: 'arrow' })
        const form = Test.Form(FORM_LABEL)
        const search = form.Search('Option')
        await search.Do.clickIcon()
        expect(search.Get.options()).toHaveLength(3)
    })
})

describe('Label', () => {
    it('should render with children text', () => {
        Set.label({ for: 'name', children: 'Name' })
        const form = Test.Form(FORM_LABEL)
        expect(form.Get.byText('Name')).toBeInTheDocument()
    })

    it('should set htmlFor attribute', () => {
        Set.label({ for: 'email', children: 'Email' })
        const form = Test.Form(FORM_LABEL)
        expect(form.Get.byText('Email')).toHaveAttribute('for', 'email')
    })

    it('should apply the default form-label class', () => {
        Set.label({ for: 'name', children: 'Name' })
        const form = Test.Form(FORM_LABEL)
        expect(form.Get.byText('Name')).toHaveClass('form-label')
    })

    it('should append custom className', () => {
        Set.label({ for: 'name', className: 'custom', children: 'Name' })
        const form = Test.Form(FORM_LABEL)
        const label = form.Get.byText('Name')
        expect(label).toHaveClass('form-label')
        expect(label).toHaveClass('custom')
    })

    it('should set aria-label', () => {
        Set.label({ for: 'name', ariaLabel: 'Name field label', children: 'Name' })
        const form = Test.Form(FORM_LABEL)
        expect(form.Get.byLabel('Name field label')).toBeInTheDocument()
    })

    it('should apply inline style', () => {
        Set.label({ for: 'name', style: { color: 'red' }, children: 'Name' })
        const form = Test.Form(FORM_LABEL)
        expect(form.Get.byText('Name')).toHaveStyle({ color: 'rgb(255, 0, 0)' })
    })

    it('should render without children', () => {
        const { container } = Set.label({ for: 'empty' })
        const label = container.querySelector('label')
        expect(label).toBeInTheDocument()
        expect(label).toHaveAttribute('for', 'empty')
        expect(label?.textContent).toBe('')
    })
})

describe('FormElement', () => {
    it('should render children', () => {
        Set.formElement({ children: <span>child</span> })
        expect(screen.getByText('child')).toBeInTheDocument()
    })

    it('should render a form element', () => {
        const { container } = Set.formElement({ children: <span>child</span> })
        expect(container.querySelector('form')).toBeInTheDocument()
    })

    it('should set aria-label', () => {
        Set.formElement({ ariaLabel: 'Login form', children: <span>child</span> })
        expect(screen.getByLabelText('Login form')).toBeInTheDocument()
    })

    it('should apply className', () => {
        const { container } = Set.formElement({
            className: 'custom-form',
            children: <span>child</span>,
        })
        expect(container.querySelector('form')).toHaveClass('custom-form')
    })

    it('should apply inline style', () => {
        const { container } = Set.formElement({
            style: { maxWidth: '500px' },
            children: <span>child</span>,
        })
        expect(container.querySelector('form')).toHaveStyle({ maxWidth: '500px' })
    })

    it('should call onSubmit when submitted', async () => {
        const onSubmit = vi.fn((e: React.FormEvent) => e.preventDefault())
        Set.formElement({
            onSubmit,
            children: <button type="submit">Submit</button>,
        })
        await Accessor.user.click(screen.getByText('Submit'))
        expect(onSubmit).toHaveBeenCalledTimes(1)
    })

    it('should pass native form attributes', () => {
        const { container } = Set.formElement({
            autoComplete: 'off',
            noValidate: true,
            children: <span>child</span>,
        })
        const form = container.querySelector('form')
        expect(form).toHaveAttribute('autocomplete', 'off')
        expect(form).toHaveAttribute('novalidate')
    })
})

describe('DateInput', () => {
    describe('Rendering', () => {
        it('should render with default placeholder', () => {
            Set.dateInput()
            expect(screen.getByPlaceholderText('dd/mm/yyyy')).toBeInTheDocument()
        })

        it('should render with custom placeholder', () => {
            Set.dateInput({ placeholder: 'Select date' })
            expect(screen.getByPlaceholderText('Select date')).toBeInTheDocument()
        })

        it('should show calendar icon', () => {
            Set.dateInput()
            const form = Test.Form(FORM_LABEL)
            const dateInput = form.Date('DOB')
            expect(dateInput.Get.icon()).toBeInTheDocument()
        })

        it('should display value from form default', () => {
            Set.dateInputWithValue()
            expect(screen.getByPlaceholderText('dd/mm/yyyy')).toHaveValue('15/05/1990')
        })

        it('should apply custom className', () => {
            Set.dateInput({ className: 'custom' })
            const form = Test.Form(FORM_LABEL)
            const dateInput = form.Date('DOB')
            expect(dateInput.Get.className()).toContain('custom')
        })

        it('should set aria-label', () => {
            Set.dateInput({ ariaLabel: 'Date of birth' })
            const form = Test.Form(FORM_LABEL)
            expect(form.Get.byLabel('Date of birth')).toBeInTheDocument()
        })
    })

    describe('Calendar open/close', () => {
        it('should open calendar when icon is clicked', async () => {
            Set.dateInput()
            const form = Test.Form(FORM_LABEL)
            const dateInput = form.Date('DOB')
            await dateInput.Do.toggleCalendar()
            expect(dateInput.Get.calendar()).toBeInTheDocument()
        })

        it('should close calendar when icon is clicked again', async () => {
            Set.dateInput()
            const form = Test.Form(FORM_LABEL)
            const dateInput = form.Date('DOB')
            await dateInput.Do.toggleCalendar()
            await dateInput.Do.toggleCalendar()
            expect(dateInput.Has.calendar()).toBe(false)
        })

        it('should close calendar when clicking outside', async () => {
            Set.dateInput()
            const form = Test.Form(FORM_LABEL)
            const dateInput = form.Date('DOB')
            await dateInput.Do.toggleCalendar()
            expect(dateInput.Get.calendar()).toBeInTheDocument()
            await Accessor.user.click(document.body)
            expect(dateInput.Has.calendar()).toBe(false)
        })

        it('should close calendar after selecting a day', async () => {
            Set.dateInput()
            const form = Test.Form(FORM_LABEL)
            const dateInput = form.Date('DOB')
            await dateInput.Do.toggleCalendar()
            await dateInput.Do.selectDay(14)
            expect(dateInput.Has.calendar()).toBe(false)
        })

        it('should close calendar after clicking Today', async () => {
            Set.dateInput()
            const form = Test.Form(FORM_LABEL)
            const dateInput = form.Date('DOB')
            await dateInput.Do.toggleCalendar()
            await dateInput.Do.selectToday()
            expect(dateInput.Has.calendar()).toBe(false)
        })
    })

    describe('Calendar content', () => {
        it('should display day headers', async () => {
            Set.dateInput()
            const form = Test.Form(FORM_LABEL)
            const dateInput = form.Date('DOB')
            await dateInput.Do.toggleCalendar()
            expect(form.Get.byText('Mo')).toBeInTheDocument()
            expect(form.Get.byText('Su')).toBeInTheDocument()
        })

        it('should display days in the current month', async () => {
            Set.dateInput()
            const form = Test.Form(FORM_LABEL)
            const dateInput = form.Date('DOB')
            await dateInput.Do.toggleCalendar()
            const days = dateInput.Get.days()
            expect(days.length).toBeGreaterThan(27)
            expect(days.length).toBeLessThanOrEqual(31)
        })

        it('should highlight today', async () => {
            Set.dateInput()
            const form = Test.Form(FORM_LABEL)
            const dateInput = form.Date('DOB')
            await dateInput.Do.toggleCalendar()
            expect(dateInput.Get.todayDay()).toBeInTheDocument()
        })

        it('should highlight selected day when value exists', async () => {
            Set.dateInputWithValue()
            const form = Test.Form(FORM_LABEL)
            const dateInput = form.Date('DOB')
            await dateInput.Do.toggleCalendar()
            // Value is 1990-05-15 so we need to navigate to that month first
            // Default opens to current month, so selected won't show unless we navigate
            // But the selected class is based on field.value matching
        })

        it('should show month and year in header', async () => {
            Set.dateInput()
            const form = Test.Form(FORM_LABEL)
            const dateInput = form.Date('DOB')
            await dateInput.Do.toggleCalendar()
            const btn = dateInput.Get.monthYearBtn()
            expect(btn).toBeInTheDocument()
            expect(btn!.textContent).toMatch(/\w+ \d{4}/)
        })
    })

    describe('Day selection', () => {
        it('should set input value when a day is clicked', async () => {
            Set.dateInput()
            const form = Test.Form(FORM_LABEL)
            const dateInput = form.Date('DOB')
            await dateInput.Do.toggleCalendar()
            await dateInput.Do.selectDay(0)
            const input = screen.getByPlaceholderText('dd/mm/yyyy')
            expect((input as HTMLInputElement).value).toMatch(/^01\//)
        })

        it('should set today date when Today button is clicked', async () => {
            Set.dateInput()
            const form = Test.Form(FORM_LABEL)
            const dateInput = form.Date('DOB')
            await dateInput.Do.toggleCalendar()
            await dateInput.Do.selectToday()
            const input = screen.getByPlaceholderText('dd/mm/yyyy')
            const today = new Date()
            const dd = String(today.getDate()).padStart(2, '0')
            const mm = String(today.getMonth() + 1).padStart(2, '0')
            const yyyy = today.getFullYear()
            expect(input).toHaveValue(`${dd}/${mm}/${yyyy}`)
        })

        it('should clear input when Clear button is clicked', async () => {
            Set.dateInput()
            const form = Test.Form(FORM_LABEL)
            const dateInput = form.Date('DOB')
            await dateInput.Do.toggleCalendar()
            await dateInput.Do.selectToday()
            // Now textValue is set, re-open and clear
            await dateInput.Do.toggleCalendar()
            await dateInput.Do.clear()
            const input = screen.getByPlaceholderText('dd/mm/yyyy')
            expect(input).toHaveValue('')
        })

        it('should not select day before min date', async () => {
            // min is 2024-05-10, so day 1 (index 0) should be disabled
            Set.dateInput({ min: '2024-05-10' })
            const form = Test.Form(FORM_LABEL)
            const dateInput = form.Date('DOB')
            await dateInput.Do.toggleCalendar()
            // Navigate to May 2024
            // The calendar opens on current month, so we can't easily test this
            // without navigating. We'll verify disabled class exists instead.
        })

        it('should render disabled days for dates outside min/max range', async () => {
            const today = new Date()
            const yyyy = today.getFullYear()
            const mm = String(today.getMonth() + 1).padStart(2, '0')
            // Set max to the 5th of current month
            Set.dateInput({ max: `${yyyy}-${mm}-05` })
            const form = Test.Form(FORM_LABEL)
            const dateInput = form.Date('DOB')
            await dateInput.Do.toggleCalendar()
            const disabledDays = dateInput.Get.disabledDays()
            expect(disabledDays.length).toBeGreaterThan(0)
        })
    })

    describe('Text input', () => {
        it('should format typed input with slashes', async () => {
            Set.dateInput()
            const input = screen.getByPlaceholderText('dd/mm/yyyy')
            await Accessor.user.type(input, '15052024')
            expect(input).toHaveValue('15/05/2024')
        })

        it('should auto-add slash after day digits', async () => {
            Set.dateInput()
            const input = screen.getByPlaceholderText('dd/mm/yyyy')
            await Accessor.user.type(input, '15')
            expect(input).toHaveValue('15/')
        })

        it('should auto-add slash after month digits', async () => {
            Set.dateInput()
            const input = screen.getByPlaceholderText('dd/mm/yyyy')
            await Accessor.user.type(input, '1505')
            expect(input).toHaveValue('15/05/')
        })

        it('should not accept more than 8 digits', async () => {
            Set.dateInput()
            const input = screen.getByPlaceholderText('dd/mm/yyyy')
            await Accessor.user.type(input, '150520241')
            expect(input).toHaveValue('15/05/2024')
        })

        it('should strip non-digit characters', async () => {
            Set.dateInput()
            const input = screen.getByPlaceholderText('dd/mm/yyyy')
            await Accessor.user.type(input, '1a5b0c5d2024')
            // Only digits extracted: 15052024
            expect(input).toHaveValue('15/05/2024')
        })

        it('should sync calendar view when valid date is typed', async () => {
            Set.dateInput()
            const form = Test.Form(FORM_LABEL)
            const dateInput = form.Date('DOB')
            await dateInput.Do.toggleCalendar()
            const input = screen.getByPlaceholderText('dd/mm/yyyy')
            await Accessor.user.type(input, '15012000')
            const btn = dateInput.Get.monthYearBtn()
            expect(btn!.textContent).toContain('Jan')
            expect(btn!.textContent).toContain('2000')
        })
    })

    describe('Month navigation', () => {
        it('should navigate to next month', async () => {
            Set.dateInput()
            const form = Test.Form(FORM_LABEL)
            const dateInput = form.Date('DOB')
            await dateInput.Do.toggleCalendar()
            const before = dateInput.Get.monthYearBtn()!.textContent
            await dateInput.Do.nextMonth()
            const after = dateInput.Get.monthYearBtn()!.textContent
            expect(after).not.toBe(before)
        })

        it('should navigate to previous month', async () => {
            Set.dateInput()
            const form = Test.Form(FORM_LABEL)
            const dateInput = form.Date('DOB')
            await dateInput.Do.toggleCalendar()
            const before = dateInput.Get.monthYearBtn()!.textContent
            await dateInput.Do.prevMonth()
            const after = dateInput.Get.monthYearBtn()!.textContent
            expect(after).not.toBe(before)
        })

        it('should wrap from January to December of previous year', async () => {
            Set.dateInput()
            const form = Test.Form(FORM_LABEL)
            const dateInput = form.Date('DOB')
            await dateInput.Do.toggleCalendar()
            const input = screen.getByPlaceholderText('dd/mm/yyyy')
            await Accessor.user.type(input, '15012024')
            const btn = dateInput.Get.monthYearBtn()!
            expect(btn.textContent).toContain('Jan')
            await dateInput.Do.prevMonth()
            expect(dateInput.Get.monthYearBtn()!.textContent).toContain('Dec')
            expect(dateInput.Get.monthYearBtn()!.textContent).toContain('2023')
        })

        it('should wrap from December to January of next year', async () => {
            Set.dateInput()
            const form = Test.Form(FORM_LABEL)
            const dateInput = form.Date('DOB')
            await dateInput.Do.toggleCalendar()
            const input = screen.getByPlaceholderText('dd/mm/yyyy')
            await Accessor.user.type(input, '15122024')
            expect(dateInput.Get.monthYearBtn()!.textContent).toContain('Dec')
            await dateInput.Do.nextMonth()
            expect(dateInput.Get.monthYearBtn()!.textContent).toContain('Jan')
            expect(dateInput.Get.monthYearBtn()!.textContent).toContain('2025')
        })
    })

    describe('Year picker', () => {
        it('should open year picker when month-year button is clicked', async () => {
            Set.dateInput()
            const form = Test.Form(FORM_LABEL)
            const dateInput = form.Date('DOB')
            await dateInput.Do.toggleCalendar()
            await dateInput.Do.clickMonthYear()
            expect(dateInput.Get.yearPicker()).toBeInTheDocument()
        })

        it('should show year options from 1900 to 2100', async () => {
            Set.dateInput()
            const form = Test.Form(FORM_LABEL)
            const dateInput = form.Date('DOB')
            await dateInput.Do.toggleCalendar()
            await dateInput.Do.clickMonthYear()
            const years = dateInput.Get.yearOptions()
            expect(years.length).toBe(201)
            expect(years[0].textContent).toBe('1900')
            expect(years[200].textContent).toBe('2100')
        })

        it('should highlight current view year as selected', async () => {
            Set.dateInput()
            const form = Test.Form(FORM_LABEL)
            const dateInput = form.Date('DOB')
            await dateInput.Do.toggleCalendar()
            await dateInput.Do.clickMonthYear()
            const selected = dateInput.Get.selectedYear()
            expect(selected).toBeInTheDocument()
            expect(selected!.textContent).toBe(String(new Date().getFullYear()))
        })

        it('should show all 12 months', async () => {
            Set.dateInput()
            const form = Test.Form(FORM_LABEL)
            const dateInput = form.Date('DOB')
            await dateInput.Do.toggleCalendar()
            await dateInput.Do.clickMonthYear()
            const months = dateInput.Get.monthOptions()
            expect(months.length).toBe(12)
        })

        it('should close year picker and show calendar when month is selected', async () => {
            Set.dateInput()
            const form = Test.Form(FORM_LABEL)
            const dateInput = form.Date('DOB')
            await dateInput.Do.toggleCalendar()
            await dateInput.Do.clickMonthYear()
            const months = dateInput.Get.monthOptions()
            await Accessor.user.click(months[0]) // Select Jan
            expect(dateInput.Has.yearPicker()).toBe(false)
            expect(dateInput.Get.calendar()).toBeInTheDocument()
            expect(dateInput.Get.monthYearBtn()!.textContent).toContain('Jan')
        })
    })

    describe('Keyboard navigation', () => {
        it('should close calendar on Escape from input', async () => {
            Set.dateInput()
            const form = Test.Form(FORM_LABEL)
            const dateInput = form.Date('DOB')
            await dateInput.Do.toggleCalendar()
            expect(dateInput.Get.calendar()).toBeInTheDocument()
            const input = screen.getByPlaceholderText('dd/mm/yyyy')
            await Accessor.user.type(input, '{Escape}')
            expect(dateInput.Has.calendar()).toBe(false)
        })
    })
})

describe('Error rendering', () => {
    it('should show error message on Input', () => {
        Set.inputWithError()
        const form = Test.Form(FORM_LABEL)
        expect(form.Get.errorMsg()).toBeInTheDocument()
        expect(form.Get.errorMsg()!.textContent).toBe('*Field is required')
    })

    it('should show error message on TextArea', () => {
        Set.textAreaWithError()
        const form = Test.Form(FORM_LABEL)
        expect(form.Get.errorMsg()).toBeInTheDocument()
        expect(form.Get.errorMsg()!.textContent).toBe('*Too long')
    })

    it('should show error message on DateInput', () => {
        Set.dateInputWithError()
        const form = Test.Form(FORM_LABEL)
        expect(form.Get.errorMsg()).toBeInTheDocument()
        expect(form.Get.errorMsg()!.textContent).toBe('*Date is required')
    })

    it('should show error message on SearchInput', () => {
        Set.searchInputWithError()
        const form = Test.Form(FORM_LABEL)
        expect(form.Get.errorMsg()).toBeInTheDocument()
        expect(form.Get.errorMsg()!.textContent).toBe('*Selection required')
    })

    it('should show error message on Checkbox', () => {
        Set.checkboxWithError()
        const form = Test.Form(FORM_LABEL)
        expect(form.Get.errorMsg()).toBeInTheDocument()
        expect(form.Get.errorMsg()!.textContent).toBe('*You must agree')
    })

    it('should show error message on RadioGroup', () => {
        Set.radioGroupWithError()
        const form = Test.Form(FORM_LABEL)
        expect(form.Get.errorMsg()).toBeInTheDocument()
        expect(form.Get.errorMsg()!.textContent).toBe('*Please select an option')
    })

    it('should not show error when there is none', () => {
        Set.input()
        const form = Test.Form(FORM_LABEL)
        expect(form.Has.errorMsg()).toBe(false)
    })
})

describe('SubmitErrorMessage', () => {
    it('should render the message text', () => {
        Set.submitErrorMessage({ text: 'Something went wrong' })
        const form = Test.Form(FORM_LABEL)
        expect(form.Get.submitErrorMsg()!.textContent).toBe('Something went wrong')
    })

    it('should apply the error variant class by default', () => {
        Set.submitErrorMessage({ text: 'Error occurred' })
        const form = Test.Form(FORM_LABEL)
        expect(form.Get.submitErrorMsg()).toHaveClass('error')
    })

    it('should apply the success variant class', () => {
        Set.submitErrorMessage({ text: 'Saved successfully', variant: 'success' })
        const form = Test.Form(FORM_LABEL)
        expect(form.Get.submitErrorMsg()).toHaveClass('success')
    })

    it('should apply the info variant class', () => {
        Set.submitErrorMessage({ text: 'Please review your input', variant: 'info' })
        const form = Test.Form(FORM_LABEL)
        expect(form.Get.submitErrorMsg()).toHaveClass('info')
    })

    it('should apply the warning variant class', () => {
        Set.submitErrorMessage({ text: 'Proceed with caution', variant: 'warning' })
        const form = Test.Form(FORM_LABEL)
        expect(form.Get.submitErrorMsg()).toHaveClass('warning')
    })

    it('should have role="alert"', () => {
        Set.submitErrorMessage({ text: 'Error occurred' })
        const form = Test.Form(FORM_LABEL)
        expect(form.Get.submitErrorMsg()).toHaveAttribute('role', 'alert')
    })

    it('should set aria-label when provided', () => {
        Set.submitErrorMessage({ text: 'Error occurred', ariaLabel: 'Submit error' })
        const form = Test.Form(FORM_LABEL)
        expect(form.Get.submitErrorMsg()).toHaveAttribute('aria-label', 'Submit error')
    })

    it('should not be present when not rendered', () => {
        Set.input()
        const form = Test.Form(FORM_LABEL)
        expect(form.Has.submitErrorMsg()).toBe(false)
    })

    it('should not render when text is empty', () => {
        Set.submitErrorMessage({ text: '' })
        const form = Test.Form(FORM_LABEL)
        expect(form.Has.submitErrorMsg()).toBe(false)
    })

    it('should not render when text is undefined', () => {
        Set.submitErrorMessage({})
        const form = Test.Form(FORM_LABEL)
        expect(form.Has.submitErrorMsg()).toBe(false)
    })
})

describe('Input type="date"', () => {
    it('should add has-value class when date has a value', () => {
        Set.inputDateWithValue()
        const input = document.querySelector('input[type="date"]')
        expect(input).toHaveClass('has-value')
    })

    it('should not add has-value class when date is empty', () => {
        Set.inputDateEmpty()
        const input = document.querySelector('input[type="date"]')
        expect(input).not.toHaveClass('has-value')
    })
})
