/** Namespace of commonly-used regular expressions. */
export const Regexp = {
    /** Matches a Mongo `ObjectId`: exactly 24 lowercase hexadecimal characters. */
    ObjectId: /^[0-9a-f]{24}$/,

    /** Escapes regex-special characters so they are matched literally.
     * @example
     * escape('a.b') // 'a\\.b'
     */
    escape: (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),

    /** Builds a case-insensitive exact-match (`^…$`, `i`) regex for `word`, treating every
     * character as a literal (regex-special chars are escaped).
     * @example
     * exactWord('a.b').test('a.b')  // true
     * exactWord('a.b').test('axb')  // false
     */
    exactWord: (word: string) => new RegExp(`^${Regexp.escape(word)}$`, 'i'),
}
