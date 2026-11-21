import { isDefined, isRegExp, isString, isUndefined } from '@common-utils'
import { TestError } from '../Accessor'
import type { Matcher } from '@testing-library/react'
import type { Dictionary, Nullable } from '@common-utils'
import type { ElementRecipe } from './Harness.types'
import type { Scope } from '../Accessor'

/** The `All` member of each query family, so one path serves every kind and `index` always applies. */
const QueryFamilies: Dictionary<string> = {
    role: 'AllByRole',
    label: 'AllByLabelText',
    text: 'AllByText',
    placeholder: 'AllByPlaceholderText',
    altText: 'AllByAltText',
    title: 'AllByTitle',
    displayValue: 'AllByDisplayValue',
    testId: 'AllByTestId',
}

const getOptions = (options: Dictionary<unknown>): Dictionary<unknown> =>
    Object.fromEntries(Object.entries(options).filter(([, value]) => isDefined(value)))

/** The kind a recipe names — its only member that belongs to `QueryFamilies`. */
const getFamily = (recipe: ElementRecipe, context: string): string => {
    const family = Object.keys(QueryFamilies).find((candidate) => candidate in recipe)
    if (!family) throw TestError.notFound(context, 'a recipe kind')
    return family
}

const getArguments = (recipe: ElementRecipe, family: string): unknown[] =>
    'role' in recipe
        ? [recipe.role, getOptions({ name: recipe.name })]
        : [(recipe as unknown as Dictionary<unknown>)[family]]

const describeRecipe = (recipe: ElementRecipe): string =>
    Object.entries(recipe)
        .map(([key, value]) => `${key}=${String(value)}`)
        .join(' ')

const getMatches = (
    scope: Scope,
    recipe: ElementRecipe,
    mode: 'get' | 'query' | 'find',
): unknown => {
    const family = getFamily(recipe, 'Harness')
    const method = `${mode}${QueryFamilies[family] ?? family}`
    const run = (scope as unknown as Dictionary<(...args: unknown[]) => unknown>)[method]
    return run?.(...getArguments(recipe, family))
}

/** `index` picks the match, so a recipe naming the second row reads the same as one naming the first. */
const pick = (
    matches: HTMLElement[],
    recipe: ElementRecipe,
    context: string,
): Nullable<HTMLElement> => {
    if (isUndefined(recipe.index) && matches.length > 1)
        throw TestError.multiple(context, describeRecipe(recipe))
    return matches[recipe.index ?? 0] ?? null
}

/** A match passes when its text contains the string, or matches the expression. */
const matchesText = (element: HTMLElement, hasText: Matcher): boolean => {
    const content = element.textContent ?? ''
    if (isString(hasText)) return content.includes(hasText)
    return isRegExp(hasText) ? hasText.test(content) : content.includes(String(hasText))
}

/** `hasText` narrows every kind alike, and does so before `index` picks one. */
const keepMatching = (matches: HTMLElement[], recipe: ElementRecipe): HTMLElement[] => {
    const { hasText } = recipe
    return isDefined(hasText) ? matches.filter((element) => matchesText(element, hasText)) : matches
}

/**
 * The bridge between a recipe and the RTL query it names.
 *
 * Every method mirrors one RTL family, applies `hasText` and then `index`, so a harness declares
 * what an element is and never how to find it.
 */
export const HarnessUtils = {
    query: (
        scope: Scope,
        recipe: ElementRecipe,
        mode: 'get' | 'query',
        context: string,
    ): Nullable<HTMLElement> => {
        // The list family searches without throwing, so the harness owns the wording of an absence.
        const matches = keepMatching(getMatches(scope, recipe, 'query') as HTMLElement[], recipe)
        const match = pick(matches, recipe, context)
        if (match) return match
        if (mode === 'query') return null
        throw TestError.notFound(context, describeRecipe(recipe))
    },
    queryAll: (scope: Scope, recipe: ElementRecipe): HTMLElement[] =>
        keepMatching(getMatches(scope, recipe, 'query') as HTMLElement[], recipe),
    find: async (scope: Scope, recipe: ElementRecipe, context: string): Promise<HTMLElement> => {
        let found: HTMLElement[]
        try {
            found = (await getMatches(scope, recipe, 'find')) as HTMLElement[]
        } catch {
            found = []
        }
        const match = pick(keepMatching(found, recipe), recipe, context)
        if (match) return match
        throw TestError.notFound(context, describeRecipe(recipe))
    },
    findAll: async (scope: Scope, recipe: ElementRecipe): Promise<HTMLElement[]> =>
        keepMatching((await getMatches(scope, recipe, 'find')) as HTMLElement[], recipe),
}
