import React from 'react'
import { render } from '@testing-library/react'
import { useForm } from 'react-hook-form'
import { Form as FormExports } from '..'
import type { SearchInputOption } from '..'
import type { FormValues } from './Form.spec.types'
import { testOptions } from './Form.spec.mocks'

const { Input, TextArea, RadioButton, SearchInput, Label } = FormExports
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
    searchInput: (
        props?: Partial<Parameters<typeof SearchInput<FormValues>>[0]> & {
            onSelectSpy?: jest.Mock
        },
    ) => render(<SearchInputWrapper {...props} />),
    label: (...args: Parameters<typeof Label>) => render(<Label {...args[0]} />),
    formElement: (
        props: Omit<Parameters<typeof FormElement>[0], 'children'> & {
            children: React.ReactNode
        },
    ) => render(<FormElement {...props} />),
}
