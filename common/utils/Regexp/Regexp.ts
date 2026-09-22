/** Namespace of commonly-used regular expressions. */
export const Regexp = {
    /** Matches a name-like value of letters, digits and whitespace only — no punctuation. */
    Alphanumeric: /^[a-zA-Z0-9\s]*$/,

    /** Matches a message-like value of letters, digits, whitespace and basic punctuation. */
    MessageText: /^[a-zA-Z0-9\s.,?!]*$/,

    /** Matches a Mongo `ObjectId`: exactly 24 lowercase hexadecimal characters. */
    ObjectId: /^[0-9a-f]{24}$/,

    /** Assertion that the value contains at least one digit. */
    PasswordDigit: /^(?=.*[0-9])/,

    /** Assertion that the value contains at least one lowercase letter. */
    PasswordLowercase: /^(?=.*[a-z])/,

    /** Assertion that the value contains at least one non-alphanumeric character. */
    PasswordSpecial: /^(?=.*[~`!@#$%^&*()_\-+={[}\]|\\:;"'<,>.?])/,

    /** Assertion that the value contains at least one uppercase letter. */
    PasswordUppercase: /^(?=.*[A-Z])/,

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
