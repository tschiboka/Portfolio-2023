import { screen } from '@testing-library/react'
import { CategoriesMocks } from './Categories.mocks'
import { CategoriesMockHandlers } from './Categories.mockHandlers'
import { CategoriesTestUtils } from './Categories.spec.utils'

const { fields, buttons, messages } = CategoriesTestUtils.labels

describe('Categories', () => {
    describe('Layout', () => {
        it('should render the feature heading and description', async () => {
            await CategoriesTestUtils.customRender()
            expect(
                screen.getByRole('heading', { name: CategoriesTestUtils.labels.heading }),
            ).toBeDefined()
            expect(screen.getByText(/wide range of categories/i)).toBeDefined()
        })

        it('should render the create-category form fields', async () => {
            const { form } = await CategoriesTestUtils.customRender()
            expect(form.Input(fields.name).Get.value()).toBeDefined()
            expect(form.Input(fields.description).Get.value()).toBeDefined()
            expect(form.Search(fields.icon)).toBeDefined()
            expect(form.Search(fields.color)).toBeDefined()
        })

        it('should render the reset and submit buttons', async () => {
            const { form } = await CategoriesTestUtils.customRender()
            expect(form.Button(buttons.reset)).toBeDefined()
            expect(form.Button(buttons.submit)).toBeDefined()
        })

        it('should hide the parent input until the Has Parent checkbox is toggled', async () => {
            const { form } = await CategoriesTestUtils.customRender()
            expect(form.Has.fieldset(fields.parent)).toBe(false)
        })
    })

    describe('Data table', () => {
        it('should render the fetched categories in the table', async () => {
            await CategoriesTestUtils.customRender()
            expect(await screen.findByText(CategoriesMocks.categories[0].name)).toBeDefined()
            expect(screen.getByText(CategoriesMocks.categories[1].name)).toBeDefined()
        })

        it('should render the categories table title', async () => {
            await CategoriesTestUtils.customRender()
            expect(screen.getByText(CategoriesTestUtils.labels.table.title)).toBeDefined()
        })
    })

    describe('Parent selection', () => {
        it('should reveal the parent search input when Has Parent is checked', async () => {
            const { form } = await CategoriesTestUtils.customRender()
            await form.Checkbox(fields.hasParent).Do.click()
            expect(form.Search(fields.parent)).toBeDefined()
        })
    })

    describe('Submission', () => {
        it('should show a success message after posting a category', async () => {
            const { form } = await CategoriesTestUtils.customRender()
            await CategoriesTestUtils.fillValidCategory(form)
            await form.Do.submit()
            expect(await form.Wait.byText(messages.success)).toBeDefined()
        })

        it('should show an error message when the category post fails', async () => {
            const { form } = await CategoriesTestUtils.customRender([
                CategoriesMockHandlers.Get,
                CategoriesMockHandlers.PostRejected,
            ])
            await CategoriesTestUtils.fillValidCategory(form)
            await form.Do.submit()
            expect(await form.Wait.byText('Nope')).toBeDefined()
        })
    })
})
