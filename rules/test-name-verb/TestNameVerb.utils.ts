type CalleeLike = {
    type: string
    name?: string
    callee?: CalleeLike
    object?: CalleeLike
    property?: CalleeLike
}

type ArgumentLike = {
    type: string
    value?: unknown
    quasis?: { value?: { cooked?: string | null } }[]
}

/**
 * Reads the name a test block is declared under — `it`, `test`, or the `.each` form of either —
 * or `null` where the call opens no test.
 *
 * `test` is recognised rather than ignored: a name nobody checks is a name that drifts back.
 * The `.each` form puts a call in the callee — `it.each(rows)(name, fn)` — so the search steps
 * through it rather than reading the row list as the name.
 */
export const getTestName = (callee: CalleeLike): string | null => {
    if (callee.type === 'CallExpression') {
        return callee.callee ? getTestName(callee.callee) : null
    }

    if (callee.type === 'MemberExpression') {
        return callee.property?.name === 'each' && callee.object
            ? getTestName(callee.object)
            : null
    }

    if (callee.type !== 'Identifier') return null

    return callee.name === 'it' || callee.name === 'test' ? callee.name : null
}

/**
 * Reads a test name, or `null` where it is not written out.
 *
 * A template is read from its first chunk, so `it.each` still carries the literal opening while
 * its placeholders sit behind it. A name passed as a binding cannot be read at all, and a rule
 * that guessed would report correct code.
 */
export const getNameText = (argument: ArgumentLike | undefined): string | null => {
    if (argument?.type === 'Literal')
        return typeof argument.value === 'string' ? argument.value : null

    if (argument?.type === 'TemplateLiteral') return argument.quasis?.[0]?.value?.cooked ?? null

    return null
}

/** Answers whether a test name carries the mandated opening. */
export const isTestName = (name: string): boolean => name.startsWith('should ')
