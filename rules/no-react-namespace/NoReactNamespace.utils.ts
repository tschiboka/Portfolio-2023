import { ReactModule } from './NoReactNamespace.constants.js'
import { isDefined } from '../../common/utils/Predicate/Predicate.js'
import type { Rule } from 'eslint'
import type { NodeLike, SourceLike, SpecifierListLike } from './NoReactNamespace.types.js'
import type { Optional } from '../../common/utils/Generics/Generics.types.js'

/** Answers whether an import names React at all. */
export const isReactModule = (node: Rule.Node): boolean =>
    (node as unknown as SourceLike).source?.value === ReactModule

/**
 * The names an import binds as a default or a namespace.
 *
 * A named import — `import { useState } from 'react'` — binds no namespace, so it answers empty.
 */
export const getBoundNames = (node: Rule.Node): string[] =>
    (node as unknown as SpecifierListLike).specifiers
        .filter(
            ({ type }) => type === 'ImportDefaultSpecifier' || type === 'ImportNamespaceSpecifier',
        )
        .map(({ local }) => local?.name ?? '')
        .filter((name) => name !== '')

/** The node types that carry a name a chain can start at, JSX included. */
const NameNodeTypes = ['Identifier', 'JSXIdentifier']

/** Answers whether a chain starts at a name the file bound from React. */
export const isBoundReference = (root: Optional<NodeLike>, boundNames: Set<string>): boolean =>
    isDefined(root?.name) && NameNodeTypes.includes(root.type) && boundNames.has(root.name)

/** The export a reference should import instead — `useState` for `React.useState`. */
export const getLeafName = (leaf?: NodeLike): string => leaf?.name ?? ''
