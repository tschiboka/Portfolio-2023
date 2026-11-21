import { Regexp } from '../Regexp'

/**
 * Generates a URL-safe slug from text.
 *
 * @example slugify("Hello World!") // "hello-world"
 */
export const slugify = (text: string) =>
    text
        .toLowerCase()
        .trim()
        .replace(Regexp.NonSlugCharacter, '')
        .replace(Regexp.SlugSeparator, '-')
        .replace(Regexp.RepeatedHyphen, '-')
