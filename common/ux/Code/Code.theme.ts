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

type HljsStyle = Record<string, CSSProperties>

export const tschibokaDark: HljsStyle = {
    hljs: {
        display: 'block',
        overflowX: 'auto',
        padding: '1em',
        background: '#0a0a0a',
        color: '#d8d8d8',
    },

    'hljs-comment': {
        color: '#005151',
        fontStyle: 'italic',
    },
    'hljs-quote': {
        color: '#005151',
        fontStyle: 'italic',
    },

    'hljs-string': {
        color: '#00e676',
        fontStyle: 'italic',
    },
    'hljs-regexp': {
        color: '#00e676',
    },

    'hljs-number': {
        color: '#ff8000',
    },
    'hljs-literal': {
        color: '#ff8000',
        fontStyle: 'italic',
    },

    'hljs-keyword': {
        color: '#e040fb',
        fontStyle: 'italic',
    },

    'hljs-operator': {
        color: '#00cece',
    },

    'hljs-title': {
        color: '#00ffff',
    },
    'hljs-title.function_': {
        color: '#00ffff',
    },
    'hljs-title.class_': {
        color: '#ffcc00',
    },

    'hljs-built_in': {
        color: '#00e676',
    },
    'hljs-type': {
        color: '#ffcc00',
    },

    'hljs-variable': {
        color: '#ff0080',
    },
    'hljs-variable.language_': {
        color: '#ff0080',
    },
    'hljs-variable.constant_': {
        color: '#ff8000',
    },

    'hljs-params': {
        color: '#d8d8d8',
    },

    'hljs-property': {
        color: '#ff8000',
    },
    'hljs-attr': {
        color: '#ff8000',
        fontStyle: 'italic',
    },
    'hljs-attribute': {
        color: '#ff8000',
        fontStyle: 'italic',
    },

    'hljs-tag': {
        color: '#d8d8d8',
    },
    'hljs-name': {
        color: '#ff0080',
    },

    'hljs-selector-class': {
        color: '#00ffff',
    },
    'hljs-selector-id': {
        color: '#00ffff',
    },
    'hljs-selector-tag': {
        color: '#ff0080',
    },
    'hljs-selector-attr': {
        color: '#ffcc00',
    },
    'hljs-selector-pseudo': {
        color: '#e040fb',
    },

    'hljs-subst': {
        color: '#00cece',
    },
    'hljs-template-variable': {
        color: '#00cece',
    },
    'hljs-template-tag': {
        color: '#e040fb',
    },

    'hljs-symbol': {
        color: '#ff8000',
    },
    'hljs-bullet': {
        color: '#00cece',
    },
    'hljs-link': {
        color: '#e040fb',
    },
    'hljs-meta': {
        color: '#e040fb',
    },
    'hljs-punctuation': {
        color: '#00ffff',
    },

    'hljs-section': {
        color: '#ff0080',
    },
    'hljs-strong': {
        fontWeight: 'bold',
    },
    'hljs-emphasis': {
        fontStyle: 'italic',
    },
    'hljs-addition': {
        color: '#00e676',
    },
    'hljs-deletion': {
        color: '#ff0080',
    },

    'hljs-doctag': {
        color: '#ffcc00',
    },
    'hljs-formula': {
        color: '#ff8000',
    },
    'hljs-code': {
        color: '#00cece',
    },
}
