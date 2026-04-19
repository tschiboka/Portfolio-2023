import { useAppContext } from '../../../../context/AppContext/App.context'
import Page from '../../../sharedComponents/Page/Page'
import Nav from '../Nav/Nav'
import MobileMenu from '../MobileMenu/MobileMenu'
import { useState } from 'react'
import { Submenu } from '../Nav'
import SubmenuPanel from '../Nav/SubmenuPanel/SubmenuPanel'
import { useForm } from 'react-hook-form'
import './Categories.scss'
import { CategoryFormData, categoriesSchema } from '.'
import { yupResolver } from '@hookform/resolvers/yup'
import { useGetCategories, usePostCategory } from './Categories.queries'
import LoadingIndicator from '../../../sharedComponents/LoadingIndicator/LoadingIndicator'
import { getErrorMessage } from '../common/error'
import { getParents } from './Categories.transformers'
import { Form, SearchInputOption } from '@common/ux'
import { colorOptions, iconOptions } from './Categories.utils'
import { Table } from '@common/ux/Table'
import { GetCategoryResponse } from '@common/types'
import { columns } from './Categories.columns'

type CategoriesProps = {
    path: string
}

const Categories = ({ path }: CategoriesProps) => {
    const { mobileMenuVisible } = useAppContext()
    const [submenuStack, setSubmenuStack] = useState<Submenu[]>([])

    const [showParentInput, setShowParentInput] = useState(false)
    const { data: categories, ...categoriesGetRequest } = useGetCategories()
    const parentOptions = getParents.fromApi(categories?.data || [])

    const { control, setValue, handleSubmit, reset, resetField } = useForm<CategoryFormData>({
        defaultValues: {
            name: '',
            description: '',
            parent: '',
            hasParent: false,
            icon: '',
            color: '',
        },
        resolver: yupResolver(categoriesSchema(parentOptions.map(({ label }) => label))),
        mode: 'onChange',
    })

    const { mutateAsync: postCategory, ...categoryPostRequest } = usePostCategory({
        onSuccess: () => reset(),
    })

    const submitHandler = async (formData: CategoryFormData) => {
        const parentId = parentOptions.find(({ label }) => label === formData.parent)?.value

        await postCategory({
            name: formData.name,
            description: formData.description,
            icon: formData.icon,
            color: formData.color,
            parentId,
        })
    }

    return (
        <Page title={'Tivadar Debnar | Categories'} path={path} recordVisit={false} loginRequired>
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
                    You can set a wide range of categories for your activities. Please note that
                    each tasks and activities must have a category assigned to, and optionally, you
                    set categories for your events as well.
                </p>
                <h2>Create a new category</h2>
                <p>
                    Each category must have a name, a description, an icon and colour. If you don't
                    set your colour, it will be assigned a random one. Your category may also be a
                    parent of other categories, be a child category, or a standalone.
                </p>
                <div className="form-container">
                    <form onSubmit={handleSubmit(submitHandler)}>
                        <fieldset>
                            <Form.Label for="categoryName">Name</Form.Label>
                            <Form.Input
                                name="name"
                                control={control}
                                type="text"
                                placeholder="Displayed name"
                            />
                        </fieldset>
                        <fieldset>
                            <Form.Label for="description">Description</Form.Label>
                            <Form.TextArea
                                name="description"
                                control={control}
                                placeholder="What do you use this category for"
                                maxLength={255}
                            />
                        </fieldset>
                        <fieldset className="parent-radio">
                            <Form.Label for="hasParent">Has Parent</Form.Label>
                            <div>
                                <div>
                                    <Form.Label for="hasParentNo">No</Form.Label>
                                    <Form.RadioButton
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
                                    <Form.Label for="hasParentYes">Yes</Form.Label>
                                    <Form.RadioButton
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
                                <Form.Label
                                    for="parent"
                                    className="hide--small-screen"
                                ></Form.Label>
                                <Form.SearchInput
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
                            <Form.Label for="icon">Icon</Form.Label>
                            <Form.SearchInput
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
                            <Form.Label for="color">Colour</Form.Label>
                            <Form.SearchInput
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
                        <LoadingIndicator show={categoryPostRequest.isPending} />
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
                <Table<GetCategoryResponse, unknown>
                    id="categories-table"
                    title="See the list of categories"
                    ariaLabel="Categories table"
                    data={categories?.data || []}
                    columns={columns}
                />
                {/* <h2>See the list of categories</h2> */}
                {/* <table>
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
                            ({ _id, icon, name, status, color, parentId, description }) => (
                                <>
                                    <tr key={_id}>
                                        <td className="sm">
                                            <div className="icon" style={{ borderColor: color }}>
                                                {icons[icon]}
                                            </div>
                                        </td>
                                        <td className="sm">{name}</td>
                                        <td className="sm">{status}</td>
                                        <td className={`md icon ${parentId ? 'green' : 'red'}`}>
                                            {parentId ? icons['check'] : icons['cancel']}
                                        </td>
                                        <td className="hide">{description}</td>
                                        <td className="sm icon">{icons['expand_more']}</td>
                                    </tr>
                                    <tr className={'row-expand expanded'}>
                                        <td></td>
                                    </tr>
                                </>
                            ),
                        )}
                    </tbody>
                </table> */}
            </main>
        </Page>
    )
}

export default Categories
