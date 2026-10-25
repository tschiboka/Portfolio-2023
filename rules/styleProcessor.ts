import type { Linter } from 'eslint'

/** A declaration line — `property: value`, the value stopping before `;`, `{` or `}`. */
const declarationLine = /^\s*(?<property>-{0,2}[a-zA-Z][\w-]*)\s*:\s*(?<value>[^;{}]+?)\s*;?\s*$/

/** A media query line — `@media <query>`, the closing brace optional. */
const mediaLine = /^\s*@media\s+(?<query>[^{]+?)\s*\{?\s*$/

/** A line break, LF or CRLF — splitting on LF alone leaves a carriage return in the value. */
const lineBreak = /\r?\n/

/** A SCSS line comment, which needs whitespace before it so `url(https://…)` survives. */
const trailingComment = /\s+\/\/.*$/

const quote = (value: string): string => `"${value.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`

/**
 * Reads a stylesheet as JavaScript so a rule can inspect its declarations.
 *
 * One output line per input line, so a reported line number still points at the stylesheet.
 * Every `property: value` line becomes `({ "<property>": "<value>" })`, a media query becomes
 * `({ "@media": "<query>" })`, and everything else becomes `void 0;` — the same shape a TS
 * styles object has, so one rule reads both surfaces. The processor names no styling property:
 * a rule matches the one it owns. `@media` is structural rather than a property, so its key is
 * fixed and exported. A trailing `//` comment is dropped first, so a value never carries it.
 */
export const MediaQueryKey = '@media'

export const styleProcessor = {
    meta: { name: 'standards-style', version: '1.0.0' },
    preprocess: (text: string): string[] => [
        text
            .split(lineBreak)
            .map((line) => {
                const source = line.replace(trailingComment, '')
                const groups = declarationLine.exec(source)?.groups
                if (groups) return `({ ${quote(groups.property)}: ${quote(groups.value)} });`

                const media = mediaLine.exec(source)?.groups
                if (media) return `({ ${quote(MediaQueryKey)}: ${quote(media.query)} });`

                return 'void 0;'
            })
            .join('\n'),
    ],
    postprocess: (messagesByBlock: Linter.LintMessage[][]): Linter.LintMessage[] =>
        messagesByBlock.flat(),
}
