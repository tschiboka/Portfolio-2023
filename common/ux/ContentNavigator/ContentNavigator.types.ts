import type { ReactNode } from 'react'
import type { AccessibleProps } from '../index.types'

/**
 * Props for the {@link ContentNavigator} component.
 *
 * @property children  - Page content that contains headings to navigate.
 * @property depth     - Maximum heading depth to include (1–6). Defaults to `3` (h1–h3).
 * @property showNavigator - Whether to render the TOC sidebar. When `false`, only the
 *   content wrapper is rendered. Defaults to `true`.
 */
export type ContentNavigatorProps = {
    children: ReactNode
    depth?: number
    showNavigator?: boolean
} & AccessibleProps
