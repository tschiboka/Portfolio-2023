import { screen } from '@testing-library/react'
import { CategoriesMocks } from './Categories.mocks'
import { CategoriesMockHandlers } from './Categories.mockHandlers'
import { CategoriesTestUtils } from './Categories.spec.utils'

const { fields, buttons, messages } = CategoriesTestUtils.labels

describe('Categories', () => {
    describe('Layout', () => {
        it('renders the feature heading and description', async () => {
            await CategoriesTestUtils.customRender()
            expect(
                screen.getByRole('heading', { name: CategoriesTestUtils.labels.heading }),
            ).toBeDefined()
            expect(screen.getByText(/wide range of categories/i)).toBeDefined()
        })

        it('renders the create-category form fields', async () => {
            const { form } = await CategoriesTestUtils.customRender()
            expect(form.Input(fields.name).Get.value()).toBeDefined()
            expect(form.Input(fields.description).Get.value()).toBeDefined()
            expect(form.Search(fields.icon)).toBeDefined()
            expect(form.Search(fields.color)).toBeDefined()
        })

        it('renders the reset and submit buttons', async () => {
            const { form } = await CategoriesTestUtils.customRender()
            expect(form.Button(buttons.reset)).toBeDefined()
            expect(form.Button(buttons.submit)).toBeDefined()
        })

        it('hides the parent input until the Has Parent checkbox is toggled', async () => {
            const { form } = await CategoriesTestUtils.customRender()
            expect(form.Has.fieldset(fields.parent)).toBe(false)
        })
    })

    describe('Data table', () => {
        it('renders the fetched categories in the table', async () => {
            await CategoriesTestUtils.customRender()
            expect(await screen.findByText(CategoriesMocks.categories[0].name)).toBeDefined()
            expect(screen.getByText(CategoriesMocks.categories[1].name)).toBeDefined()
        })

        it('renders the categories table title', async () => {
            await CategoriesTestUtils.customRender()
            expect(screen.getByText(CategoriesTestUtils.labels.table.title)).toBeDefined()
        })
    })

    describe('Parent selection', () => {
        it('reveals the parent search input when Has Parent is checked', async () => {
            const { form } = await CategoriesTestUtils.customRender()
            await form.Checkbox(fields.hasParent).Do.click()
            expect(form.Search(fields.parent)).toBeDefined()
        })
    })

    describe('Submission', () => {
        it('shows a success message after posting a category', async () => {
            const { form } = await CategoriesTestUtils.customRender()
            await CategoriesTestUtils.fillValidCategory(form)
            await form.Do.submit()
            expect(await form.Wait.byText(messages.success)).toBeDefined()
        })

        it('shows an error message when the category post fails', async () => {
            const { form } = await CategoriesTestUtils.customRender([
                CategoriesMockHandlers.get,
                CategoriesMockHandlers.postError('Nope'),
            ])
            await CategoriesTestUtils.fillValidCategory(form)
            await form.Do.submit()
            expect(await form.Wait.byText('Nope')).toBeDefined()
        })
    })
})
