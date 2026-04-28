import React from 'react'
import { Test } from '../../Test'
import { Set } from './Form.spec.utils'
import { iconOptions } from './Form.spec.mocks'

const { Form } = Test

describe('Input', () => {
    it('should render a text input', () => {
        Set.input({ placeholder: 'Enter text' })
        expect(Form.Get.byPlaceholder('Enter text')).toBeInTheDocument()
    })

    it('should accept user input', async () => {
        Set.input({ placeholder: 'Enter text' })
        const input = await Form.Act.type('Enter text', 'hello')
        expect(input).toHaveValue('hello')
    })

    it('should render with the correct type', () => {
        Set.input({ type: 'email', placeholder: 'Enter email' })
        expect(Form.Get.byPlaceholder('Enter email')).toHaveAttribute('type', 'email')
    })

    it('should render reveal password icon when addRevealPasswordIcon is true', () => {
        Set.password()
        expect(Form.Get.byPlaceholder('Enter password')).toHaveAttribute('type', 'password')
        expect(Form.Get.actionIcon()).toBeInTheDocument()
    })

    it('should toggle password visibility when reveal icon is clicked', () => {
        const setReveal = jest.fn()
        Set.password({ revealPassword: false, setRevealPassword: setReveal })
        const icon = Form.Get.actionIcon()!
        icon.dispatchEvent(new MouseEvent('click', { bubbles: true }))
        expect(setReveal).toHaveBeenCalledWith(true)
    })

    it('should show text type when revealPassword is true', () => {
        Set.password({ revealPassword: true })
        expect(Form.Get.byPlaceholder('Enter password')).toHaveAttribute('type', 'text')
    })
})

describe('TextArea', () => {
    it('should render a textarea', () => {
        Set.textArea({ placeholder: 'Enter description' })
        expect(Form.Get.byPlaceholder('Enter description')).toBeInTheDocument()
    })

    it('should accept user input', async () => {
        Set.textArea({ placeholder: 'Enter description' })
        const textarea = await Form.Act.type('Enter description', 'test content')
        expect(textarea).toHaveValue('test content')
    })

    it('should show character count when maxLength is set', async () => {
        Set.textArea({ placeholder: 'Enter description', maxLength: 255 })
        await Form.Act.type('Enter description', 'hello')
        expect(Form.Get.text('5')).toBeInTheDocument()
        expect(Form.Get.text(/of 255 characters/)).toBeInTheDocument()
    })

    it('should not show character count when maxLength is not set', () => {
        Set.textArea({ placeholder: 'Enter description' })
        expect(Form.Query.text(/characters/)).not.toBeInTheDocument()
    })

    it('should render with custom rows', () => {
        Set.textArea({ placeholder: 'Enter description', rows: 5 })
        expect(Form.Get.byPlaceholder('Enter description')).toHaveAttribute('rows', '5')
    })

    it('should default to 3 rows', () => {
        Set.textArea({ placeholder: 'Enter description' })
        expect(Form.Get.byPlaceholder('Enter description')).toHaveAttribute('rows', '3')
    })
})

describe('RadioButton', () => {
    it('should render two radio buttons', () => {
        Set.radioButton()
        expect(Form.Get.radios()).toHaveLength(2)
    })

    it('should have the first option checked by default', () => {
        Set.radioButton()
        const radios = Form.Get.radios()
        expect(radios[0]).toBeChecked()
        expect(radios[1]).not.toBeChecked()
    })

    it('should call onChange when selected', async () => {
        const onChange = jest.fn()
        Set.radioButton({ onChange })
        await Form.Click.radio(1)
        expect(onChange).toHaveBeenCalled()
    })

    it('should update checked state when clicked', async () => {
        Set.radioButton()
        const radios = Form.Get.radios()
        await Form.Click.radio(1)
        expect(radios[1]).toBeChecked()
    })
})

describe('SearchInput', () => {
    it('should render with placeholder', () => {
        Set.searchInput()
        expect(Form.Get.byPlaceholder('Select an option')).toBeInTheDocument()
    })

    it('should show dropdown when typing', async () => {
        Set.searchInput()
        await Form.Act.type('Select an option', 'a')
        expect(Form.Get.dropdown()).toBeInTheDocument()
    })

    it('should filter options based on input', async () => {
        Set.searchInput()
        await Form.Act.type('Select an option', 'ban')
        expect(Form.Get.text(/banana/i)).toBeInTheDocument()
        expect(Form.Query.text(/cherry/i)).not.toBeInTheDocument()
    })

    it('should show "No match in selection" when no options match', async () => {
        Set.searchInput()
        await Form.Act.type('Select an option', 'xyz')
        expect(Form.Get.text('No match in selection')).toBeInTheDocument()
    })

    it('should call onSelect when an option is clicked', async () => {
        const onSelectSpy = jest.fn()
        Set.searchInput({ onSelectSpy })
        await Form.Act.selectOption('Select an option', 'app', /apple/i)
        expect(onSelectSpy).toHaveBeenCalledWith(
            expect.objectContaining({ label: 'Apple', value: 'apple' }),
        )
    })

    it('should close dropdown after selecting an option', async () => {
        Set.searchInput()
        await Form.Act.selectOption('Select an option', 'a', /apple/i)
        expect(Form.Query.dropdown()).not.toBeInTheDocument()
    })

    it('should close dropdown when clicking outside', async () => {
        Set.searchInput()
        await Form.Act.type('Select an option', 'a')
        expect(Form.Get.dropdown()).toBeInTheDocument()
        await Form.Act.clickOutside()
        expect(Form.Query.dropdown()).not.toBeInTheDocument()
    })

    it('should toggle dropdown with arrow button icon', async () => {
        Set.searchInput({ buttonIcon: 'arrow' })
        await Form.Click.actionIcon()
        expect(Form.Get.dropdown()).toBeInTheDocument()
        await Form.Click.actionIcon()
        expect(Form.Query.dropdown()).not.toBeInTheDocument()
    })

    it('should render option icons when provided', async () => {
        Set.searchInput({ options: iconOptions })
        await Form.Act.type('Select an option', 'h')
        expect(Form.Get.byTestId('icon-home')).toBeInTheDocument()
    })

    it('should highlight matching text when highlightMatch is true', async () => {
        Set.searchInput({ highlightMatch: true })
        await Form.Act.type('Select an option', 'app')
        const highlight = Form.Get.highlight()
        expect(highlight).toBeInTheDocument()
        expect(highlight?.textContent).toBe('app')
    })

    it('should show all options when input is empty and dropdown is opened', async () => {
        Set.searchInput({ buttonIcon: 'arrow' })
        await Form.Click.actionIcon()
        expect(Form.Get.options()).toHaveLength(3)
    })
})

describe('Label', () => {
    it('should render with children text', () => {
        Set.label({ for: 'name', children: 'Name' })
        expect(Form.Get.text('Name')).toBeInTheDocument()
    })

    it('should set htmlFor attribute', () => {
        Set.label({ for: 'email', children: 'Email' })
        expect(Form.Get.text('Email')).toHaveAttribute('for', 'email')
    })

    it('should apply the default form-label class', () => {
        Set.label({ for: 'name', children: 'Name' })
        expect(Form.Get.text('Name')).toHaveClass('form-label')
    })

    it('should append custom className', () => {
        Set.label({ for: 'name', className: 'custom', children: 'Name' })
        const label = Form.Get.text('Name')
        expect(label).toHaveClass('form-label')
        expect(label).toHaveClass('custom')
    })

    it('should set aria-label', () => {
        Set.label({ for: 'name', ariaLabel: 'Name field label', children: 'Name' })
        expect(Form.Get.byLabel('Name field label')).toBeInTheDocument()
    })

    it('should apply inline style', () => {
        Set.label({ for: 'name', style: { color: 'red' }, children: 'Name' })
        expect(Form.Get.text('Name')).toHaveStyle({ color: 'red' })
    })

    it('should render without children', () => {
        const { container } = Set.label({ for: 'empty' })
        const label = Form.Get.label(container)
        expect(label).toBeInTheDocument()
        expect(label).toHaveAttribute('for', 'empty')
        expect(label?.textContent).toBe('')
    })
})

describe('FormElement', () => {
    it('should render children', () => {
        Set.formElement({ children: <span>child</span> })
        expect(Form.Get.text('child')).toBeInTheDocument()
    })

    it('should render a form element', () => {
        const { container } = Set.formElement({ children: <span>child</span> })
        expect(Form.Get.form(container)).toBeInTheDocument()
    })

    it('should set aria-label', () => {
        Set.formElement({ ariaLabel: 'Login form', children: <span>child</span> })
        expect(Form.Get.byLabel('Login form')).toBeInTheDocument()
    })

    it('should apply className', () => {
        const { container } = Set.formElement({
            className: 'custom-form',
            children: <span>child</span>,
        })
        expect(Form.Get.form(container)).toHaveClass('custom-form')
    })

    it('should apply inline style', () => {
        const { container } = Set.formElement({
            style: { maxWidth: '500px' },
            children: <span>child</span>,
        })
        expect(Form.Get.form(container)).toHaveStyle({ maxWidth: '500px' })
    })

    it('should call onSubmit when submitted', async () => {
        const onSubmit = jest.fn((e: React.FormEvent) => e.preventDefault())
        Set.formElement({
            onSubmit,
            children: <button type="submit">Submit</button>,
        })
        await Form.Act.clickText('Submit')
        expect(onSubmit).toHaveBeenCalledTimes(1)
    })

    it('should pass native form attributes', () => {
        const { container } = Set.formElement({
            autoComplete: 'off',
            noValidate: true,
            children: <span>child</span>,
        })
        const form = Form.Get.form(container)
        expect(form).toHaveAttribute('autocomplete', 'off')
        expect(form).toHaveAttribute('novalidate')
    })
})
