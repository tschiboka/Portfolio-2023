import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Form, LoadingIndicator, Table, type SearchInputOption } from '@common-ux'
import { ClientMessage, errorMessage } from '@common-utils'
import type { GetCategoryResponse } from '@common-types'
import { Screen } from '@shared-components/Screen/Screen'
import { CategoriesColumns } from './Categories.columns'
import { CategoriesDefaults } from './Categories.defaults'
import { CategoriesHandlers } from './Categories.handlers'
import { CategoriesOptions } from './Categories.options'
import { CategoriesQueries } from './Categories.queries'
import { CategoriesSchema } from './Categories.schema'
import { CategoriesTransformers } from './Categories.transformers'
import type { CategoryFormData } from './Categories.types'
import './Categories.styles.scss'

type CategoriesProps = { path: string }

export const Categories = ({ path }: CategoriesProps) => {
    const [showParentInput, setShowParentInput] = useState(false)
    const { data: categories, ...categoriesGetRequest } = CategoriesQueries.useGet()
    const parentOptions = CategoriesTransformers.fromApi(categories?.data || [])

    const { control, setValue, handleSubmit, reset, resetField } = useForm<CategoryFormData>({
        defaultValues: CategoriesDefaults,
        resolver: yupResolver(CategoriesSchema.schema(parentOptions.map(({ label }) => label))),
        mode: 'onChange',
    })

    const { mutateAsync: postCategory, ...categoryPostRequest } = CategoriesQueries.usePost({
        onSuccess: () => reset(),
    })

    return (
        <Screen
            title="tschiboka | Categories"
            path={path}
            loginRequired
            variant="app"
            pageName="Categories"
        >
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
                    <Form
                        onSubmit={handleSubmit(
                            CategoriesHandlers.submit({ parentOptions, postCategory }),
                        )}
                        ariaLabel="Category form"
                    >
                        <Form.Fieldset>
                            <Form.Label for="name">Name</Form.Label>
                            <Form.Input
                                name="name"
                                control={control}
                                type="text"
                                placeholder="Displayed name"
                            />
                        </Form.Fieldset>
                        <Form.Fieldset>
                            <Form.Label for="description">Description</Form.Label>
                            <Form.TextArea
                                name="description"
                                control={control}
                                placeholder="What do you use this category for"
                                maxLength={255}
                            />
                        </Form.Fieldset>
                        <Form.Fieldset>
                            <Form.Checkbox
                                name="hasParent"
                                control={control}
                                label="Has Parent"
                                onChange={(checked) => {
                                    if (!checked) resetField('parent')
                                    setShowParentInput(checked)
                                }}
                            />
                        </Form.Fieldset>
                        {showParentInput && (
                            <Form.Fieldset>
                                <Form.Label for="parent" className="hide--small-screen">
                                    Parent
                                </Form.Label>
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
                            </Form.Fieldset>
                        )}
                        <Form.Fieldset>
                            <Form.Label for="icon">Icon</Form.Label>
                            <Form.SearchInput
                                name="icon"
                                control={control}
                                options={CategoriesOptions.iconOptions}
                                placeholder="Select an icon"
                                highlightMatch
                                onSelect={(option: SearchInputOption) => {
                                    setValue('icon', option.label)
                                }}
                            />
                        </Form.Fieldset>
                        <Form.Fieldset>
                            <Form.Label for="color">Colour</Form.Label>
                            <Form.SearchInput
                                name="color"
                                control={control}
                                options={CategoriesOptions.colorOptions}
                                placeholder="Select a color"
                                highlightMatch
                                onSelect={(option: SearchInputOption) => {
                                    setValue('color', option.label)
                                }}
                                colorSelection={true}
                            />
                        </Form.Fieldset>
                        <LoadingIndicator show={categoryPostRequest.isPending} />
                        {categoryPostRequest.error && (
                            <Form.SubmitErrorMessage
                                text={errorMessage(
                                    categoryPostRequest.error,
                                    ClientMessage.Failure.Create('category'),
                                )}
                            />
                        )}
                        {categoriesGetRequest.error && (
                            <Form.SubmitErrorMessage
                                text={errorMessage(
                                    categoriesGetRequest.error,
                                    ClientMessage.Failure.Fetch('categories'),
                                )}
                            />
                        )}
                        {categoryPostRequest.isSuccess && (
                            <Form.SubmitErrorMessage
                                text={ClientMessage.Success.Created('category')}
                                variant="success"
                            />
                        )}
                        <Form.ButtonGroup>
                            <Form.Button variant="secondary" onClick={() => reset()}>
                                Reset
                            </Form.Button>
                            <Form.Button type="submit" disabled={categoriesGetRequest.isLoading}>
                                Submit
                            </Form.Button>
                        </Form.ButtonGroup>
                    </Form>
                </div>
                <Table<GetCategoryResponse, unknown>
                    title="See the list of categories"
                    id="categories-table"
                    ariaLabel="Categories table"
                    data={categories?.data || []}
                    columns={CategoriesColumns}
                />
            </main>
        </Screen>
    )
}
