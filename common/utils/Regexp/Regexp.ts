/** Namespace of commonly-used regular expressions. */
export const Regexp = {
    /** Matches a name-like value of letters, digits and whitespace only — no punctuation. */
    Alphanumeric: /^[a-zA-Z0-9\s]*$/,
    /** Matches a path inside the blog section. */
    BlogPath: /^\/blog\//,
    /** Matches a full commit SHA: exactly 40 hexadecimal characters. */
    CommitSha: /^[a-f0-9]{40}$/i,
    /** Matches a message from the contact form, punctuation included. */
    ContactMessage: /^[a-zA-Z0-9,.!?()&£$*\\[\]:;@'"\-\s]*$/,
    /** Matches a value of digits and nothing else. */
    Digits: /^\d+$/,
    /** Matches a value that opens with an `http` or `https` scheme. */
    ExternalUrl: /^https?:\/\//,
    /** Matches one leading slash at the start of a value. */
    LeadingSlash: /^\//,
    /** Matches a single letter, in either case. */
    Letter: /[a-z]/i,
    /** Matches a message-like value of letters, digits, whitespace and basic punctuation. */
    MessageText: /^[a-zA-Z0-9\s.,?!]*$/,
    /** Matches a name-like value of letters, space, apostrophe and hyphen only — no digits. */
    NameText: /^[a-z '-]+$/i,
    /** Matches a character that is not a digit. */
    NonDigit: /[^\d]/g,
    /** Matches a character a slug drops — anything but a word character, whitespace or hyphen. */
    NonSlugCharacter: /[^\w\s-]/g,
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
    /** Matches a run of hyphens a slug reduces to one. */
    RepeatedHyphen: /-+/g,
    /** Matches a single forward slash, wherever it sits in a value. */
    Slash: /\//g,
    /** Matches the run a slug turns into one hyphen — whitespace and underscores together. */
    SlugSeparator: /[\s_]+/g,
    /** Matches a slash on either edge of a value — leading or trailing, whichever is there. */
    SurroundingSlash: /^\/|\/$/g,
    /** Matches one trailing slash at the end of a value. */
    TrailingSlash: /\/$/,
    /** Matches a single whitespace character, wherever it sits in a value. */
    Whitespace: /\s/g,
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
