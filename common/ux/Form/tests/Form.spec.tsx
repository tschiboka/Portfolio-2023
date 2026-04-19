import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useForm } from 'react-hook-form'
import { Input } from '../Input'
import { TextArea } from '../TextArea'
import { RadioButton } from '../RadioButton'
import { SearchInput, SearchInputOption } from '../SearchInput'
import { Label } from '../Label'
import { FormElement } from '../Form'

type FormValues = {
    text: string
    email: string
    password: string
    description: string
    option: string
    toggle: boolean
}

const InputWrapper = (props: Partial<Parameters<typeof Input<FormValues>>[0]>) => {
    const { control } = useForm<FormValues>({ defaultValues: { text: '' } })
    return <Input name="text" control={control} type="text" {...props} />
}

const PasswordWrapper = ({
    revealPassword = false,
    setRevealPassword = jest.fn(),
}: {
    revealPassword?: boolean
    setRevealPassword?: (reveal: boolean) => void
}) => {
    const { control } = useForm<FormValues>({ defaultValues: { password: '' } })
    return (
        <Input
            name="password"
            control={control}
            type="password"
            addRevealPasswordIcon
            revealPassword={revealPassword}
            setRevealPassword={setRevealPassword}
            placeholder="Enter password"
        />
    )
}

const TextAreaWrapper = (props: Partial<Parameters<typeof TextArea<FormValues>>[0]>) => {
    const { control } = useForm<FormValues>({ defaultValues: { description: '' } })
    return <TextArea name="description" control={control} {...props} />
}

const RadioButtonWrapper = ({ onChange = jest.fn() }: { onChange?: () => void }) => {
    const { control } = useForm<FormValues>({ defaultValues: { toggle: false } })
    return (
        <div>
            <RadioButton name="toggle" control={control} value={false} onChange={onChange} />
            <RadioButton name="toggle" control={control} value={true} onChange={onChange} />
        </div>
    )
}

const testOptions: SearchInputOption[] = [
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
    { label: 'Cherry', value: 'cherry' },
]

const iconOptions: SearchInputOption[] = [
    { label: 'Home', value: 'home', icon: <span data-testid="icon-home">H</span> },
    {
        label: 'Settings',
        value: 'settings',
        icon: <span data-testid="icon-settings">S</span>,
        iconColor: 'red',
    },
]

const SearchInputWrapper = ({
    onSelectSpy,
    ...props
}: Partial<Parameters<typeof SearchInput<FormValues>>[0]> & {
    onSelectSpy?: jest.Mock
}) => {
    const { control, setValue } = useForm<FormValues>({ defaultValues: { option: '' } })
    const onSelect = onSelectSpy ?? jest.fn()
    return (
        <SearchInput
            name="option"
            control={control}
            options={testOptions}
            onSelect={(opt: SearchInputOption) => {
                setValue('option', opt.label)
                onSelect(opt)
            }}
            placeholder="Select an option"
            {...props}
        />
    )
}

describe('Input', () => {
    it('should render a text input', () => {
        render(<InputWrapper placeholder="Enter text" />)
        expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument()
    })

    it('should accept user input', async () => {
        const user = userEvent.setup()
        render(<InputWrapper placeholder="Enter text" />)
        const input = screen.getByPlaceholderText('Enter text')
        await user.type(input, 'hello')
        expect(input).toHaveValue('hello')
    })

    it('should render with the correct type', () => {
        render(<InputWrapper type="email" placeholder="Enter email" />)
        expect(screen.getByPlaceholderText('Enter email')).toHaveAttribute('type', 'email')
    })

    it('should render reveal password icon when addRevealPasswordIcon is true', () => {
        render(<PasswordWrapper />)
        expect(screen.getByPlaceholderText('Enter password')).toHaveAttribute('type', 'password')
        expect(document.querySelector('.action-icon')).toBeInTheDocument()
    })

    it('should toggle password visibility when reveal icon is clicked', () => {
        const setReveal = jest.fn()
        render(<PasswordWrapper revealPassword={false} setRevealPassword={setReveal} />)
        const icon = document.querySelector('.action-icon')!
        icon.dispatchEvent(new MouseEvent('click', { bubbles: true }))
        expect(setReveal).toHaveBeenCalledWith(true)
    })

    it('should show text type when revealPassword is true', () => {
        render(<PasswordWrapper revealPassword={true} />)
        expect(screen.getByPlaceholderText('Enter password')).toHaveAttribute('type', 'text')
    })
})

describe('TextArea', () => {
    it('should render a textarea', () => {
        render(<TextAreaWrapper placeholder="Enter description" />)
        expect(screen.getByPlaceholderText('Enter description')).toBeInTheDocument()
    })

    it('should accept user input', async () => {
        const user = userEvent.setup()
        render(<TextAreaWrapper placeholder="Enter description" />)
        const textarea = screen.getByPlaceholderText('Enter description')
        await user.type(textarea, 'test content')
        expect(textarea).toHaveValue('test content')
    })

    it('should show character count when maxLength is set', async () => {
        const user = userEvent.setup()
        render(<TextAreaWrapper placeholder="Enter description" maxLength={255} />)
        const textarea = screen.getByPlaceholderText('Enter description')
        await user.type(textarea, 'hello')
        expect(screen.getByText('5')).toBeInTheDocument()
        expect(screen.getByText(/of 255 characters/)).toBeInTheDocument()
    })

    it('should not show character count when maxLength is not set', () => {
        render(<TextAreaWrapper placeholder="Enter description" />)
        expect(screen.queryByText(/characters/)).not.toBeInTheDocument()
    })

    it('should render with custom rows', () => {
        render(<TextAreaWrapper placeholder="Enter description" rows={5} />)
        expect(screen.getByPlaceholderText('Enter description')).toHaveAttribute('rows', '5')
    })

    it('should default to 3 rows', () => {
        render(<TextAreaWrapper placeholder="Enter description" />)
        expect(screen.getByPlaceholderText('Enter description')).toHaveAttribute('rows', '3')
    })
})

describe('RadioButton', () => {
    it('should render two radio buttons', () => {
        render(<RadioButtonWrapper />)
        const radios = screen.getAllByRole('radio')
        expect(radios).toHaveLength(2)
    })

    it('should have the first option checked by default', () => {
        render(<RadioButtonWrapper />)
        const radios = screen.getAllByRole('radio')
        expect(radios[0]).toBeChecked()
        expect(radios[1]).not.toBeChecked()
    })

    it('should call onChange when selected', async () => {
        const onChange = jest.fn()
        const user = userEvent.setup()
        render(<RadioButtonWrapper onChange={onChange} />)
        const radios = screen.getAllByRole('radio')
        await user.click(radios[1])
        expect(onChange).toHaveBeenCalled()
    })

    it('should update checked state when clicked', async () => {
        const user = userEvent.setup()
        render(<RadioButtonWrapper />)
        const radios = screen.getAllByRole('radio')
        await user.click(radios[1])
        expect(radios[1]).toBeChecked()
    })
})

describe('SearchInput', () => {
    it('should render with placeholder', () => {
        render(<SearchInputWrapper />)
        expect(screen.getByPlaceholderText('Select an option')).toBeInTheDocument()
    })

    it('should show dropdown when typing', async () => {
        const user = userEvent.setup()
        render(<SearchInputWrapper />)
        const input = screen.getByPlaceholderText('Select an option')
        await user.type(input, 'a')
        expect(document.querySelector('.option-dropdown')).toBeInTheDocument()
    })

    it('should filter options based on input', async () => {
        const user = userEvent.setup()
        render(<SearchInputWrapper />)
        const input = screen.getByPlaceholderText('Select an option')
        await user.type(input, 'ban')
        expect(screen.getByText(/banana/i)).toBeInTheDocument()
        expect(screen.queryByText(/cherry/i)).not.toBeInTheDocument()
    })

    it('should show "No match in selection" when no options match', async () => {
        const user = userEvent.setup()
        render(<SearchInputWrapper />)
        const input = screen.getByPlaceholderText('Select an option')
        await user.type(input, 'xyz')
        expect(screen.getByText('No match in selection')).toBeInTheDocument()
    })

    it('should call onSelect when an option is clicked', async () => {
        const onSelectSpy = jest.fn()
        const user = userEvent.setup()
        render(<SearchInputWrapper onSelectSpy={onSelectSpy} />)
        const input = screen.getByPlaceholderText('Select an option')
        await user.type(input, 'app')
        await user.click(screen.getByText(/apple/i))
        expect(onSelectSpy).toHaveBeenCalledWith(
            expect.objectContaining({ label: 'Apple', value: 'apple' }),
        )
    })

    it('should close dropdown after selecting an option', async () => {
        const user = userEvent.setup()
        render(<SearchInputWrapper />)
        const input = screen.getByPlaceholderText('Select an option')
        await user.type(input, 'a')
        await user.click(screen.getByText(/apple/i))
        expect(document.querySelector('.option-dropdown')).not.toBeInTheDocument()
    })

    it('should close dropdown when clicking outside', async () => {
        const user = userEvent.setup()
        render(
            <div>
                <SearchInputWrapper />
                <button>outside</button>
            </div>,
        )
        const input = screen.getByPlaceholderText('Select an option')
        await user.type(input, 'a')
        expect(document.querySelector('.option-dropdown')).toBeInTheDocument()
        await user.click(screen.getByText('outside'))
        expect(document.querySelector('.option-dropdown')).not.toBeInTheDocument()
    })

    it('should toggle dropdown with arrow button icon', async () => {
        const user = userEvent.setup()
        render(<SearchInputWrapper buttonIcon="arrow" />)
        const actionIcon = document.querySelector('.action-icon')!
        await user.click(actionIcon.firstElementChild!)
        expect(document.querySelector('.option-dropdown')).toBeInTheDocument()
        await user.click(actionIcon.firstElementChild!)
        expect(document.querySelector('.option-dropdown')).not.toBeInTheDocument()
    })

    it('should render option icons when provided', async () => {
        const user = userEvent.setup()
        render(<SearchInputWrapper options={iconOptions} />)
        const input = screen.getByPlaceholderText('Select an option')
        await user.type(input, 'h')
        expect(screen.getByTestId('icon-home')).toBeInTheDocument()
    })

    it('should highlight matching text when highlightMatch is true', async () => {
        const user = userEvent.setup()
        render(<SearchInputWrapper highlightMatch />)
        const input = screen.getByPlaceholderText('Select an option')
        await user.type(input, 'app')
        const highlight = document.querySelector('.option .highlight')
        expect(highlight).toBeInTheDocument()
        expect(highlight?.textContent).toBe('app')
    })

    it('should show all options when input is empty and dropdown is opened', async () => {
        const user = userEvent.setup()
        render(<SearchInputWrapper buttonIcon="arrow" />)
        const actionIcon = document.querySelector('.action-icon')!
        await user.click(actionIcon.firstElementChild!)
        const options = document.querySelectorAll('.option')
        expect(options).toHaveLength(3)
    })
})

describe('Label', () => {
    it('should render with children text', () => {
        render(<Label for="name">Name</Label>)
        expect(screen.getByText('Name')).toBeInTheDocument()
    })

    it('should set htmlFor attribute', () => {
        render(<Label for="email">Email</Label>)
        expect(screen.getByText('Email')).toHaveAttribute('for', 'email')
    })

    it('should apply the default form-label class', () => {
        render(<Label for="name">Name</Label>)
        expect(screen.getByText('Name')).toHaveClass('form-label')
    })

    it('should append custom className', () => {
        render(
            <Label for="name" className="custom">
                Name
            </Label>,
        )
        const label = screen.getByText('Name')
        expect(label).toHaveClass('form-label')
        expect(label).toHaveClass('custom')
    })

    it('should set aria-label', () => {
        render(
            <Label for="name" ariaLabel="Name field label">
                Name
            </Label>,
        )
        expect(screen.getByLabelText('Name field label')).toBeInTheDocument()
    })

    it('should apply inline style', () => {
        render(
            <Label for="name" style={{ color: 'red' }}>
                Name
            </Label>,
        )
        expect(screen.getByText('Name')).toHaveStyle({ color: 'red' })
    })

    it('should render without children', () => {
        const { container } = render(<Label for="empty" />)
        const label = container.querySelector('label')
        expect(label).toBeInTheDocument()
        expect(label).toHaveAttribute('for', 'empty')
        expect(label?.textContent).toBe('')
    })
})

describe('FormElement', () => {
    it('should render children', () => {
        render(
            <FormElement>
                <span>child</span>
            </FormElement>,
        )
        expect(screen.getByText('child')).toBeInTheDocument()
    })

    it('should render a form element', () => {
        const { container } = render(
            <FormElement>
                <span>child</span>
            </FormElement>,
        )
        expect(container.querySelector('form')).toBeInTheDocument()
    })

    it('should set aria-label', () => {
        render(
            <FormElement ariaLabel="Login form">
                <span>child</span>
            </FormElement>,
        )
        expect(screen.getByLabelText('Login form')).toBeInTheDocument()
    })

    it('should apply className', () => {
        const { container } = render(
            <FormElement className="custom-form">
                <span>child</span>
            </FormElement>,
        )
        expect(container.querySelector('form')).toHaveClass('custom-form')
    })

    it('should apply inline style', () => {
        const { container } = render(
            <FormElement style={{ maxWidth: '500px' }}>
                <span>child</span>
            </FormElement>,
        )
        expect(container.querySelector('form')).toHaveStyle({ maxWidth: '500px' })
    })

    it('should call onSubmit when submitted', async () => {
        const onSubmit = jest.fn((e: React.FormEvent) => e.preventDefault())
        const user = userEvent.setup()
        render(
            <FormElement onSubmit={onSubmit}>
                <button type="submit">Submit</button>
            </FormElement>,
        )
        await user.click(screen.getByText('Submit'))
        expect(onSubmit).toHaveBeenCalledTimes(1)
    })

    it('should pass native form attributes', () => {
        const { container } = render(
            <FormElement autoComplete="off" noValidate>
                <span>child</span>
            </FormElement>,
        )
        const form = container.querySelector('form')
        expect(form).toHaveAttribute('autocomplete', 'off')
        expect(form).toHaveAttribute('novalidate')
    })
})
