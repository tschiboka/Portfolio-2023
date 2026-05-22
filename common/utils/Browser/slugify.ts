/**
 * Generates a URL-safe slug from text.
 *
 * @example slugify("Hello World!") // "hello-world"
 */
export const slugify = (text: string) => {
    return text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_]+/g, '-')
        .replace(/-+/g, '-')
}
