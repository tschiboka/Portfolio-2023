import { buildTs } from '../build-tokens.js'

/** A colour body line: a quoted string, an identifier or a plain index, then a string value. */
const colourLine = /^ {8}('[^']+'|[A-Za-z_$][\w$]*|\d+): '.+',$/

/** The colour body lines a TypeScript mirror carries. */
const bodyOf = () =>
    buildTs()
        .split('\n')
        .filter((line) => line.startsWith('        '))

export const BuildTokensTestUtils = { colourLine, bodyOf }
