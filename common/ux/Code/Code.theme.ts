/**
 * Tschiboka Dark — hljs style object
 * Mapped from the "Tschiboka Dark" VS Code color theme.
 *
 * VS Code TextMate scope → hljs class mapping:
 *   editor.background        → hljs (background)
 *   editor.foreground        → hljs (color)
 *   comment                  → hljs-comment
 *   string                   → hljs-string
 *   constant.numeric         → hljs-number
 *   constant.language        → hljs-literal
 *   keyword.control          → hljs-keyword
 *   storage.type             → hljs-keyword (storage)
 *   entity.name.function     → hljs-title.function_
 *   entity.name.type/class   → hljs-title.class_
 *   entity.name.tag          → hljs-tag / hljs-name
 *   entity.other.attribute   → hljs-attr
 *   variable.other.object    → hljs-variable
 *   variable.language        → hljs-variable.language_
 *   variable.parameter       → hljs-params
 *   support.function         → hljs-built_in
 *   support.type/class       → hljs-type
 *   keyword.operator         → hljs-operator
 *   punctuation.definition.string → hljs-string (punctuation)
 *   markup.heading           → hljs-section
 *   markup.bold              → hljs-strong
 *   markup.deleted           → hljs-deletion
 *   markup.inserted          → hljs-addition
 *   meta.diff                → hljs-meta (diff)
 */

import type { CSSProperties } from 'react'
import type { Dictionary } from '@common-utils'

type HljsStyle = Dictionary<CSSProperties>

export const tschibokaDark: HljsStyle = {
    hljs: {
        display: 'block',
        overflowX: 'auto',
        padding: '1em',
        background: 'var(--black-x)',
        color: 'var(--white-2)',
    },
    comment: {
        color: 'var(--gray-1)',
        fontStyle: 'italic',
    },
    'hljs-comment': {
        color: 'var(--gray-1)',
        fontStyle: 'italic',
    },
    'hljs-quote': {
        color: 'var(--gray-1)',
        fontStyle: 'italic',
    },
    'hljs-string': {
        color: 'var(--success)',
        fontStyle: 'italic',
    },
    'hljs-regexp': {
        color: 'var(--success)',
    },
    'hljs-number': {
        color: 'var(--orange)',
    },
    'hljs-literal': {
        color: 'var(--orange)',
        fontStyle: 'italic',
    },
    'hljs-keyword': {
        color: 'var(--purple)',
        fontStyle: 'italic',
    },
    'hljs-operator': {
        color: 'var(--accent-dark-1)',
    },
    'hljs-title': {
        color: 'var(--accent)',
    },
    'hljs-title.function_': {
        color: 'var(--accent)',
    },
    'hljs-title.class_': {
        color: 'var(--warning)',
    },
    'hljs-built_in': {
        color: 'var(--success)',
    },
    'hljs-type': {
        color: 'var(--warning)',
    },
    'hljs-variable': {
        color: 'var(--error)',
    },
    'hljs-variable.language_': {
        color: 'var(--error)',
    },
    'hljs-variable.constant_': {
        color: 'var(--orange)',
    },
    'hljs-params': {
        color: 'var(--white-2)',
    },
    'hljs-property': {
        color: 'var(--orange)',
    },
    'hljs-attr': {
        color: 'var(--orange)',
        fontStyle: 'italic',
    },
    'hljs-attribute': {
        color: 'var(--orange)',
        fontStyle: 'italic',
    },
    'hljs-tag': {
        color: 'var(--white-2)',
    },
    'hljs-name': {
        color: 'var(--error)',
    },
    'hljs-selector-class': {
        color: 'var(--accent)',
    },
    'hljs-selector-id': {
        color: 'var(--accent)',
    },
    'hljs-selector-tag': {
        color: 'var(--error)',
    },
    'hljs-selector-attr': {
        color: 'var(--warning)',
    },
    'hljs-selector-pseudo': {
        color: 'var(--purple)',
    },
    'hljs-subst': {
        color: 'var(--accent-dark-1)',
    },
    'hljs-template-variable': {
        color: 'var(--accent-dark-1)',
    },
    'hljs-template-tag': {
        color: 'var(--purple)',
    },
    'hljs-symbol': {
        color: 'var(--orange)',
    },
    'hljs-bullet': {
        color: 'var(--accent-dark-1)',
    },
    'hljs-link': {
        color: 'var(--purple)',
    },
    'hljs-meta': {
        color: 'var(--purple)',
    },
    'hljs-punctuation': {
        color: 'var(--accent)',
    },
    'hljs-section': {
        color: 'var(--error)',
    },
    'hljs-strong': {
        fontWeight: 'bold',
    },
    'hljs-emphasis': {
        fontStyle: 'italic',
    },
    'hljs-addition': {
        color: 'var(--success)',
    },
    'hljs-deletion': {
        color: 'var(--error)',
    },
    'hljs-doctag': {
        color: 'var(--warning)',
    },
    'hljs-formula': {
        color: 'var(--orange)',
    },
    'hljs-code': {
        color: 'var(--accent-dark-1)',
    },
}
