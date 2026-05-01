import React from 'react'
import { render } from '@testing-library/react'
import { useForm } from 'react-hook-form'
import { Form as FormExports } from '..'
import type { SearchInputOption } from '..'
import type { FormValues } from './Form.spec.types'
import { testOptions } from './Form.spec.mocks'

const {
    Input,
    TextArea,
    RadioButton,
    RadioGroup,
    SearchInput,
    Label,
    Checkbox,
    DateInput,
    Button,
    ButtonGroup,
    Fieldset,
} = FormExports
const FormElement = FormExports

// ═════════════════════════════════════════════════════════════════════════════
// Wrappers
// ═════════════════════════════════════════════════════════════════════════════

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

const CheckboxWrapper = ({
    onChange = jest.fn(),
    ...props
}: Partial<Parameters<typeof Checkbox<FormValues>>[0]> & {
    onChange?: (checked: boolean) => void
}) => {
    const { control } = useForm<FormValues>({ defaultValues: { accepted: false } })
    return (
        <Checkbox
            name="accepted"
            control={control}
            label="Accept terms"
            onChange={onChange}
            {...props}
        />
    )
}

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

const DateInputWrapper = (props: Partial<Parameters<typeof DateInput<FormValues>>[0]>) => {
    const { control } = useForm<FormValues>({ defaultValues: { dob: '' } })
    return <DateInput name="dob" control={control} {...props} />
}

const DateInputWithValueWrapper = (props: Partial<Parameters<typeof DateInput<FormValues>>[0]>) => {
    const { control } = useForm<FormValues>({ defaultValues: { dob: '1990-05-15' } })
    return <DateInput name="dob" control={control} {...props} />
}

const InputWithErrorWrapper = (props: Partial<Parameters<typeof Input<FormValues>>[0]>) => {
    const { control, setError } = useForm<FormValues>({ defaultValues: { text: '' } })
    React.useEffect(() => {
        setError('text', { message: 'Field is required' })
    }, [setError])
    return <Input name="text" control={control} type="text" placeholder="Enter text" {...props} />
}

const InputDateWithValueWrapper = () => {
    const { control } = useForm<FormValues>({ defaultValues: { dob: '1990-05-15' } })
    return <Input name="dob" control={control} type="date" />
}

const InputDateEmptyWrapper = () => {
    const { control } = useForm<FormValues>({ defaultValues: { dob: '' } })
    return <Input name="dob" control={control} type="date" />
}

const TextAreaWithErrorWrapper = (props: Partial<Parameters<typeof TextArea<FormValues>>[0]>) => {
    const { control, setError } = useForm<FormValues>({ defaultValues: { description: '' } })
    React.useEffect(() => {
        setError('description', { message: 'Too long' })
    }, [setError])
    return (
        <TextArea name="description" control={control} placeholder="Enter description" {...props} />
    )
}

const DateInputWithErrorWrapper = (props: Partial<Parameters<typeof DateInput<FormValues>>[0]>) => {
    const { control, setError } = useForm<FormValues>({ defaultValues: { dob: '' } })
    React.useEffect(() => {
        setError('dob', { message: 'Date is required' })
    }, [setError])
    return <DateInput name="dob" control={control} {...props} />
}

const SearchInputWithErrorWrapper = (
    props: Partial<Parameters<typeof SearchInput<FormValues>>[0]> & { onSelectSpy?: jest.Mock },
) => {
    const { control, setError } = useForm<FormValues>({ defaultValues: { option: '' } })
    React.useEffect(() => {
        setError('option', { message: 'Selection required' })
    }, [setError])
    return (
        <SearchInput
            name="option"
            control={control}
            options={testOptions}
            onSelect={props.onSelectSpy ?? jest.fn()}
            placeholder="Select an option"
            {...props}
        />
    )
}

const CheckboxWithErrorWrapper = () => {
    const { control, setError } = useForm<FormValues>({ defaultValues: { accepted: false } })
    React.useEffect(() => {
        setError('accepted', { message: 'You must agree' })
    }, [setError])
    return <Checkbox name="accepted" control={control} label="Accept terms" />
}

const RadioGroupWithErrorWrapper = () => {
    const { control } = useForm<FormValues>({ defaultValues: { toggle: false } })
    return (
        <RadioGroup label="Toggle" htmlFor="toggle" error="Please select an option">
            <RadioButton name="toggle" control={control} value={false} onChange={() => undefined} />
            <RadioButton name="toggle" control={control} value={true} onChange={() => undefined} />
        </RadioGroup>
    )
}

// ═════════════════════════════════════════════════════════════════════════════
// Set
// ═════════════════════════════════════════════════════════════════════════════

export const Set = {
    input: (props?: Partial<Parameters<typeof Input<FormValues>>[0]>) =>
        render(<InputWrapper {...props} />),
    password: (props?: {
        revealPassword?: boolean
        setRevealPassword?: (reveal: boolean) => void
    }) => render(<PasswordWrapper {...props} />),
    textArea: (props?: Partial<Parameters<typeof TextArea<FormValues>>[0]>) =>
        render(<TextAreaWrapper {...props} />),
    radioButton: (props?: { onChange?: () => void }) => render(<RadioButtonWrapper {...props} />),
    checkbox: (
        props?: Partial<Parameters<typeof Checkbox<FormValues>>[0]> & {
            onChange?: (checked: boolean) => void
        },
    ) => render(<CheckboxWrapper {...props} />),
    searchInput: (
        props?: Partial<Parameters<typeof SearchInput<FormValues>>[0]> & {
            onSelectSpy?: jest.Mock
        },
    ) => render(<SearchInputWrapper {...props} />),
    dateInput: (props?: Partial<Parameters<typeof DateInput<FormValues>>[0]>) =>
        render(<DateInputWrapper {...props} />),
    dateInputWithValue: (props?: Partial<Parameters<typeof DateInput<FormValues>>[0]>) =>
        render(<DateInputWithValueWrapper {...props} />),
    label: (...args: Parameters<typeof Label>) => render(<Label {...args[0]} />),
    button: (props?: Partial<Parameters<typeof Button>[0]>) =>
        render(<Button {...{ children: 'Click me', ...props }} />),
    buttonGroup: (props?: Partial<Parameters<typeof ButtonGroup>[0]>) =>
        render(
            <ButtonGroup
                {...{
                    children: (
                        <>
                            <button>A</button>
                            <button>B</button>
                        </>
                    ),
                    ...props,
                }}
            />,
        ),
    fieldset: (props?: Partial<Parameters<typeof Fieldset>[0]>) =>
        render(<Fieldset {...{ children: <span>content</span>, ...props }} />),
    formElement: (
        props: Omit<Parameters<typeof FormElement>[0], 'children'> & {
            children: React.ReactNode
        },
    ) => render(<FormElement {...props} />),

    // Error state helpers
    inputWithError: (props?: Partial<Parameters<typeof Input<FormValues>>[0]>) =>
        render(<InputWithErrorWrapper {...props} />),
    inputDateWithValue: () => render(<InputDateWithValueWrapper />),
    inputDateEmpty: () => render(<InputDateEmptyWrapper />),
    textAreaWithError: (props?: Partial<Parameters<typeof TextArea<FormValues>>[0]>) =>
        render(<TextAreaWithErrorWrapper {...props} />),
    dateInputWithError: (props?: Partial<Parameters<typeof DateInput<FormValues>>[0]>) =>
        render(<DateInputWithErrorWrapper {...props} />),
    searchInputWithError: (
        props?: Partial<Parameters<typeof SearchInput<FormValues>>[0]> & {
            onSelectSpy?: jest.Mock
        },
    ) => render(<SearchInputWithErrorWrapper {...props} />),
    checkboxWithError: () => render(<CheckboxWithErrorWrapper />),
    radioGroupWithError: () => render(<RadioGroupWithErrorWrapper />),
}
