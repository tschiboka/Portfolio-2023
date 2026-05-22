import type { AccessibleProps, InteractiveProps } from '../index.types'

export type TypographyElement =
    | 'p'
    | 'span'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'code'
    | 'strong'
    | 'em'
    | 'blockquote'
    | 'figcaption'

export type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
export type TypographySize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'
export type TypographyWeight = 'regular' | 'medium' | 'semibold' | 'bold'
export type TypographyAlign = 'left' | 'center' | 'right' | 'justify'
export type TypographyTone = 'default' | 'muted' | 'info' | 'success' | 'warning' | 'error'
export type TypographyWrap = 'wrap' | 'nowrap' | 'balance'
export type TypographyFamily = 'sans' | 'serif' | 'mono'
export type TypographyDecoration = 'underline' | 'line-through' | 'none'
export type TypographyTransform = 'uppercase' | 'lowercase' | 'capitalize' | 'none'
export type CaptureElement = 'span' | 'p' | 'figcaption'

// Uses Pick (not Omit) on AccessibleProps to intentionally exclude `style` —
// all visual control flows through the Typography prop API (size, weight, tone, etc.)
// to prevent inline style abuse.
type TypographyBaseProps = Pick<AccessibleProps, 'ariaLabel' | 'className'> &
    InteractiveProps & {
        id?: string
        size?: TypographySize
        weight?: TypographyWeight
        align?: TypographyAlign
        tone?: TypographyTone
        truncate?: boolean
        wrap?: TypographyWrap
        family?: TypographyFamily
        decoration?: TypographyDecoration
        transform?: TypographyTransform
        includeInTableOfContents?: boolean
        children: React.ReactNode
    }

export type TypographyProps = TypographyBaseProps & { as?: TypographyElement }

export type HeadingProps = TypographyBaseProps & { as?: HeadingLevel }
export type ParagraphProps = TypographyBaseProps
export type TextProps = TypographyBaseProps
export type CaptionProps = Omit<TypographyBaseProps, 'size' | 'tone'> & { as?: CaptureElement }
export type CodeTextProps = TypographyBaseProps
export type BlockQuoteProps = TypographyBaseProps
export type OverlineProps = Omit<TypographyBaseProps, 'size'>

export type ListType = 'ul' | 'ol'
export type ListProps = Pick<
    TypographyBaseProps,
    'size' | 'weight' | 'align' | 'tone' | 'family' | 'ariaLabel' | 'className'
> &
    InteractiveProps & {
        as?: ListType
        items: React.ReactNode[]
        children?: React.ReactNode
    }

export interface InlineReferenceSource {
    title: string
    author: string
    source: string
}

export type InlineReferenceProps = Pick<TypographyBaseProps, 'ariaLabel' | 'className'> & {
    reference: InlineReferenceSource
}
