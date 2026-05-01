import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Code, Form } from '@common/ux'
import Page from '../../../../../sharedComponents/Page/Page'
import { Code as Snippets } from './Forms.code'

type FormsProps = { path: string }

type DemoForm = {
    name: string
    email: string
    password: string
    age: string
    dob: string
    dobNative: string
    bio: string
    description: string
    role: string
    hasParent: boolean
    terms: boolean
    framework: string
    language: string
}

const defaults: DemoForm = {
    name: '',
    email: '',
    password: '',
    age: '',
    dob: '',
    dobNative: '',
    bio: '',
    description: '',
    role: 'user',
    hasParent: false,
    terms: false,
    framework: '',
    language: '',
}

const frameworkOptions = [
    { label: 'React', value: 'react' },
    { label: 'Vue', value: 'vue' },
    { label: 'Angular', value: 'angular' },
    { label: 'Svelte', value: 'svelte' },
    { label: 'Solid', value: 'solid' },
]

const languageOptions = [
    { label: 'TypeScript', value: 'typescript' },
    { label: 'JavaScript', value: 'javascript' },
    { label: 'Python', value: 'python' },
    { label: 'Rust', value: 'rust' },
    { label: 'Go', value: 'go' },
]

export const Forms = ({ path }: FormsProps) => {
    const { control, setValue } = useForm<DemoForm>({ defaultValues: defaults })
    const [revealPassword, setRevealPassword] = useState(false)

    const {
        control: errorControl,
        setError,
        setValue: setErrorValue,
    } = useForm<DemoForm>({ defaultValues: defaults })

    const {
        control: errorFilledControl,
        setError: setErrorFilled,
        setValue: setErrorFilledValue,
    } = useForm<DemoForm>({
        defaultValues: {
            ...defaults,
            name: 'John Doe',
            email: 'john@example.com',
            password: 'short',
            dob: '2010-11-30',
            dobNative: '2010-11-30',
            bio: 'A short bio',
            role: 'admin',
            terms: true,
            framework: 'React',
            language: 'TypeScript',
        },
    })

    const { control: disabledControl } = useForm<DemoForm>({
        defaultValues: defaults,
    })

    const { control: disabledFilledControl } = useForm<DemoForm>({
        defaultValues: {
            ...defaults,
            name: 'John Doe',
            email: 'john@example.com',
            password: 'mypassword123',
            dob: '1990-05-15',
            dobNative: '1990-05-15',
            bio: 'A disabled text area',
            role: 'admin',
            terms: true,
            framework: 'React',
            language: 'TypeScript',
        },
    })

    const { control: filledControl, setValue: setFilledValue } = useForm<DemoForm>({
        defaultValues: {
            ...defaults,
            name: 'John Doe',
            email: 'john@example.com',
            password: 'mypassword123',
            dob: '1990-05-15',
            dobNative: '1990-05-15',
            bio: 'Full stack developer with 5 years of experience.',
            role: 'admin',
            terms: true,
            framework: 'React',
            language: 'TypeScript',
        },
    })

    useEffect(() => {
        setError('name', { message: 'Name is required' })
        setError('email', { message: 'Invalid email format' })
        setError('password', { message: 'Must be at least 8 characters' })
        setError('bio', { message: 'Bio must not exceed 200 characters' })
        setError('dob', { message: 'Date of birth is required' })
        setError('dobNative', { message: 'Date is required' })
        setError('role', { message: 'Please select a role' })
        setError('terms', { message: 'You must agree' })
        setError('framework', { message: 'Please select a framework' })
        setError('language', { message: 'Please select a language' })

        setErrorFilled('name', { message: 'Name already taken' })
        setErrorFilled('email', { message: 'Invalid email format' })
        setErrorFilled('password', { message: 'Too weak' })
        setErrorFilled('bio', { message: 'Contains forbidden words' })
        setErrorFilled('dob', { message: 'Must be over 18' })
        setErrorFilled('dobNative', { message: 'Must be over 18' })
        setErrorFilled('role', { message: 'Admin not allowed' })
        setErrorFilled('terms', { message: 'Cannot proceed' })
        setErrorFilled('framework', { message: 'Unsupported framework' })
        setErrorFilled('language', { message: 'Unsupported language' })
    }, [setError, setErrorFilled])

    return (
        <Page title={'Tivadar Debnar | Forms'} path={path} recordVisit={false} loginRequired>
            <main>
                <h1>Form</h1>
                <p>
                    The <code>Form</code> namespace groups all form-related primitives. Every
                    controlled component integrates with <code>react-hook-form</code> via{' '}
                    <code>Controller</code>, accepting a <code>control</code> object and a{' '}
                    <code>name</code> to bind to form state. All components also accept{' '}
                    <code>ariaLabel</code>, <code>className</code> and <code>style</code>.
                </p>

                {/* ─── LAYOUT ─── */}
                <section>
                    <h2>Layout</h2>
                    <p>
                        Structural components that define form layout: <code>Form</code> wraps the
                        entire form, <code>Form.Fieldset</code> groups a label with its input, and{' '}
                        <code>Form.Label</code> provides a styled label element.
                    </p>

                    <h3>Form</h3>
                    <p>
                        A thin wrapper around <code>&lt;form&gt;</code> that forwards all native
                        attributes and applies neumorphic panel styling.
                    </p>
                    <Code language="tsx" content={Snippets.Layout.form} />

                    <h3>Form.Fieldset</h3>
                    <p>
                        Groups a label and input together. The label floats above the fieldset
                        border and highlights on focus-within.
                    </p>
                    <Code language="tsx" content={Snippets.Layout.fieldset} />

                    <h3>Form.Label</h3>
                    <p>
                        A styled <code>&lt;label&gt;</code> with a <code>for</code> prop (mapped to{' '}
                        <code>htmlFor</code>). Turns accent when its fieldset is focused.
                    </p>
                    <Code language="tsx" content={Snippets.Layout.label} />
                </section>

                {/* ─── TEXT INPUTS ─── */}
                <section>
                    <h2>Text Inputs</h2>
                    <p>
                        <code>Form.Input</code> supports multiple types. <code>Form.TextArea</code>{' '}
                        provides a multi-line variant with optional character counter.
                    </p>

                    <h3>Text</h3>
                    <Form autoComplete="off" ariaLabel="Text input demo">
                        <Form.Fieldset>
                            <Form.Label for="name">Name</Form.Label>
                            <Form.Input
                                name="name"
                                control={control}
                                type="text"
                                placeholder="Enter name…"
                            />
                        </Form.Fieldset>
                    </Form>
                    <Code language="tsx" content={Snippets.TextInputs.text} />

                    <h3>Email</h3>
                    <Form autoComplete="off" ariaLabel="Email input demo">
                        <Form.Fieldset>
                            <Form.Label for="email">Email</Form.Label>
                            <Form.Input
                                name="email"
                                control={control}
                                type="email"
                                autoComplete="email"
                            />
                        </Form.Fieldset>
                    </Form>
                    <Code language="tsx" content={Snippets.TextInputs.email} />

                    <h3>Password</h3>
                    <p>
                        Set <code>addRevealPasswordIcon</code> to show a toggle eye icon.
                    </p>
                    <Form autoComplete="off" ariaLabel="Password input demo">
                        <Form.Fieldset>
                            <Form.Label for="password">Password</Form.Label>
                            <Form.Input
                                name="password"
                                control={control}
                                type="password"
                                autoComplete="one-time-code"
                                addRevealPasswordIcon
                                revealPassword={revealPassword}
                                setRevealPassword={setRevealPassword}
                            />
                        </Form.Fieldset>
                    </Form>
                    <Code language="tsx" content={Snippets.TextInputs.password} />

                    <h3>Number</h3>
                    <Form autoComplete="off" ariaLabel="Number input demo">
                        <Form.Fieldset>
                            <Form.Label for="age">Age</Form.Label>
                            <Form.Input name="age" control={control} type="number" />
                        </Form.Fieldset>
                    </Form>
                    <Code language="tsx" content={Snippets.TextInputs.number} />

                    <h3>TextArea</h3>
                    <p>
                        Set <code>maxLength</code> to show a live character counter.{' '}
                        <code>rows</code> defaults to 3.
                    </p>
                    <Form autoComplete="off" ariaLabel="TextArea demo">
                        <Form.Fieldset>
                            <Form.Label for="bio">Bio</Form.Label>
                            <Form.TextArea
                                name="bio"
                                control={control}
                                placeholder="Tell us about yourself…"
                            />
                        </Form.Fieldset>
                        <Form.Fieldset>
                            <Form.Label for="description">Description</Form.Label>
                            <Form.TextArea
                                name="description"
                                control={control}
                                placeholder="Describe the item…"
                                maxLength={255}
                                rows={5}
                            />
                        </Form.Fieldset>
                    </Form>
                    <Code language="tsx" content={Snippets.TextInputs.textarea} />
                    <Code language="tsx" content={Snippets.TextInputs.textareaMax} />
                    <Code language="tsx" content={Snippets.TextInputs.types} />
                </section>

                {/* ─── DATE PICKERS ─── */}
                <section>
                    <h2>Date Pickers</h2>
                    <p>
                        Two date options: the native browser <code>type="date"</code> input (limited
                        styling) and the custom <code>Form.DateInput</code> with a full calendar
                        popup.
                    </p>

                    <h3>Native Date</h3>
                    <Form autoComplete="off" ariaLabel="Native date demo">
                        <Form.Fieldset>
                            <Form.Label for="dob">Date of Birth</Form.Label>
                            <Form.Input name="dob" control={control} type="date" />
                        </Form.Fieldset>
                    </Form>
                    <Code language="tsx" content={Snippets.DatePickers.native} />

                    <h3>Custom DateInput</h3>
                    <p>
                        Full-featured calendar picker with text mask, keyboard navigation,
                        year/month quick-pick, and viewport-aware flip.
                    </p>
                    <Form autoComplete="off" ariaLabel="Custom date demo">
                        <Form.Fieldset>
                            <Form.Label for="dob">Date of Birth</Form.Label>
                            <Form.DateInput name="dob" control={control} />
                        </Form.Fieldset>
                    </Form>
                    <Code language="tsx" content={Snippets.DatePickers.custom} />
                    <Code language="tsx" content={Snippets.DatePickers.customWithMinMax} />
                    <Code language="tsx" content={Snippets.DatePickers.features} />
                </section>

                {/* ─── SELECTION ─── */}
                <section>
                    <h2>Selection</h2>
                    <p>
                        Components for picking from predefined options: radio buttons, checkboxes,
                        and a searchable dropdown.
                    </p>

                    <h3>RadioButton &amp; RadioGroup</h3>
                    <p>
                        Wrap radios in <code>Form.RadioGroup</code> for accessible grouping. Pass
                        string or boolean <code>value</code> props.
                    </p>
                    <Form autoComplete="off" ariaLabel="RadioButton demo">
                        <Form.Fieldset>
                            <Form.RadioGroup label="Role" htmlFor="role">
                                <Form.RadioButton
                                    name="role"
                                    control={control}
                                    value="admin"
                                    onChange={() => undefined}
                                />
                                <Form.Label for="roleAdmin">Admin</Form.Label>
                                <Form.RadioButton
                                    name="role"
                                    control={control}
                                    value="user"
                                    onChange={() => undefined}
                                />
                                <Form.Label for="roleUser">User</Form.Label>
                            </Form.RadioGroup>
                        </Form.Fieldset>
                    </Form>
                    <Code language="tsx" content={Snippets.Selection.radio} />
                    <Code language="tsx" content={Snippets.Selection.radioBoolean} />

                    <h3>Checkbox</h3>
                    <p>
                        A styled checkbox with built-in label. The optional <code>onChange</code>{' '}
                        callback fires with the new checked state.
                    </p>
                    <Form autoComplete="off" ariaLabel="Checkbox demo">
                        <Form.Checkbox
                            name="terms"
                            control={control}
                            label="I agree to the terms"
                        />
                    </Form>
                    <Code language="tsx" content={Snippets.Selection.checkbox} />

                    <h3>SearchInput</h3>
                    <p>
                        A filterable dropdown with <code>highlightMatch</code> support, optional
                        icons and colour selection. Opens on typing or clicking the toggle icon.
                    </p>
                    <Form autoComplete="off" ariaLabel="SearchInput demo">
                        <Form.Fieldset>
                            <Form.Label for="framework">Framework</Form.Label>
                            <Form.SearchInput
                                name="framework"
                                control={control}
                                options={frameworkOptions}
                                placeholder="Select framework"
                                highlightMatch
                                buttonIcon="arrow"
                                onSelect={(option) => setValue('framework', option.label)}
                            />
                        </Form.Fieldset>
                    </Form>
                    <Code language="tsx" content={Snippets.Selection.search} />
                    <Code language="tsx" content={Snippets.Selection.searchIcons} />
                </section>

                {/* ─── ACTIONS ─── */}
                <section>
                    <h2>Actions</h2>
                    <p>
                        <code>Form.Button</code> renders a styled button with <code>primary</code>{' '}
                        (default) or <code>secondary</code> variant. <code>Form.ButtonGroup</code>{' '}
                        arranges buttons in a row with consistent spacing.
                    </p>

                    <Form autoComplete="off" ariaLabel="Button demo">
                        <Form.ButtonGroup>
                            <Form.Button variant="secondary">Cancel</Form.Button>
                            <Form.Button type="submit">Submit</Form.Button>
                        </Form.ButtonGroup>
                    </Form>
                    <Code language="tsx" content={Snippets.Actions.primary} />
                    <Code language="tsx" content={Snippets.Actions.secondary} />
                    <Code language="tsx" content={Snippets.Actions.disabled} />
                    <Code language="tsx" content={Snippets.Actions.group} />
                </section>

                {/* ─── ALL INPUTS: EMPTY ─── */}
                <section>
                    <h2>All Inputs — Empty</h2>
                    <Form autoComplete="off" ariaLabel="All inputs empty">
                        <Form.Fieldset>
                            <Form.Label for="name">Name</Form.Label>
                            <Form.Input
                                name="name"
                                control={control}
                                type="text"
                                placeholder="Enter name…"
                            />
                        </Form.Fieldset>
                        <Form.Fieldset>
                            <Form.Label for="email">Email</Form.Label>
                            <Form.Input
                                name="email"
                                control={control}
                                type="email"
                                autoComplete="one-time-code"
                                placeholder="Enter email…"
                            />
                        </Form.Fieldset>
                        <Form.Fieldset>
                            <Form.Label for="password">Password</Form.Label>
                            <Form.Input
                                name="password"
                                control={control}
                                type="password"
                                autoComplete="one-time-code"
                                placeholder="Enter password…"
                                addRevealPasswordIcon
                                revealPassword={revealPassword}
                                setRevealPassword={setRevealPassword}
                            />
                        </Form.Fieldset>
                        <Form.Fieldset>
                            <Form.Label for="dob">Date of Birth</Form.Label>
                            <Form.DateInput name="dob" control={control} />
                        </Form.Fieldset>
                        <Form.Fieldset>
                            <Form.Label for="dobNative">Date (Native)</Form.Label>
                            <Form.Input name="dobNative" control={control} type="date" />
                        </Form.Fieldset>
                        <Form.Fieldset>
                            <Form.Label for="bio">Bio</Form.Label>
                            <Form.TextArea
                                name="bio"
                                control={control}
                                placeholder="Tell us about yourself…"
                                maxLength={200}
                            />
                        </Form.Fieldset>
                        <Form.Fieldset>
                            <Form.RadioGroup label="Role" htmlFor="role">
                                <Form.RadioButton
                                    name="role"
                                    control={control}
                                    value="admin"
                                    onChange={() => undefined}
                                />
                                <Form.Label for="roleAdmin">Admin</Form.Label>
                                <Form.RadioButton
                                    name="role"
                                    control={control}
                                    value="user"
                                    onChange={() => undefined}
                                />
                                <Form.Label for="roleUser">User</Form.Label>
                            </Form.RadioGroup>
                        </Form.Fieldset>
                        <Form.Fieldset>
                            <Form.Checkbox
                                name="terms"
                                control={control}
                                label="I agree to the terms"
                            />
                        </Form.Fieldset>
                        <Form.Fieldset>
                            <Form.Label for="framework">Framework</Form.Label>
                            <Form.SearchInput
                                name="framework"
                                control={control}
                                options={frameworkOptions}
                                placeholder="Select framework"
                                highlightMatch
                                buttonIcon="arrow"
                                onSelect={(option) => setValue('framework', option.label)}
                            />
                        </Form.Fieldset>
                        <Form.Fieldset>
                            <Form.Label for="language">Language</Form.Label>
                            <Form.SearchInput
                                name="language"
                                control={control}
                                options={languageOptions}
                                placeholder="Search language"
                                highlightMatch
                                onSelect={(option) => setValue('language', option.label)}
                            />
                        </Form.Fieldset>
                        <Form.ButtonGroup>
                            <Form.Button variant="secondary">Cancel</Form.Button>
                            <Form.Button type="submit">Submit</Form.Button>
                        </Form.ButtonGroup>
                    </Form>
                </section>

                {/* ─── ALL INPUTS: WITH VALUES ─── */}
                <section>
                    <h2>All Inputs — With Values</h2>
                    <Form autoComplete="off" ariaLabel="All inputs filled">
                        <Form.Fieldset>
                            <Form.Label for="name">Name</Form.Label>
                            <Form.Input
                                name="name"
                                control={filledControl}
                                type="text"
                                placeholder="Enter name…"
                            />
                        </Form.Fieldset>
                        <Form.Fieldset>
                            <Form.Label for="email">Email</Form.Label>
                            <Form.Input
                                name="email"
                                control={filledControl}
                                type="email"
                                autoComplete="one-time-code"
                                placeholder="Enter email…"
                            />
                        </Form.Fieldset>
                        <Form.Fieldset>
                            <Form.Label for="password">Password</Form.Label>
                            <Form.Input
                                name="password"
                                control={filledControl}
                                type="password"
                                autoComplete="one-time-code"
                                placeholder="Enter password…"
                                addRevealPasswordIcon
                                revealPassword={revealPassword}
                                setRevealPassword={setRevealPassword}
                            />
                        </Form.Fieldset>
                        <Form.Fieldset>
                            <Form.Label for="dob">Date of Birth</Form.Label>
                            <Form.DateInput name="dob" control={filledControl} />
                        </Form.Fieldset>
                        <Form.Fieldset>
                            <Form.Label for="dobNative">Date (Native)</Form.Label>
                            <Form.Input name="dobNative" control={filledControl} type="date" />
                        </Form.Fieldset>
                        <Form.Fieldset>
                            <Form.Label for="bio">Bio</Form.Label>
                            <Form.TextArea
                                name="bio"
                                control={filledControl}
                                placeholder="Tell us about yourself…"
                                maxLength={200}
                            />
                        </Form.Fieldset>
                        <Form.Fieldset>
                            <Form.RadioGroup label="Role" htmlFor="role">
                                <Form.RadioButton
                                    name="role"
                                    control={filledControl}
                                    value="admin"
                                    onChange={() => undefined}
                                />
                                <Form.Label for="roleAdmin">Admin</Form.Label>
                                <Form.RadioButton
                                    name="role"
                                    control={filledControl}
                                    value="user"
                                    onChange={() => undefined}
                                />
                                <Form.Label for="roleUser">User</Form.Label>
                            </Form.RadioGroup>
                        </Form.Fieldset>
                        <Form.Fieldset>
                            <Form.Checkbox
                                name="terms"
                                control={filledControl}
                                label="I agree to the terms"
                            />
                        </Form.Fieldset>
                        <Form.Fieldset>
                            <Form.Label for="framework">Framework</Form.Label>
                            <Form.SearchInput
                                name="framework"
                                control={filledControl}
                                options={frameworkOptions}
                                placeholder="Select framework"
                                buttonIcon="arrow"
                                onSelect={(option) => setFilledValue('framework', option.label)}
                            />
                        </Form.Fieldset>
                        <Form.Fieldset>
                            <Form.Label for="language">Language</Form.Label>
                            <Form.SearchInput
                                name="language"
                                control={filledControl}
                                options={languageOptions}
                                placeholder="Search language"
                                highlightMatch
                                onSelect={(option) => setFilledValue('language', option.label)}
                            />
                        </Form.Fieldset>
                        <Form.ButtonGroup>
                            <Form.Button variant="secondary">Cancel</Form.Button>
                            <Form.Button type="submit">Submit</Form.Button>
                        </Form.ButtonGroup>
                    </Form>
                </section>

                {/* ─── ERROR STATES: EMPTY ─── */}
                <section>
                    <h2>Error States — Empty</h2>
                    <p>
                        Error messages float on the input border, replacing the character counter on
                        textareas.
                    </p>
                    <Form autoComplete="off" ariaLabel="Error states empty">
                        <Form.Fieldset>
                            <Form.Label for="name">Name</Form.Label>
                            <Form.Input
                                name="name"
                                control={errorControl}
                                type="text"
                                placeholder="Enter name…"
                            />
                        </Form.Fieldset>
                        <Form.Fieldset>
                            <Form.Label for="email">Email</Form.Label>
                            <Form.Input
                                name="email"
                                control={errorControl}
                                type="email"
                                autoComplete="one-time-code"
                                placeholder="Enter email…"
                            />
                        </Form.Fieldset>
                        <Form.Fieldset>
                            <Form.Label for="password">Password</Form.Label>
                            <Form.Input
                                name="password"
                                control={errorControl}
                                type="password"
                                autoComplete="one-time-code"
                                placeholder="Enter password…"
                            />
                        </Form.Fieldset>
                        <Form.Fieldset>
                            <Form.Label for="dob">Date of Birth</Form.Label>
                            <Form.DateInput name="dob" control={errorControl} />
                        </Form.Fieldset>
                        <Form.Fieldset>
                            <Form.Label for="dobNative">Date (Native)</Form.Label>
                            <Form.Input name="dobNative" control={errorControl} type="date" />
                        </Form.Fieldset>
                        <Form.Fieldset>
                            <Form.Label for="bio">Bio</Form.Label>
                            <Form.TextArea
                                name="bio"
                                control={errorControl}
                                placeholder="Tell us about yourself…"
                                maxLength={200}
                            />
                        </Form.Fieldset>
                        <Form.Fieldset>
                            <Form.RadioGroup
                                label="Role"
                                htmlFor="role"
                                error="Please select a role"
                            >
                                <Form.RadioButton
                                    name="role"
                                    control={errorControl}
                                    value="admin"
                                    onChange={() => undefined}
                                />
                                <Form.Label for="roleAdmin">Admin</Form.Label>
                                <Form.RadioButton
                                    name="role"
                                    control={errorControl}
                                    value="user"
                                    onChange={() => undefined}
                                />
                                <Form.Label for="roleUser">User</Form.Label>
                            </Form.RadioGroup>
                        </Form.Fieldset>
                        <Form.Fieldset>
                            <Form.Checkbox
                                name="terms"
                                control={errorControl}
                                label="I agree to the terms"
                            />
                        </Form.Fieldset>
                        <Form.Fieldset>
                            <Form.Label for="framework">Framework</Form.Label>
                            <Form.SearchInput
                                name="framework"
                                control={errorControl}
                                options={frameworkOptions}
                                placeholder="Select framework"
                                buttonIcon="arrow"
                                onSelect={(option) => setErrorValue('framework', option.label)}
                            />
                        </Form.Fieldset>
                        <Form.Fieldset>
                            <Form.Label for="language">Language</Form.Label>
                            <Form.SearchInput
                                name="language"
                                control={errorControl}
                                options={languageOptions}
                                placeholder="Search language"
                                highlightMatch
                                onSelect={(option) => setErrorValue('language', option.label)}
                            />
                        </Form.Fieldset>
                        <Form.ButtonGroup>
                            <Form.Button variant="secondary">Cancel</Form.Button>
                            <Form.Button type="submit">Submit</Form.Button>
                        </Form.ButtonGroup>
                    </Form>
                    <Code language="tsx" content={Snippets.ErrorStates.demo} />
                </section>

                {/* ─── ERROR STATES: WITH VALUES ─── */}
                <section>
                    <h2>Error States — With Values</h2>
                    <Form autoComplete="off" ariaLabel="Error states filled">
                        <Form.Fieldset>
                            <Form.Label for="name">Name</Form.Label>
                            <Form.Input
                                name="name"
                                control={errorFilledControl}
                                type="text"
                                placeholder="Enter name…"
                            />
                        </Form.Fieldset>
                        <Form.Fieldset>
                            <Form.Label for="email">Email</Form.Label>
                            <Form.Input
                                name="email"
                                control={errorFilledControl}
                                type="email"
                                autoComplete="one-time-code"
                                placeholder="Enter email…"
                            />
                        </Form.Fieldset>
                        <Form.Fieldset>
                            <Form.Label for="password">Password</Form.Label>
                            <Form.Input
                                name="password"
                                control={errorFilledControl}
                                type="password"
                                autoComplete="one-time-code"
                                placeholder="Enter password…"
                                addRevealPasswordIcon
                                revealPassword={revealPassword}
                                setRevealPassword={setRevealPassword}
                            />
                        </Form.Fieldset>
                        <Form.Fieldset>
                            <Form.Label for="dob">Date of Birth</Form.Label>
                            <Form.DateInput name="dob" control={errorFilledControl} />
                        </Form.Fieldset>
                        <Form.Fieldset>
                            <Form.Label for="dobNative">Date (Native)</Form.Label>
                            <Form.Input name="dobNative" control={errorFilledControl} type="date" />
                        </Form.Fieldset>
                        <Form.Fieldset>
                            <Form.Label for="bio">Bio</Form.Label>
                            <Form.TextArea
                                name="bio"
                                control={errorFilledControl}
                                placeholder="Tell us about yourself…"
                                maxLength={200}
                            />
                        </Form.Fieldset>
                        <Form.Fieldset>
                            <Form.RadioGroup label="Role" htmlFor="role" error="Admin not allowed">
                                <Form.RadioButton
                                    name="role"
                                    control={errorFilledControl}
                                    value="admin"
                                    onChange={() => undefined}
                                />
                                <Form.Label for="roleAdmin">Admin</Form.Label>
                                <Form.RadioButton
                                    name="role"
                                    control={errorFilledControl}
                                    value="user"
                                    onChange={() => undefined}
                                />
                                <Form.Label for="roleUser">User</Form.Label>
                            </Form.RadioGroup>
                        </Form.Fieldset>
                        <Form.Fieldset>
                            <Form.Checkbox
                                name="terms"
                                control={errorFilledControl}
                                label="I agree to the terms"
                            />
                        </Form.Fieldset>
                        <Form.Fieldset>
                            <Form.Label for="framework">Framework</Form.Label>
                            <Form.SearchInput
                                name="framework"
                                control={errorFilledControl}
                                options={frameworkOptions}
                                placeholder="Select framework"
                                buttonIcon="arrow"
                                onSelect={(option) =>
                                    setErrorFilledValue('framework', option.label)
                                }
                            />
                        </Form.Fieldset>
                        <Form.Fieldset>
                            <Form.Label for="language">Language</Form.Label>
                            <Form.SearchInput
                                name="language"
                                control={errorFilledControl}
                                options={languageOptions}
                                placeholder="Search language"
                                highlightMatch
                                onSelect={(option) => setErrorFilledValue('language', option.label)}
                            />
                        </Form.Fieldset>
                        <Form.ButtonGroup>
                            <Form.Button variant="secondary">Cancel</Form.Button>
                            <Form.Button type="submit">Submit</Form.Button>
                        </Form.ButtonGroup>
                    </Form>
                </section>

                {/* ─── DISABLED STATES: EMPTY ─── */}
                <section>
                    <h2>Disabled States — Empty</h2>
                    <p>
                        Wrap in a native <code>&lt;fieldset disabled&gt;</code> to disable all
                        children. Icons are not clickable and inputs show{' '}
                        <code>cursor: not-allowed</code>.
                    </p>
                    <Form autoComplete="off" ariaLabel="Disabled states empty">
                        <fieldset disabled>
                            <Form.Fieldset>
                                <Form.Label for="name">Name</Form.Label>
                                <Form.Input
                                    name="name"
                                    control={disabledControl}
                                    type="text"
                                    placeholder="Enter name…"
                                />
                            </Form.Fieldset>
                            <Form.Fieldset>
                                <Form.Label for="email">Email</Form.Label>
                                <Form.Input
                                    name="email"
                                    control={disabledControl}
                                    type="email"
                                    autoComplete="one-time-code"
                                    placeholder="Enter email…"
                                />
                            </Form.Fieldset>
                            <Form.Fieldset>
                                <Form.Label for="password">Password</Form.Label>
                                <Form.Input
                                    name="password"
                                    control={disabledControl}
                                    type="password"
                                    autoComplete="one-time-code"
                                    placeholder="Enter password…"
                                    addRevealPasswordIcon
                                    revealPassword={revealPassword}
                                    setRevealPassword={setRevealPassword}
                                />
                            </Form.Fieldset>
                            <Form.Fieldset>
                                <Form.Label for="dob">Date of Birth</Form.Label>
                                <Form.DateInput name="dob" control={disabledControl} />
                            </Form.Fieldset>
                            <Form.Fieldset>
                                <Form.Label for="dobNative">Date (Native)</Form.Label>
                                <Form.Input
                                    name="dobNative"
                                    control={disabledControl}
                                    type="date"
                                />
                            </Form.Fieldset>
                            <Form.Fieldset>
                                <Form.Label for="bio">Bio</Form.Label>
                                <Form.TextArea
                                    name="bio"
                                    control={disabledControl}
                                    placeholder="Tell us about yourself…"
                                    maxLength={200}
                                />
                            </Form.Fieldset>
                            <Form.Fieldset>
                                <Form.RadioGroup label="Role" htmlFor="role">
                                    <Form.RadioButton
                                        name="role"
                                        control={disabledControl}
                                        value="admin"
                                        onChange={() => undefined}
                                    />
                                    <Form.Label for="roleAdmin">Admin</Form.Label>
                                    <Form.RadioButton
                                        name="role"
                                        control={disabledControl}
                                        value="user"
                                        onChange={() => undefined}
                                    />
                                    <Form.Label for="roleUser">User</Form.Label>
                                </Form.RadioGroup>
                            </Form.Fieldset>
                            <Form.Fieldset>
                                <Form.Checkbox
                                    name="terms"
                                    control={disabledControl}
                                    label="I agree to the terms"
                                />
                            </Form.Fieldset>
                            <Form.Fieldset>
                                <Form.Label for="framework">Framework</Form.Label>
                                <Form.SearchInput
                                    name="framework"
                                    control={disabledControl}
                                    options={frameworkOptions}
                                    placeholder="Select framework"
                                    buttonIcon="arrow"
                                    onSelect={() => undefined}
                                />
                            </Form.Fieldset>
                            <Form.Fieldset>
                                <Form.Label for="language">Language</Form.Label>
                                <Form.SearchInput
                                    name="language"
                                    control={disabledControl}
                                    options={languageOptions}
                                    placeholder="Search language"
                                    highlightMatch
                                    onSelect={() => undefined}
                                />
                            </Form.Fieldset>
                            <Form.ButtonGroup>
                                <Form.Button variant="secondary" disabled>
                                    Cancel
                                </Form.Button>
                                <Form.Button disabled>Submit</Form.Button>
                            </Form.ButtonGroup>
                        </fieldset>
                    </Form>
                    <Code language="tsx" content={Snippets.DisabledStates.demo} />
                </section>

                {/* ─── DISABLED STATES: WITH VALUES ─── */}
                <section>
                    <h2>Disabled States — With Values</h2>
                    <Form autoComplete="off" ariaLabel="Disabled states filled">
                        <fieldset disabled>
                            <Form.Fieldset>
                                <Form.Label for="name">Name</Form.Label>
                                <Form.Input
                                    name="name"
                                    control={disabledFilledControl}
                                    type="text"
                                    placeholder="Enter name…"
                                />
                            </Form.Fieldset>
                            <Form.Fieldset>
                                <Form.Label for="email">Email</Form.Label>
                                <Form.Input
                                    name="email"
                                    control={disabledFilledControl}
                                    type="email"
                                    autoComplete="one-time-code"
                                    placeholder="Enter email…"
                                />
                            </Form.Fieldset>
                            <Form.Fieldset>
                                <Form.Label for="password">Password</Form.Label>
                                <Form.Input
                                    name="password"
                                    control={disabledFilledControl}
                                    type="password"
                                    autoComplete="one-time-code"
                                    placeholder="Enter password…"
                                    addRevealPasswordIcon
                                    revealPassword={revealPassword}
                                    setRevealPassword={setRevealPassword}
                                />
                            </Form.Fieldset>
                            <Form.Fieldset>
                                <Form.Label for="dob">Date of Birth</Form.Label>
                                <Form.DateInput name="dob" control={disabledFilledControl} />
                            </Form.Fieldset>
                            <Form.Fieldset>
                                <Form.Label for="dobNative">Date (Native)</Form.Label>
                                <Form.Input
                                    name="dobNative"
                                    control={disabledFilledControl}
                                    type="date"
                                />
                            </Form.Fieldset>
                            <Form.Fieldset>
                                <Form.Label for="bio">Bio</Form.Label>
                                <Form.TextArea
                                    name="bio"
                                    control={disabledFilledControl}
                                    placeholder="Tell us about yourself…"
                                    maxLength={200}
                                />
                            </Form.Fieldset>
                            <Form.Fieldset>
                                <Form.RadioGroup label="Role" htmlFor="role">
                                    <Form.RadioButton
                                        name="role"
                                        control={disabledFilledControl}
                                        value="admin"
                                        onChange={() => undefined}
                                    />
                                    <Form.Label for="roleAdmin">Admin</Form.Label>
                                    <Form.RadioButton
                                        name="role"
                                        control={disabledFilledControl}
                                        value="user"
                                        onChange={() => undefined}
                                    />
                                    <Form.Label for="roleUser">User</Form.Label>
                                </Form.RadioGroup>
                            </Form.Fieldset>
                            <Form.Fieldset>
                                <Form.Checkbox
                                    name="terms"
                                    control={disabledFilledControl}
                                    label="I agree to the terms"
                                />
                            </Form.Fieldset>
                            <Form.Fieldset>
                                <Form.Label for="framework">Framework</Form.Label>
                                <Form.SearchInput
                                    name="framework"
                                    control={disabledFilledControl}
                                    options={frameworkOptions}
                                    placeholder="Select framework"
                                    buttonIcon="arrow"
                                    onSelect={() => undefined}
                                />
                            </Form.Fieldset>
                            <Form.Fieldset>
                                <Form.Label for="language">Language</Form.Label>
                                <Form.SearchInput
                                    name="language"
                                    control={disabledFilledControl}
                                    options={languageOptions}
                                    placeholder="Search language"
                                    highlightMatch
                                    onSelect={() => undefined}
                                />
                            </Form.Fieldset>
                            <Form.ButtonGroup>
                                <Form.Button variant="secondary" disabled>
                                    Cancel
                                </Form.Button>
                                <Form.Button disabled>Submit</Form.Button>
                            </Form.ButtonGroup>
                        </fieldset>
                    </Form>
                </section>
            </main>
        </Page>
    )
}
