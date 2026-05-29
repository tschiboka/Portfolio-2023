import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Code, CodeText, Form, Heading, Main, Paragraph, Section } from '@common/ux'
import { Screen } from '../../../../../sharedComponents/Screen/Screen'
import { PageSideMenu } from '../../../../../sharedComponents/PageSideMenu/PageSideMenu'
import { StoryNav } from '../StoryNav/StoryNav'
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
        <Screen
            title={'Tivadar Debnar | Forms'}
            path={path}
            recordVisit={false}
            loginRequired
            variant="api"
            pageName="Projects"
            sideMenu={<PageSideMenu />}
            hasContentNavigator
        >
            <Main>
                <StoryNav />
                <Heading as="h1">Form</Heading>
                <Paragraph>
                    The <CodeText>Form</CodeText> namespace groups all form-related primitives.
                    Every controlled component integrates with <CodeText>react-hook-form</CodeText>{' '}
                    via <CodeText>Controller</CodeText>, accepting a <CodeText>control</CodeText>{' '}
                    object and a <CodeText>name</CodeText> to bind to form state. All components
                    also accept <CodeText>ariaLabel</CodeText>, <CodeText>className</CodeText> and{' '}
                    <CodeText>style</CodeText>.
                </Paragraph>
                <Section>
                    <Heading as="h2" id="layout">
                        Layout
                    </Heading>
                    <Paragraph>
                        Structural components that define form layout: <CodeText>Form</CodeText>{' '}
                        wraps the entire form, <CodeText>Form.Fieldset</CodeText> groups a label
                        with its input, and <CodeText>Form.Label</CodeText> provides a styled label
                        element.
                    </Paragraph>

                    <Heading as="h3">Form</Heading>
                    <Paragraph>
                        A thin wrapper around <CodeText>&lt;form&gt;</CodeText> that forwards all
                        native attributes and applies neumorphic panel styling.
                    </Paragraph>
                    <Code language="tsx" content={Snippets.Layout.form} />

                    <Heading as="h3">Form.Fieldset</Heading>
                    <Paragraph>
                        Groups a label and input together. The label floats above the fieldset
                        border and highlights on focus-within.
                    </Paragraph>
                    <Code language="tsx" content={Snippets.Layout.fieldset} />

                    <Heading as="h3">Form.Label</Heading>
                    <Paragraph>
                        A styled <CodeText>&lt;label&gt;</CodeText> with a <CodeText>for</CodeText>{' '}
                        prop (mapped to <CodeText>htmlFor</CodeText>). Turns accent when its
                        fieldset is focused.
                    </Paragraph>
                    <Code language="tsx" content={Snippets.Layout.label} />
                </Section>

                {/* ─── TEXT INPUTS ─── */}
                <Section>
                    <Heading as="h2" id="text-inputs">
                        Text Inputs
                    </Heading>
                    <Paragraph>
                        <CodeText>Form.Input</CodeText> supports multiple types.{' '}
                        <CodeText>Form.TextArea</CodeText> provides a multi-line variant with
                        optional character counter.
                    </Paragraph>

                    <Heading as="h3">Text</Heading>
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

                    <Heading as="h3">Email</Heading>
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

                    <Heading as="h3">Password</Heading>
                    <Paragraph>
                        Set <CodeText>addRevealPasswordIcon</CodeText> to show a toggle eye icon.
                    </Paragraph>
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

                    <Heading as="h3">Number</Heading>
                    <Form autoComplete="off" ariaLabel="Number input demo">
                        <Form.Fieldset>
                            <Form.Label for="age">Age</Form.Label>
                            <Form.Input name="age" control={control} type="number" />
                        </Form.Fieldset>
                    </Form>
                    <Code language="tsx" content={Snippets.TextInputs.number} />

                    <Heading as="h3">TextArea</Heading>
                    <Paragraph>
                        Set <CodeText>maxLength</CodeText> to show a live character counter.{' '}
                        <CodeText>rows</CodeText> defaults to 3.
                    </Paragraph>
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
                </Section>

                {/* ─── DATE PICKERS ─── */}
                <Section>
                    <Heading as="h2" id="date-pickers">
                        Date Pickers
                    </Heading>
                    <Paragraph>
                        Two date options: the native browser <CodeText>type="date"</CodeText> input
                        (limited styling) and the custom <CodeText>Form.DateInput</CodeText> with a
                        full calendar popup.
                    </Paragraph>

                    <Heading as="h3">Native Date</Heading>
                    <Form autoComplete="off" ariaLabel="Native date demo">
                        <Form.Fieldset>
                            <Form.Label for="dob">Date of Birth</Form.Label>
                            <Form.Input name="dob" control={control} type="date" />
                        </Form.Fieldset>
                    </Form>
                    <Code language="tsx" content={Snippets.DatePickers.native} />

                    <Heading as="h3">Custom DateInput</Heading>
                    <Paragraph>
                        Full-featured calendar picker with text mask, keyboard navigation,
                        year/month quick-pick, and viewport-aware flip.
                    </Paragraph>
                    <Form autoComplete="off" ariaLabel="Custom date demo">
                        <Form.Fieldset>
                            <Form.Label for="dob">Date of Birth</Form.Label>
                            <Form.DateInput name="dob" control={control} />
                        </Form.Fieldset>
                    </Form>
                    <Code language="tsx" content={Snippets.DatePickers.custom} />
                    <Code language="tsx" content={Snippets.DatePickers.customWithMinMax} />
                    <Code language="tsx" content={Snippets.DatePickers.features} />
                </Section>

                {/* ─── SELECTION ─── */}
                <Section>
                    <Heading as="h2" id="selection">
                        Selection
                    </Heading>
                    <Paragraph>
                        Components for picking from predefined options: radio buttons, checkboxes,
                        and a searchable dropdown.
                    </Paragraph>

                    <Heading as="h3">RadioButton &amp; RadioGroup</Heading>
                    <Paragraph>
                        Wrap radios in <CodeText>Form.RadioGroup</CodeText> for accessible grouping.
                        Pass string or boolean <CodeText>value</CodeText> props.
                    </Paragraph>
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

                    <Heading as="h3">Checkbox</Heading>
                    <Paragraph>
                        A styled checkbox with built-in label. The optional{' '}
                        <CodeText>onChange</CodeText> callback fires with the new checked state.
                    </Paragraph>
                    <Form autoComplete="off" ariaLabel="Checkbox demo">
                        <Form.Checkbox
                            name="terms"
                            control={control}
                            label="I agree to the terms"
                        />
                    </Form>
                    <Code language="tsx" content={Snippets.Selection.checkbox} />

                    <Heading as="h3">SearchInput</Heading>
                    <Paragraph>
                        A filterable dropdown with <CodeText>highlightMatch</CodeText> support,
                        optional icons and colour selection. Opens on typing or clicking the toggle
                        icon.
                    </Paragraph>
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
                </Section>

                {/* ─── ACTIONS ─── */}
                <Section>
                    <Heading as="h2" id="actions">
                        Actions
                    </Heading>
                    <Paragraph>
                        <CodeText>Form.Button</CodeText> renders a styled button with{' '}
                        <CodeText>primary</CodeText> (default) or <CodeText>secondary</CodeText>{' '}
                        variant. <CodeText>Form.ButtonGroup</CodeText> arranges buttons in a row
                        with consistent spacing.
                    </Paragraph>

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
                </Section>

                {/* ─── ALL INPUTS: EMPTY ─── */}
                <Section>
                    <Heading as="h2" id="all-inputs-empty">
                        All Inputs — Empty
                    </Heading>
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
                </Section>

                {/* ─── ALL INPUTS: WITH VALUES ─── */}
                <Section>
                    <Heading as="h2" id="all-inputs-with-values">
                        All Inputs — With Values
                    </Heading>
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
                </Section>

                {/* ─── ERROR STATES: EMPTY ─── */}
                <Section>
                    <Heading as="h2" id="error-states-empty">
                        Error States — Empty
                    </Heading>
                    <Paragraph>
                        Error messages float on the input border, replacing the character counter on
                        textareas.
                    </Paragraph>
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
                </Section>

                {/* ─── ERROR STATES: WITH VALUES ─── */}
                <Section>
                    <Heading as="h2" id="error-states-with-values">
                        Error States — With Values
                    </Heading>
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
                </Section>

                {/* ─── SUBMIT ERROR MESSAGE ─── */}
                <Section>
                    <Heading as="h2" id="submit-error-message">
                        Submit Error Message
                    </Heading>
                    <Paragraph>
                        <CodeText>Form.SubmitErrorMessage</CodeText> renders a form-level alert
                        banner for submission feedback. Unlike field-level errors, it sits outside
                        fieldsets and communicates the overall result of a submit action via{' '}
                        <CodeText>role="alert"</CodeText>. Use the <CodeText>variant</CodeText> prop
                        to convey the type of message.
                    </Paragraph>

                    <Heading as="h3">Variants</Heading>
                    <Form autoComplete="off" ariaLabel="SubmitErrorMessage demo">
                        <Form.SubmitErrorMessage
                            text="Something went wrong. Please try again."
                            variant="error"
                        />
                        <Form.SubmitErrorMessage
                            text="Your changes have been saved successfully."
                            variant="success"
                        />
                        <Form.SubmitErrorMessage
                            text="Review the fields below before submitting."
                            variant="info"
                        />
                        <Form.SubmitErrorMessage
                            text="Session expires in 5 minutes."
                            variant="warning"
                        />
                    </Form>
                    <Code language="tsx" content={Snippets.SubmitErrorMessage.basic} />
                    <Code language="tsx" content={Snippets.SubmitErrorMessage.variants} />
                </Section>

                {/* ─── DISABLED STATES: EMPTY ─── */}
                <Section>
                    <Heading as="h2" id="disabled-states-empty">
                        Disabled States — Empty
                    </Heading>
                    <Paragraph>
                        Wrap in a native <CodeText>&lt;fieldset disabled&gt;</CodeText> to disable
                        all children. Icons are not clickable and inputs show{' '}
                        <CodeText>cursor: not-allowed</CodeText>.
                    </Paragraph>
                    <Form autoComplete="off" ariaLabel="Disabled states empty">
                        <Form.Fieldset disabled>
                            <Form.Label for="name">Name</Form.Label>
                            <Form.Input
                                name="name"
                                control={disabledControl}
                                type="text"
                                placeholder="Enter name…"
                            />
                        </Form.Fieldset>
                        <Form.Fieldset disabled>
                            <Form.Label for="email">Email</Form.Label>
                            <Form.Input
                                name="email"
                                control={disabledControl}
                                type="email"
                                autoComplete="one-time-code"
                                placeholder="Enter email…"
                            />
                        </Form.Fieldset>
                        <Form.Fieldset disabled>
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
                        <Form.Fieldset disabled>
                            <Form.Label for="dob">Date of Birth</Form.Label>
                            <Form.DateInput name="dob" control={disabledControl} />
                        </Form.Fieldset>
                        <Form.Fieldset disabled>
                            <Form.Label for="dobNative">Date (Native)</Form.Label>
                            <Form.Input name="dobNative" control={disabledControl} type="date" />
                        </Form.Fieldset>
                        <Form.Fieldset disabled>
                            <Form.Label for="bio">Bio</Form.Label>
                            <Form.TextArea
                                name="bio"
                                control={disabledControl}
                                placeholder="Tell us about yourself…"
                                maxLength={200}
                            />
                        </Form.Fieldset>
                        <Form.Fieldset disabled>
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
                        <Form.Fieldset disabled>
                            <Form.Checkbox
                                name="terms"
                                control={disabledControl}
                                label="I agree to the terms"
                            />
                        </Form.Fieldset>
                        <Form.Fieldset disabled>
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
                        <Form.Fieldset disabled>
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
                    </Form>
                    <Code language="tsx" content={Snippets.DisabledStates.demo} />
                </Section>

                {/* ─── DISABLED STATES: WITH VALUES ─── */}
                <Section>
                    <Heading as="h2" id="disabled-states-with-values">
                        Disabled States — With Values
                    </Heading>
                    <Form autoComplete="off" ariaLabel="Disabled states filled">
                        <Form.Fieldset disabled>
                            <Form.Label for="name">Name</Form.Label>
                            <Form.Input
                                name="name"
                                control={disabledFilledControl}
                                type="text"
                                placeholder="Enter name…"
                            />
                        </Form.Fieldset>
                        <Form.Fieldset disabled>
                            <Form.Label for="email">Email</Form.Label>
                            <Form.Input
                                name="email"
                                control={disabledFilledControl}
                                type="email"
                                autoComplete="one-time-code"
                                placeholder="Enter email…"
                            />
                        </Form.Fieldset>
                        <Form.Fieldset disabled>
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
                        <Form.Fieldset disabled>
                            <Form.Label for="dob">Date of Birth</Form.Label>
                            <Form.DateInput name="dob" control={disabledFilledControl} />
                        </Form.Fieldset>
                        <Form.Fieldset disabled>
                            <Form.Label for="dobNative">Date (Native)</Form.Label>
                            <Form.Input
                                name="dobNative"
                                control={disabledFilledControl}
                                type="date"
                            />
                        </Form.Fieldset>
                        <Form.Fieldset disabled>
                            <Form.Label for="bio">Bio</Form.Label>
                            <Form.TextArea
                                name="bio"
                                control={disabledFilledControl}
                                placeholder="Tell us about yourself…"
                                maxLength={200}
                            />
                        </Form.Fieldset>
                        <Form.Fieldset disabled>
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
                        <Form.Fieldset disabled>
                            <Form.Checkbox
                                name="terms"
                                control={disabledFilledControl}
                                label="I agree to the terms"
                            />
                        </Form.Fieldset>
                        <Form.Fieldset disabled>
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
                        <Form.Fieldset disabled>
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
                    </Form>
                </Section>
            </Main>
        </Screen>
    )
}
