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
    WrappedRadioButton,
    WrappedSearchInput,
    WrappedTextArea,
} from '../../../sharedComponents/WrappedFormComponents/WrappedFormComponents'
import { useForm } from 'react-hook-form'
import '../common/Form.scss'
import '../common/Table.scss'
import './Categories.scss'
import { icons } from './icons'
import { colors } from './colors'
import { CategoryFormData, categoriesSchema } from '.'
import { yupResolver } from '@hookform/resolvers/yup'
import { useGetCategories, usePostCategory } from './Categories.queries'
import LoadingIndicator from '../../../sharedComponents/LoadingIndicator/LoadingIndicator'
import { getErrorMessage } from '../common/error'
import { getParents } from './Categories.transformers'

type CategoriesProps = {
    path: string
}

const iconOptions: SearchInputOption[] = Object.keys(icons)
    .map((icon) => ({
        label: icon,
        icon: icons[icon],
        value: icon,
    }))
    .sort((a: SearchInputOption, b: SearchInputOption) =>
        a.label.localeCompare(b.label),
    )

const colorOptions: SearchInputOption[] = Object.keys(colors)
    .map((color) => ({
        label: color,
        icon: colors[color],
        value: color,
    }))
    .sort((a: SearchInputOption, b: SearchInputOption) =>
        a.label.localeCompare(b.label),
    )

const Categories = ({ path }: CategoriesProps) => {
    const { mobileMenuVisible } = useAppContext()
    const [submenuStack, setSubmenuStack] = useState<Submenu[]>([])

    const [showParentInput, setShowParentInput] = useState(false)
    const { data: categories, ...categoriesGetRequest } = useGetCategories()
    const parentOptions = getParents.fromApi(
        categories?.data.filter((category) => category.isParent) || [],
    )

    const { control, setValue, handleSubmit, reset, resetField } =
        useForm<CategoryFormData>({
            defaultValues: {
                name: '',
                description: '',
                isParent: false,
                parent: '',
                hasParent: false,
                icon: '',
                color: '',
            },
            resolver: yupResolver(
                categoriesSchema(parentOptions.map(({ label }) => label)),
            ),
            mode: 'onChange',
        })

    const { mutateAsync: postCategory, ...categoryPostRequest } =
        usePostCategory({
            onSuccess: () => reset(),
        })

    const submitHandler = async (formData: CategoryFormData) => {
        const parentId = parentOptions.find(
            ({ label }) => label === formData.parent,
        )?.value

        await postCategory({
            name: formData.name,
            isParent: formData.isParent,
            description: formData.description,
            icon: formData.icon,
            color: formData.color,
            parentId,
        })
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
                    random one. Your category may also be a parent of other
                    categories, be a child category, or a standalone.
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
                            <WrappedTextArea
                                name="description"
                                control={control}
                                placeholder="What do you use this category for"
                                maxLength={255}
                            />
                        </fieldset>
                        <fieldset className="parent-radio">
                            <label htmlFor="isParent">Is Parent</label>
                            <div>
                                <div>
                                    <label>No</label>
                                    <WrappedRadioButton
                                        name="isParent"
                                        control={control}
                                        value={false}
                                        onChange={() =>
                                            setValue('isParent', false)
                                        }
                                    />
                                </div>
                                <div>
                                    <label>Yes</label>
                                    <WrappedRadioButton
                                        name="isParent"
                                        control={control}
                                        value={true}
                                        onChange={() =>
                                            setValue('isParent', true)
                                        }
                                    />
                                </div>
                            </div>
                        </fieldset>
                        <fieldset className="parent-radio">
                            <label htmlFor="hasParent">Has Parent</label>
                            <div>
                                <div>
                                    <label>No</label>
                                    <WrappedRadioButton
                                        name="hasParent"
                                        control={control}
                                        value={false}
                                        onChange={() => {
                                            resetField('parent')
                                            setShowParentInput(false)
                                        }}
                                    />
                                </div>
                                <div>
                                    <label>Yes</label>
                                    <WrappedRadioButton
                                        name="hasParent"
                                        control={control}
                                        value={true}
                                        onChange={() => {
                                            setShowParentInput(true)
                                        }}
                                    />
                                </div>
                            </div>
                        </fieldset>
                        {showParentInput && (
                            <fieldset>
                                <label
                                    htmlFor="parent"
                                    className="hide--small-screen"
                                ></label>
                                <WrappedSearchInput
                                    options={parentOptions}
                                    name="parent"
                                    control={control}
                                    buttonIcon={'arrow'}
                                    highlightMatch
                                    onSelect={(option: SearchInputOption) =>
                                        setValue('parent', option.label)
                                    }
                                    placeholder="Select Parent"
                                />
                            </fieldset>
                        )}
                        <fieldset>
                            <label htmlFor="icon">Icon</label>
                            <WrappedSearchInput
                                name="icon"
                                control={control}
                                options={iconOptions}
                                placeholder="Select an icon"
                                highlightMatch
                                onSelect={(option: SearchInputOption) => {
                                    setValue('icon', option.label)
                                }}
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
                                onSelect={(option: SearchInputOption) => {
                                    setValue('color', option.label)
                                }}
                                colorSelection={true}
                            />
                        </fieldset>
                        <LoadingIndicator
                            show={categoryPostRequest.isPending}
                        />
                        {categoryPostRequest.error && (
                            <p className="submit-error-message submit-mes">
                                {getErrorMessage(
                                    categoryPostRequest.error,
                                    "Couldn't post category",
                                )}
                            </p>
                        )}
                        {categoriesGetRequest.error && (
                            <p className="submit-message submit-error-message">
                                {getErrorMessage(
                                    categoriesGetRequest.error,
                                    "Couldn't fetch categories",
                                )}
                            </p>
                        )}
                        {categoryPostRequest.isSuccess && (
                            <p className="submit-message">Category submitted</p>
                        )}
                        <div className="button-container">
                            <button
                                name="reset"
                                type="button"
                                className="secondary"
                                onClick={() => reset()}
                            >
                                Reset
                            </button>
                            <button
                                name="submit"
                                type="submit"
                                disabled={categoriesGetRequest.isLoading}
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
                <h2>See the list of categories</h2>
                <table>
                    <thead>
                        <tr>
                            <td className="sm"></td>
                            <td className="sm">Name</td>
                            <td className="sm">Status</td>
                            <td className="md">Parent</td>
                            <td className="md">Child</td>
                            <td className="hide">Description</td>
                            <td className="sm"></td>
                        </tr>
                    </thead>
                    <tbody>
                        {categories?.data.map(
                            ({
                                _id,
                                icon,
                                name,
                                status,
                                color,
                                isParent,
                                parentId,
                                description,
                            }) => (
                                <>
                                    <tr key={_id}>
                                        <td className="sm">
                                            <div
                                                className="icon"
                                                style={{ borderColor: color }}
                                            >
                                                {icons[icon]}
                                            </div>
                                        </td>
                                        <td className="sm">{name}</td>
                                        <td className="sm">{status}</td>
                                        <td
                                            className={`md icon ${
                                                isParent ? 'green' : 'red'
                                            }`}
                                        >
                                            {isParent
                                                ? icons['check']
                                                : icons['cancel']}
                                        </td>
                                        <td
                                            className={`md icon ${
                                                parentId ? 'green' : 'red'
                                            }`}
                                        >
                                            {parentId
                                                ? icons['check']
                                                : icons['cancel']}
                                        </td>
                                        <td className="hide">{description}</td>
                                        <td className="sm icon">
                                            {icons['expand_more']}
                                        </td>
                                    </tr>
                                    <tr className={'row-expand expanded'}>
                                        <td></td>
                                    </tr>
                                </>
                            ),
                        )}
                    </tbody>
                </table>
            </main>
        </Page>
    )
}

export default Categories
