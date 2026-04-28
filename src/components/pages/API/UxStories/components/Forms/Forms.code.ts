export const Code = {
    FormElement: {
        basic: `<Form onSubmit={handleSubmit(onSubmit)}>
    <fieldset>
        <Form.Label for="email">Email</Form.Label>
        <Form.Input name="email" control={control} type="email" />
    </fieldset>
    <button type="submit">Submit</button>
</Form>`,
        ariaLabel: `<Form ariaLabel="Login form" onSubmit={handleSubmit(onSubmit)}>
    ...
</Form>`,
    },
    Label: {
        basic: `<Form.Label for="email">Email</Form.Label>`,
        styled: `<Form.Label
    for="username"
    className="custom-label"
    style={{ color: 'var(--accent)' }}
>
    Username
</Form.Label>`,
    },
    Input: {
        text: `<Form.Label for="name">Name</Form.Label>
<Form.Input name="name" control={control} type="text" placeholder="Enter name…" />`,
        email: `<Form.Label for="email">Email</Form.Label>
<Form.Input name="email" control={control} type="email" autoComplete="email" />`,
        password: `const [revealPassword, setRevealPassword] = useState(false)

<Form.Label for="password">Password</Form.Label>
<Form.Input
    name="password"
    control={control}
    type="password"
    addRevealPasswordIcon
    revealPassword={revealPassword}
    setRevealPassword={setRevealPassword}
/>`,
        number: `<Form.Label for="age">Age</Form.Label>
<Form.Input name="age" control={control} type="number" />`,
        date: `<Form.Label for="dob">Date of Birth</Form.Label>
<Form.Input name="dob" control={control} type="date" />`,
        types: `// Supported types:
// 'text' | 'email' | 'number' | 'search' | 'tel' | 'password' | 'date'`,
    },
    TextArea: {
        basic: `<Form.Label for="bio">Bio</Form.Label>
<Form.TextArea name="bio" control={control} placeholder="Tell us about yourself…" />`,
        maxLength: `<Form.Label for="description">Description</Form.Label>
<Form.TextArea
    name="description"
    control={control}
    placeholder="Describe the item…"
    maxLength={255}
    rows={5}
/>`,
    },
    RadioButton: {
        basic: `<Form.Label for="role">Role</Form.Label>
<div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
    <div>
        <Form.Label for="roleAdmin">Admin</Form.Label>
        <Form.RadioButton
            name="role"
            control={control}
            value="admin"
            onChange={() => {}}
        />
    </div>
    <div>
        <Form.Label for="roleUser">User</Form.Label>
        <Form.RadioButton
            name="role"
            control={control}
            value="user"
            onChange={() => {}}
        />
    </div>
</div>`,
        boolean: `<Form.Label for="hasParent">Has Parent</Form.Label>
<div style={{ display: 'flex', gap: 16 }}>
    <div>
        <Form.Label for="no">No</Form.Label>
        <Form.RadioButton name="hasParent" control={control} value={false}
            onChange={() => setShowInput(false)} />
    </div>
    <div>
        <Form.Label for="yes">Yes</Form.Label>
        <Form.RadioButton name="hasParent" control={control} value={true}
            onChange={() => setShowInput(true)} />
    </div>
</div>`,
    },
    SearchInput: {
        basic: `const options = [
    { label: 'React', value: 'react' },
    { label: 'Vue', value: 'vue' },
    { label: 'Angular', value: 'angular' },
    { label: 'Svelte', value: 'svelte' },
]

<Form.SearchInput
    name="framework"
    control={control}
    options={options}
    placeholder="Select framework"
    highlightMatch
    onSelect={(option) => setValue('framework', option.label)}
/>`,
        icons: `const options = [
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
    onSelect={(option) => setValue('type', option.label)}
/>`,
    },
    FullForm: {
        demo: `const { control, handleSubmit, setValue } = useForm({
    defaultValues: { name: '', email: '', bio: '', role: 'user' },
})

<Form onSubmit={handleSubmit(onSubmit)}>
    <fieldset>
        <Form.Label for="name">Name</Form.Label>
        <Form.Input name="name" control={control} type="text" />
    </fieldset>
    <fieldset>
        <Form.Label for="email">Email</Form.Label>
        <Form.Input name="email" control={control} type="email" />
    </fieldset>
    <fieldset>
        <Form.Label for="bio">Bio</Form.Label>
        <Form.TextArea name="bio" control={control} maxLength={200} />
    </fieldset>
    <fieldset>
        <Form.Label for="role">Role</Form.Label>
        <Form.RadioButton name="role" control={control} value="admin" onChange={() => {}} />
        <Form.RadioButton name="role" control={control} value="user" onChange={() => {}} />
    </fieldset>
    <button type="submit">Submit</button>
</Form>`,
    },
}
