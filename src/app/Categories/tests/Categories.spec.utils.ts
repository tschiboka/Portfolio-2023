import { waitFor } from '@testing-library/react'
import { Test } from '@shared-components/Screen/tests'
import { ClientMessage } from '@common-utils'
import { CategoriesMockHandlers } from './Categories.mockHandlers'
import { AppRoutes } from '../../../app'
import type { Buildable } from '@common-ux/Test/Server'

type CategoriesForm = ReturnType<typeof Test.Form>

export const CategoriesTestUtils = {
    labels: {
        form: 'Category form',
        heading: 'Categories',
        fields: {
            name: 'Name',
            description: 'Description',
            icon: 'Icon',
            color: 'Colour',
            parent: 'Parent',
            hasParent: 'Has Parent',
        },
        buttons: {
            reset: /Reset/,
            submit: /Submit/,
        },
        table: {
            title: 'See the list of categories',
            ariaLabel: 'Categories table',
        },
        messages: {
            success: ClientMessage.Success.Created('category'),
            postError: "Couldn't post category",
            fetchError: "Couldn't fetch categories",
        },
    },

    /** Renders the Categories screen behind the given handlers and returns the bound form. */
    customRender: async (
        handlers: Buildable[] = CategoriesMockHandlers.Defaults,
    ): Promise<{ form: CategoriesForm }> => {
        Test.Screen.Do.render({
            path: AppRoutes.Categories,
            handlers,
            session: { session: { token: 'mock-jwt-token' } },
        })

        await waitFor(() => expect(Test.LoadingIndicator.Has.isLoading()).toBe(false))

        return { form: Test.Form('Category form') }
    },

    /** Fills every required field so the form passes validation before submit. */
    fillValidCategory: async (form: CategoriesForm) => {
        const { fields } = CategoriesTestUtils.labels
        await form.Input(fields.name).Do.type('Sub')
        await form.Input(fields.description).Do.type('A sub category')
        await form.Search(fields.icon).Do.selectOption('cir', 'circle')
        await form.Search(fields.color).Do.selectOption('blu', 'blue')
    },
}
