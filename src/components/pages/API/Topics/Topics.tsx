import { useAppContext } from '../../../../context/AppContext'
import Page from '../../../sharedComponents/Page/Page'
import Nav from '../Nav/Nav'
import MobileMenu from '../MobileMenu/MobileMenu'
import { ReactNode, useState } from 'react'
import { Submenu } from '../Nav'
import SubmenuPanel from '../Nav/SubmenuPanel/SubmenuPanel'
import {
    WrappedInput,
    WrappedSearchInput,
} from '../../../sharedComponents/WrappedFormComponents/WrappedFormComponents'
import { useForm } from 'react-hook-form'
import '../common/Form.scss'
import './Topics.scss'
import { icons } from './icons'

interface TopicsProps {
    path: string
}

type Option = { name: string; value: ReactNode }
const iconOptions: Option[] = Object.keys(icons)
    .map((icon) => ({
        name: icon,
        value: (
            <span className="option" key={icon}>
                {icons[icon]}
                <span style={{ marginLeft: '20px' }}>{icon}</span>
            </span>
        ),
    }))
    .sort((a: Option, b: Option) => a.name.localeCompare(b.name))
const Topics = ({ path }: TopicsProps) => {
    const { mobileMenuVisible } = useAppContext()
    const [submenuStack, setSubmenuStack] = useState<Submenu[]>([])

    const { control, setValue, handleSubmit } = useForm({
        defaultValues: {
            topicName: '',
            description: '',
            icon: '',
            color: '',
        },
        // resolver: yupResolver(loginSchema),
    })

    return (
        <Page
            title={'Tivadar Debnar | Topics'}
            path={path}
            recordVisit={false}
            loginRequired={true}
        >
            <Nav
                pageName="Topics"
                submenuStack={submenuStack}
                setSubmenuStack={setSubmenuStack}
            />
            {Boolean(submenuStack.length) && (
                <SubmenuPanel
                    key={submenuStack[0].parentLabel}
                    submenu={submenuStack[0]}
                    submenuStack={submenuStack}
                    setSubmenuStack={setSubmenuStack}
                    pageName="Stats"
                />
            )}
            {mobileMenuVisible && <MobileMenu pageName="Topics" />}
            <main className="Topics">
                <h1>Topics</h1>
                <p>
                    You can set a wide range of topics for your activities.
                    Please note that each tasks and activities must have a topic
                    assigned, and you can also set optional topics for your
                    events.
                </p>
                <h2>Create a new topic</h2>
                <p>
                    Each topic must have a name, a description, an icon and
                    colour. If you don't set your colour, it will be assigned a
                    random one.
                </p>
                <div className="form-container">
                    <form>
                        <fieldset>
                            <label htmlFor="topicName">Name</label>
                            <WrappedInput
                                name="topicName"
                                control={control}
                                type="text"
                            />
                        </fieldset>
                        <fieldset>
                            <label htmlFor="description">Description</label>
                            <WrappedSearchInput
                                name="description"
                                control={control}
                                options={iconOptions}
                                onSelect={(value: string) =>
                                    setValue('description', value)
                                }
                            />
                        </fieldset>
                        <fieldset>
                            <label htmlFor="icon">Icon</label>
                            <WrappedInput
                                name="icon"
                                control={control}
                                type="text"
                            />
                        </fieldset>
                        <fieldset>
                            <label htmlFor="color">Colour</label>
                            <WrappedInput
                                name="color"
                                control={control}
                                type="text"
                            />
                        </fieldset>
                        <button name="submit">Submit</button>
                    </form>
                </div>
                <h2>See the list of topics</h2>
            </main>
        </Page>
    )
}

export default Topics
