/** ANSI colours for the commit scripts, so a failure reads as one at a glance. */
export const ansi = {
    red: (text) => `\x1b[31m${text}\x1b[0m`,
    green: (text) => `\x1b[32m${text}\x1b[0m`,
    cyan: (text) => `\x1b[36m${text}\x1b[0m`,
}
