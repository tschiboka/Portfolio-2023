import { useState } from 'react'
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
    bio: string
    description: string
    role: string
    hasParent: boolean
    framework: string
}

const defaults: DemoForm = {
    name: '',
    email: '',
    password: '',
    age: '',
    dob: '',
    bio: '',
    description: '',
    role: 'user',
    hasParent: false,
    framework: '',
}

const frameworkOptions = [
    { label: 'React', value: 'react' },
    { label: 'Vue', value: 'vue' },
    { label: 'Angular', value: 'angular' },
    { label: 'Svelte', value: 'svelte' },
    { label: 'Solid', value: 'solid' },
]

export const Forms = ({ path }: FormsProps) => {
    const { control, setValue } = useForm<DemoForm>({ defaultValues: defaults })
    const [revealPassword, setRevealPassword] = useState(false)

    return (
        <Page title={'Tivadar Debnar | Forms'} path={path} recordVisit={false} loginRequired>
            <main>
                <h1>Form</h1>
                <p>
                    The <code>Form</code> namespace groups all form-related primitives. Every input
                    component integrates with <code>react-hook-form</code> via{' '}
                    <code>Controller</code>, so you pass a <code>control</code> object and a{' '}
                    <code>name</code> to bind them to form state.
                </p>

                <section>
                    <h2>Form</h2>
                    <p>
                        A thin wrapper around <code>&lt;form&gt;</code> that forwards all native
                        form attributes and adds <code>ariaLabel</code>, <code>className</code> and{' '}
                        <code>style</code>.
                    </p>
                    <Code language="tsx" content={Snippets.FormElement.basic} />
                    <Code language="tsx" content={Snippets.FormElement.ariaLabel} />
                </section>

                <section>
                    <h2>Form.Label</h2>
                    <p>
                        A styled <code>&lt;label&gt;</code> with a <code>for</code> prop (mapped to{' '}
                        <code>htmlFor</code>). Applies the <code>form-label</code> class by default.
                    </p>
                    <fieldset style={{ border: 'none', padding: 0 }}>
                        <Form.Label for="demo-label">Example Label</Form.Label>
                    </fieldset>
                    <Code language="tsx" content={Snippets.Label.basic} />
                    <Code language="tsx" content={Snippets.Label.styled} />
                </section>

                <section>
                    <h2>Form.Input</h2>
                    <p>
                        A <code>Controller</code>-based input supporting types <code>text</code>,{' '}
                        <code>email</code>, <code>number</code>, <code>search</code>,{' '}
                        <code>tel</code>, <code>password</code> and <code>date</code>. Validation
                        errors from <code>react-hook-form</code> display automatically below the
                        field.
                    </p>

                    <Form ariaLabel="Input demos">
                        <fieldset>
                            <Form.Label for="name">Name</Form.Label>
                            <Form.Input
                                name="name"
                                control={control}
                                type="text"
                                placeholder="Enter name…"
                            />
                        </fieldset>

                        <fieldset>
                            <Form.Label for="email">Email</Form.Label>
                            <Form.Input
                                name="email"
                                control={control}
                                type="email"
                                autoComplete="email"
                            />
                        </fieldset>

                        <fieldset>
                            <Form.Label for="password">Password</Form.Label>
                            <Form.Input
                                name="password"
                                control={control}
                                type="password"
                                addRevealPasswordIcon
                                revealPassword={revealPassword}
                                setRevealPassword={setRevealPassword}
                            />
                        </fieldset>

                        <fieldset>
                            <Form.Label for="age">Age</Form.Label>
                            <Form.Input name="age" control={control} type="number" />
                        </fieldset>

                        <fieldset>
                            <Form.Label for="dob">Date of Birth</Form.Label>
                            <Form.Input name="dob" control={control} type="date" />
                        </fieldset>
                    </Form>

                    <Code language="tsx" content={Snippets.Input.text} />
                    <Code language="tsx" content={Snippets.Input.email} />
                    <Code language="tsx" content={Snippets.Input.password} />
                    <Code language="tsx" content={Snippets.Input.number} />
                    <Code language="tsx" content={Snippets.Input.date} />
                    <Code language="tsx" content={Snippets.Input.types} />
                </section>

                <section>
                    <h2>Form.TextArea</h2>
                    <p>
                        A <code>Controller</code>-based textarea. Set <code>maxLength</code> to show
                        a live character counter. The <code>rows</code> prop defaults to 3.
                    </p>

                    <Form ariaLabel="TextArea demos">
                        <fieldset>
                            <Form.Label for="bio">Bio</Form.Label>
                            <Form.TextArea
                                name="bio"
                                control={control}
                                placeholder="Tell us about yourself…"
                            />
                        </fieldset>

                        <fieldset>
                            <Form.Label for="description">Description</Form.Label>
                            <Form.TextArea
                                name="description"
                                control={control}
                                placeholder="Describe the item…"
                                maxLength={255}
                                rows={5}
                            />
                        </fieldset>
                    </Form>

                    <Code language="tsx" content={Snippets.TextArea.basic} />
                    <Code language="tsx" content={Snippets.TextArea.maxLength} />
                </section>

                <section>
                    <h2>Form.RadioButton</h2>
                    <p>
                        A <code>Controller</code>-based radio button. Pass a string or boolean{' '}
                        <code>value</code> and an <code>onChange</code> callback for side-effects
                        when the selection changes.
                    </p>
                    <Form ariaLabel="RadioButton demos">
                        <fieldset>
                            <Form.Label for="role">Role</Form.Label>
                            <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                    <Form.RadioButton
                                        name="role"
                                        control={control}
                                        value="admin"
                                        onChange={() => undefined}
                                    />
                                    <Form.Label for="roleAdmin">Admin</Form.Label>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                    <Form.RadioButton
                                        name="role"
                                        control={control}
                                        value="user"
                                        onChange={() => undefined}
                                    />
                                    <Form.Label for="roleUser">User</Form.Label>
                                </div>
                            </div>
                        </fieldset>
                    </Form>

                    <Code language="tsx" content={Snippets.RadioButton.basic} />
                    <Code language="tsx" content={Snippets.RadioButton.boolean} />
                </section>

                <section>
                    <h2>Form.SearchInput</h2>
                    <p>
                        A filterable dropdown select with <code>highlightMatch</code> support,
                        optional icons and colour selection. Opens on typing or clicking the toggle
                        icon. Closes on click-outside.
                    </p>
                    <Form ariaLabel="SearchInput demos">
                        <fieldset>
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
                        </fieldset>
                    </Form>

                    <Code language="tsx" content={Snippets.SearchInput.basic} />
                    <Code language="tsx" content={Snippets.SearchInput.icons} />
                </section>

                <section>
                    <h2>Full Form Example</h2>
                    <p>
                        Combine all sub-components inside <code>Form</code> with{' '}
                        <code>react-hook-form</code> for a complete form.
                    </p>
                    <Code language="tsx" content={Snippets.FullForm.demo} />
                </section>
            </main>
        </Page>
    )
}
