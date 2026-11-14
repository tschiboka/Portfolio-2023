/** The module whose binding this rule removes. */
export const ReactModule = 'react'

/** Substituted with the export a reference should import instead. */
export const Replacement = '{{name}}'

export const BindingMessage =
    'JSX compiles without a binding under `jsx: react-jsx`, so the export is imported by name.'

export const ReferenceMessage = 'Import `{{name}}` by name — `React` is never bound.'

/** The assertion, as the registrar states it. */
export const Description =
    'No `React` binding — a React export is imported by name, never through the namespace.'
