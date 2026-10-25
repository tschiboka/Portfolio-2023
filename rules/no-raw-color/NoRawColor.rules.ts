import { ErrorMessage } from './NoRawColor.constants.js'
import {
    getPropertyName,
    isKnownColour,
    isObjectPattern,
    isPaletteName,
    isShorthand,
    getString,
} from './NoRawColor.utils.js'
import { Css } from '../css.js'
import type { Rule } from 'eslint'

type PropertyNode = Parameters<NonNullable<Rule.NodeListener['Property']>>[0]

/**
 * Every value already checked, mapped to whether it breaks the rule.
 *
 * Parsing is the cost here, not the token lookup: a stylesheet repeats `display: flex` and `margin: 0`
 * hundreds of times, so caching by value keeps the work proportional to the vocabulary, not to the file.
 */
const CheckedValues = new Map<string, boolean>()

/** True when a value carries a raw colour, or names a colour the palette does not define. */
const hasColourViolation = (value: string): boolean => {
    const keyword = Css.getColorKeyword(value)

    if (keyword !== null) return !isPaletteName(keyword)
    if (Css.hasColor(value)) return true

    return Css.getTokenNames(value).some((token) => !isKnownColour(token))
}

const shouldReport = (value: string): boolean => {
    const checked = CheckedValues.get(value)
    if (checked !== undefined) return checked

    const violation = hasColourViolation(value)
    CheckedValues.set(value, violation)

    return violation
}

const Eslint = {
    NoRawColor9: {
        meta: {
            type: 'problem',
            docs: { description: ErrorMessage },
        },
        create(context) {
            const check = (node: PropertyNode): void => {
                if (isShorthand(node) || isObjectPattern(node)) return

                const property = getPropertyName(node)
                if (property === null || !Css.isProperty(property)) return

                const value = getString(node.value)

                if (value === null) return
                if (shouldReport(value)) context.report({ message: ErrorMessage, node })
            }

            return { Property: check }
        },
    } satisfies Rule.RuleModule,
}

export const Rules = { Eslint }
