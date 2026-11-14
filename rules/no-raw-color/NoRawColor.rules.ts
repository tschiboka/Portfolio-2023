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
import { isDefined, isNull } from '../../common/utils/Predicate/Predicate.js'
import type { Rule } from 'eslint'
import type { Defined } from '../../common/utils/Generics/Generics.types.js'

type PropertyNode = Parameters<Defined<Rule.NodeListener['Property']>>[0]

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

    if (isDefined(keyword)) return !isPaletteName(keyword)
    if (Css.hasColor(value)) return true

    return Css.getTokenNames(value).some((token) => !isKnownColour(token))
}

const shouldReport = (value: string): boolean => {
    const checked = CheckedValues.get(value)
    if (isDefined(checked)) return checked

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
                if (isNull(property) || !Css.isProperty(property)) return

                const value = getString(node.value)

                if (isNull(value)) return
                if (shouldReport(value)) context.report({ message: ErrorMessage, node })
            }

            return { Property: check }
        },
    } satisfies Rule.RuleModule,
}

export const Rules = { Eslint }
