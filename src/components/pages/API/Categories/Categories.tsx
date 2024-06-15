import { useAppContext } from '../../../../context/AppContext'
import Page from '../../../sharedComponents/Page/Page'
import Nav from '../Nav/Nav'
import MobileMenu from '../MobileMenu/MobileMenu'
import { useState } from 'react'
import { Submenu } from '../Nav'
import SubmenuPanel from '../Nav/SubmenuPanel/SubmenuPanel'
import {
    SearchInputOption,
    WrappedInput,
    WrappedSearchInput,
} from '../../../sharedComponents/WrappedFormComponents/WrappedFormComponents'
import { useForm } from 'react-hook-form'
import '../common/Form.scss'
import './Categories.scss'
import { icons } from './icons'
import { colors } from './colors'
import { CategoriesFormData, categoriesSchema } from '.'
import { yupResolver } from '@hookform/resolvers/yup'
import { usePostCategory } from './Categories.queries'
import LoadingIndicator from '../../../sharedComponents/LoadingIndicator/LoadingIndicator'

interface CategoriesProps {
    path: string
}

const iconOptions: SearchInputOption[] = Object.keys(icons)
    .map((icon) => ({
        name: icon,
        icon: icons[icon],
        value: icon,
    }))
    .sort((a: SearchInputOption, b: SearchInputOption) =>
        a.name.localeCompare(b.name),
    )

const colorOptions: SearchInputOption[] = Object.keys(colors)
    .map((color) => ({
        name: color,
        icon: colors[color],
        value: color,
    }))
    .sort((a: SearchInputOption, b: SearchInputOption) =>
        a.name.localeCompare(b.name),
    )

const Categories = ({ path }: CategoriesProps) => {
    const { mobileMenuVisible } = useAppContext()
    const [submenuStack, setSubmenuStack] = useState<Submenu[]>([])

    const { control, setValue, handleSubmit } = useForm<CategoriesFormData>({
        defaultValues: {
            name: '',
            description: '',
            icon: '',
            color: '',
        },
        resolver: yupResolver(categoriesSchema),
    })

    const { mutate: postCategory, ...categoryRequest } = usePostCategory()

    const submitHandler = (formData: CategoriesFormData) => {
        postCategory(formData)
    }

    return (
        <Page
            title={'Tivadar Debnar | Categories'}
            path={path}
            recordVisit={false}
            loginRequired={true}
        >
            <Nav
                pageName="Categories"
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
            {mobileMenuVisible && <MobileMenu pageName="Categories" />}
            <main className="Categories">
                <h1>Categories</h1>
                <p>
                    You can set a wide range of categories for your activities.
                    Please note that each tasks and activities must have a
                    category assigned to, and optionally, you set categories for
                    your events as well.
                </p>
                <h2>Create a new category</h2>
                <p>
                    Each category must have a name, a description, an icon and
                    colour. If you don't set your colour, it will be assigned a
                    random one.
                </p>
                <div className="form-container">
                    <form onSubmit={handleSubmit(submitHandler)}>
                        <fieldset>
                            <label htmlFor="categoryName">Name</label>
                            <WrappedInput
                                name="name"
                                control={control}
                                type="text"
                                placeholder="Displayed name"
                            />
                        </fieldset>
                        <fieldset>
                            <label htmlFor="description">Description</label>
                            <WrappedInput
                                name="description"
                                control={control}
                                type="text"
                                placeholder="What do you use this category for"
                            />
                        </fieldset>
                        <fieldset>
                            <label htmlFor="icon">Icon</label>
                            <WrappedSearchInput
                                name="icon"
                                control={control}
                                options={iconOptions}
                                placeholder="Select an icon"
                                highlightMatch
                                onSelect={(value: string) =>
                                    setValue('icon', value)
                                }
                            />
                        </fieldset>
                        <fieldset>
                            <label htmlFor="color">Colour</label>
                            <WrappedSearchInput
                                name="color"
                                control={control}
                                options={colorOptions}
                                placeholder="Select a color"
                                highlightMatch
                                onSelect={(value: string) =>
                                    setValue('color', value)
                                }
                            />
                        </fieldset>
                        <LoadingIndicator show={categoryRequest.isPending} />
                        {categoryRequest.error && (
                            <p className="submit-error-message">
                                {categoryRequest.error.message}
                            </p>
                        )}
                        {categoryRequest.isSuccess && (
                            <p className="submit-success-message">
                                Category submitted
                            </p>
                        )}
                        <button name="submit" type="submit">
                            Submit
                        </button>
                    </form>
                </div>
                <h2>See the list of categories</h2>
            </main>
        </Page>
    )
}

export default Categories
