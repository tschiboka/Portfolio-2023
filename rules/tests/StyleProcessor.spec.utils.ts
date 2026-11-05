import { styleProcessor } from '../styleProcessor'

/**
 * Reads the first processed line as a value: it is an object literal of two strings, so it
 * parses as JSON once the wrapping parentheses go. `void 0` reads as `undefined`.
 */
const read = (source: string): unknown => {
    const [block] = styleProcessor.preprocess(source)
    const [line = ''] = block.split('\n')
    const trimmed = line.trim()

    if (trimmed === 'void 0;') return undefined

    return JSON.parse(trimmed.replace(/^\(\{/, '{').replace(/\}\);$/, '}')) as unknown
}

export const StyleProcessorTestUtils = { read }
