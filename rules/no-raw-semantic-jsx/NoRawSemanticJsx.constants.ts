import type { RuleSeverity } from '../types.js'

/** One raw JSX element, and the `common/ux` components that replace it. */
export type LintRegistration = {
    tag: string
    severity: RuleSeverity
    replacements: string[]
    message: string
}

const row = (
    tag: string,
    severity: RuleSeverity,
    replacements: string[],
    message: string,
): LintRegistration => ({ tag, severity, replacements, message })

export const NoRawSemanticJsxConstants = {
    /** One replacement — the element must not be used raw. */
    Error: [
        row('h1', 'error', ['Heading'], 'Use Heading instead of h1.'),
        row('h2', 'error', ['Heading'], 'Use Heading instead of h2.'),
        row('h3', 'error', ['Heading'], 'Use Heading instead of h3.'),
        row('h4', 'error', ['Heading'], 'Use Heading instead of h4.'),
        row('h5', 'error', ['Heading'], 'Use Heading instead of h5.'),
        row('h6', 'error', ['Heading'], 'Use Heading instead of h6.'),
        row('p', 'error', ['Paragraph'], 'Use Paragraph instead of p.'),
        row('small', 'error', ['Caption'], 'Use Caption instead of small.'),
        row('code', 'error', ['CodeText'], 'Use CodeText instead of code.'),
        row('blockquote', 'error', ['BlockQuote'], 'Use BlockQuote instead of blockquote.'),
        row('ul', 'error', ['List'], 'Use List instead of ul.'),
        row('ol', 'error', ['List'], 'Use List instead of ol.'),
        row('a', 'error', ['Link'], 'Use Link instead of a.'),
        row('table', 'error', ['Table'], 'Use Table instead of table.'),
        row('figure', 'error', ['Figure'], 'Use Figure instead of figure.'),
        row('dialog', 'error', ['Dialog'], 'Use Dialog instead of dialog.'),
        row('form', 'error', ['Form'], 'Use Form instead of form.'),
        row('label', 'error', ['Form.Label'], 'Use Form.Label instead of label.'),
        row('input', 'error', ['Form.Input'], 'Use Form.Input instead of input.'),
        row('textarea', 'error', ['Form.TextArea'], 'Use Form.TextArea instead of textarea.'),
        row('button', 'error', ['Form.Button'], 'Use Form.Button instead of button.'),
        row('fieldset', 'error', ['Form.Fieldset'], 'Use Form.Fieldset instead of fieldset.'),
        row('header', 'error', ['Header'], 'Use Header instead of header.'),
        row('main', 'error', ['Main'], 'Use Main instead of main.'),
        row('aside', 'error', ['Sidebar'], 'Use Sidebar instead of aside.'),
    ],

    /** Several replacements — the element serves many layouts, so the choice is the writer's. */
    Warn: [
        row(
            'section',
            'warn',
            ['Section', 'Region', 'Card'],
            'Use Section, Region or Card instead of section.',
        ),
        row(
            'div',
            'warn',
            ['Box', 'Stack', 'Inline', 'Grid', 'Split', 'Spacer', 'Region', 'Card'],
            'Use a layout component instead of div. Box, Stack, Inline, Grid, Split or Spacer.',
        ),
        row('span', 'error', ['Text'], 'Use Text instead of span.'),
    ],
}
