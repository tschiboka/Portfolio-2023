export const Code = {
    Layout: {
        form: `<Form onSubmit={handleSubmit(onSubmit)} ariaLabel="Registration form">
    <Form.Fieldset>
        <Form.Label for="email">Email</Form.Label>
        <Form.Input name="email" control={control} type="email" />
    </Form.Fieldset>
    <Form.ButtonGroup>
        <Form.Button type="submit">Submit</Form.Button>
    </Form.ButtonGroup>
</Form>`,
        fieldset: `<Form.Fieldset>
    <Form.Label for="name">Name</Form.Label>
    <Form.Input name="name" control={control} type="text" />
</Form.Fieldset>`,
        label: `<Form.Label for="email">Email</Form.Label>

{/* With custom styling */}
<Form.Label for="name" className="custom" style={{ color: 'var(--accent-dark-1)' }}>
    Name
</Form.Label>`,
    },
    TextInputs: {
        text: `<Form.Fieldset>
    <Form.Label for="name">Name</Form.Label>
    <Form.Input name="name" control={control} type="text" placeholder="Enter name…" />
</Form.Fieldset>`,
        email: `<Form.Fieldset>
    <Form.Label for="email">Email</Form.Label>
    <Form.Input name="email" control={control} type="email" autoComplete="email" />
</Form.Fieldset>`,
        password: `const [revealPassword, setRevealPassword] = useState(false)

<Form.Fieldset>
    <Form.Label for="password">Password</Form.Label>
    <Form.Input
        name="password"
        control={control}
        type="password"
        addRevealPasswordIcon
        revealPassword={revealPassword}
        setRevealPassword={setRevealPassword}
    />
</Form.Fieldset>`,
        number: `<Form.Fieldset>
    <Form.Label for="age">Age</Form.Label>
    <Form.Input name="age" control={control} type="number" />
</Form.Fieldset>`,
        textarea: `<Form.Fieldset>
    <Form.Label for="bio">Bio</Form.Label>
    <Form.TextArea name="bio" control={control} placeholder="Tell us about yourself…" />
</Form.Fieldset>`,
        textareaMax: `<Form.Fieldset>
    <Form.Label for="description">Description</Form.Label>
    <Form.TextArea
        name="description"
        control={control}
        placeholder="Describe the item…"
        maxLength={255}
        rows={5}
    />
</Form.Fieldset>`,
        types: `// Supported Input types:
// 'text' | 'email' | 'number' | 'search' | 'tel' | 'password' | 'date'`,
    },
    DatePickers: {
        native: `{/* Native browser date picker (limited styling control) */}
<Form.Fieldset>
    <Form.Label for="dob">Date of Birth</Form.Label>
    <Form.Input name="dob" control={control} type="date" />
</Form.Fieldset>`,
        custom: `{/* Custom DateInput with calendar popup, keyboard nav, year/month picker */}
<Form.Fieldset>
    <Form.Label for="dob">Date of Birth</Form.Label>
    <Form.DateInput name="dob" control={control} />
</Form.Fieldset>`,
        customWithMinMax: `{/* Constrain selectable range with min/max */}
<Form.Fieldset>
    <Form.Label for="eventDate">Event Date</Form.Label>
    <Form.DateInput
        name="eventDate"
        control={control}
        min="2020-01-01"
        max="2030-12-31"
        placeholder="dd/mm/yyyy"
    />
</Form.Fieldset>`,
        features: `// DateInput features:
// - Text input with dd/mm/yyyy mask and auto-slashes
// - Calendar popup with month/year navigation
// - Keyboard navigation (arrow keys within grid)
// - Year and month quick-pick panel
// - Today button to jump to current date
// - Clear button (disabled when empty)
// - Flips up when near viewport bottom
// - Accent border on input when picker is open`,
    },
    Selection: {
        radio: `<Form.Fieldset>
    <Form.RadioGroup label="Role" htmlFor="role">
        <Form.RadioButton name="role" control={control} value="admin" onChange={() => {}} />
        <Form.Label for="roleAdmin">Admin</Form.Label>
        <Form.RadioButton name="role" control={control} value="user" onChange={() => {}} />
        <Form.Label for="roleUser">User</Form.Label>
    </Form.RadioGroup>
</Form.Fieldset>`,
        radioBoolean: `<Form.Fieldset>
    <Form.RadioGroup label="Has Parent" htmlFor="hasParent">
        <Form.RadioButton
            name="hasParent"
            control={control}
            value={false}
            onChange={() => setShowInput(false)}
        />
        <Form.Label for="no">No</Form.Label>
        <Form.RadioButton
            name="hasParent"
            control={control}
            value={true}
            onChange={() => setShowInput(true)}
        />
        <Form.Label for="yes">Yes</Form.Label>
    </Form.RadioGroup>
</Form.Fieldset>`,
        checkbox: `<Form.Checkbox
    name="terms"
    control={control}
    label="I agree to the terms"
    onChange={(checked) => console.log(checked)}
/>`,
        search: `const options = [
    { label: 'React', value: 'react' },
    { label: 'Vue', value: 'vue' },
    { label: 'Angular', value: 'angular' },
    { label: 'Svelte', value: 'svelte' },
]

<Form.Fieldset>
    <Form.Label for="framework">Framework</Form.Label>
    <Form.SearchInput
        name="framework"
        control={control}
        options={options}
        placeholder="Select framework"
        highlightMatch
        buttonIcon="arrow"
        onSelect={(option) => setValue('framework', option.label)}
    />
</Form.Fieldset>`,
        searchIcons: `const options = [
    { label: 'Bug', value: 'bug', icon: <BsBug />, iconColor: 'var(--error)' },
    { label: 'Feature', value: 'feature', icon: <BsLightbulb />, iconColor: 'var(--yellow)' },
    { label: 'Task', value: 'task', icon: <BsCheck />, iconColor: 'var(--success)' },
]

<Form.SearchInput
    name="type"
    control={control}
    options={options}
    buttonIcon="arrow"
    highlightMatch
    colorSelection
    onSelect={(option) => setValue('type', option.label)}
/>`,
    },
    Actions: {
        primary: `<Form.Button type="submit">Submit</Form.Button>`,
        secondary: `<Form.Button variant="secondary" onClick={handleCancel}>Cancel</Form.Button>`,
        disabled: `<Form.Button type="submit" disabled>Submitting…</Form.Button>`,
        group: `<Form.ButtonGroup>
    <Form.Button variant="secondary" onClick={handleCancel}>Cancel</Form.Button>
    <Form.Button type="submit">Submit</Form.Button>
</Form.ButtonGroup>`,
    },
    FullForm: {
        demo: `const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
        name: '', email: '', password: '', dob: '',
        bio: '', role: 'user', terms: false, framework: '',
    },
})

<Form onSubmit={handleSubmit(onSubmit)} ariaLabel="Registration">
    <Form.Fieldset>
        <Form.Label for="name">Name</Form.Label>
        <Form.Input name="name" control={control} type="text" />
    </Form.Fieldset>

    <Form.Fieldset>
        <Form.Label for="email">Email</Form.Label>
        <Form.Input name="email" control={control} type="email" />
    </Form.Fieldset>

    <Form.Fieldset>
        <Form.Label for="password">Password</Form.Label>
        <Form.Input name="password" control={control} type="password" addRevealPasswordIcon />
    </Form.Fieldset>

    <Form.Fieldset>
        <Form.Label for="dob">Date of Birth</Form.Label>
        <Form.DateInput name="dob" control={control} />
    </Form.Fieldset>

    <Form.Fieldset>
        <Form.Label for="bio">Bio</Form.Label>
        <Form.TextArea name="bio" control={control} maxLength={200} />
    </Form.Fieldset>

    <Form.Fieldset>
        <Form.RadioGroup label="Role" htmlFor="role">
            <Form.RadioButton name="role" control={control} value="admin" onChange={() => {}} />
            <Form.Label for="roleAdmin">Admin</Form.Label>
            <Form.RadioButton name="role" control={control} value="user" onChange={() => {}} />
            <Form.Label for="roleUser">User</Form.Label>
        </Form.RadioGroup>
    </Form.Fieldset>

    <Form.Checkbox name="terms" control={control} label="I agree to the terms" />

    <Form.Fieldset>
        <Form.Label for="framework">Framework</Form.Label>
        <Form.SearchInput
            name="framework"
            control={control}
            options={frameworkOptions}
            placeholder="Pick one…"
            highlightMatch
            onSelect={(opt) => setValue('framework', opt.label)}
        />
    </Form.Fieldset>

    <Form.ButtonGroup>
        <Form.Button variant="secondary" type="reset">Reset</Form.Button>
        <Form.Button type="submit">Register</Form.Button>
    </Form.ButtonGroup>
</Form>`,
    },
    ErrorStates: {
        demo: `const { control, setError } = useForm({ defaultValues: { name: '', email: '', ... } })

// Trigger errors manually (or use schema validation)
useEffect(() => {
    setError('name', { message: 'Name is required' })
    setError('email', { message: 'Invalid email format' })
    setError('password', { message: 'Must be at least 8 characters' })
    setError('bio', { message: 'Bio must not exceed 200 characters' })
    setError('dob', { message: 'Date of birth is required' })
    setError('framework', { message: 'Please select a framework' })
}, [])

// Error messages appear automatically via fieldState.error
<Form.Fieldset>
    <Form.Label for="name">Name</Form.Label>
    <Form.Input name="name" control={control} type="text" />
</Form.Fieldset>`,
    },
    SubmitErrorMessage: {
        basic: `{/* Default variant is 'error' */}
<Form.SubmitErrorMessage text="Submission failed. Please try again." />

{/* Explicit error */}
<Form.SubmitErrorMessage
    text="Invalid credentials."
    variant="error"
    ariaLabel="Login error"
/>`,
        variants: `<Form.SubmitErrorMessage text="Something went wrong." variant="error" />
<Form.SubmitErrorMessage text="Your changes have been saved." variant="success" />
<Form.SubmitErrorMessage text="Review the fields below before submitting." variant="info" />
<Form.SubmitErrorMessage text="Session expires in 5 minutes." variant="warning" />`,
    },
    DisabledStates: {
        demo: `{/* Wrap in native <fieldset disabled> to disable all children */}
<Form ariaLabel="Disabled form">
    <fieldset disabled>
        <Form.Fieldset>
            <Form.Label for="name">Name</Form.Label>
            <Form.Input name="name" control={control} type="text" />
        </Form.Fieldset>

        <Form.Fieldset>
            <Form.Label for="email">Email</Form.Label>
            <Form.Input name="email" control={control} type="email" />
        </Form.Fieldset>

        <Form.Checkbox name="terms" control={control} label="I agree" />

        <Form.Fieldset>
            <Form.Label for="framework">Framework</Form.Label>
            <Form.SearchInput
                name="framework"
                control={control}
                options={options}
                onSelect={() => {}}
            />
        </Form.Fieldset>
    </fieldset>

    {/* Buttons support disabled prop directly */}
    <Form.ButtonGroup>
        <Form.Button disabled>Submit</Form.Button>
    </Form.ButtonGroup>
</Form>`,
    },
}
