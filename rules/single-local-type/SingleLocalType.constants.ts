/** The suffix a function's own type carries. */
export const PropsSuffix = 'Props'

/** Substituted with the declaration's name. */
export const Name = '{{name}}'

/** Substituted with the name the function beneath asks for. */
export const Expected = '{{expected}}'

/** Substituted with the types file that takes the declaration. */
export const Home = '{{home}}'

export const HomeMessage = 'A file declares no type of its own — `{{name}}` belongs in `{{home}}`.'

export const NameMessage =
    '`{{name}}` must be `{{expected}}` — a type takes the name of the function directly below it.'

export const PlacementMessage = '`{{name}}` must sit directly above the function it types.'

/** The assertion, as the registrar states it. */
export const Description =
    'One local type at most — a function declares only its own props, directly above itself.'
