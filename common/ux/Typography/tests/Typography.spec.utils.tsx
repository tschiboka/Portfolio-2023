import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { Test } from '@common/ux/Test'
import { Typography } from '../Typography'
import { Heading } from '../Heading'
import { Paragraph } from '../Paragraph'
import { Text } from '../Text'
import { Caption } from '../Caption'
import { CodeText } from '../CodeText'
import { BlockQuote } from '../BlockQuote'
import { Overline } from '../Overline'
import { List } from '../List'
import { InlineReference } from '../InlineReference'
import type {
    TypographyProps,
    HeadingProps,
    ParagraphProps,
    TextProps,
    CaptionProps,
    CodeTextProps,
    BlockQuoteProps,
    OverlineProps,
    ListProps,
    InlineReferenceProps,
} from '../Typography.types'

export const Set = {
    typography: (props: Partial<TypographyProps> = {}) => {
        const label = props.ariaLabel ?? 'Test typography'
        const children = props.children ?? 'Hello world'
        render(
            <Typography ariaLabel={label} {...props}>
                {children}
            </Typography>,
        )
        return Test.Typography.byLabel(label)
    },
    heading: (props: Partial<HeadingProps> = {}) => {
        const children = (props.children as string) ?? 'Test heading'
        render(<Heading {...props}>{children}</Heading>)
        return Test.Heading(
            children,
            props.as ? (Number(props.as[1]) as 1 | 2 | 3 | 4 | 5 | 6) : undefined,
        )
    },
    paragraph: (props: Partial<ParagraphProps> = {}) => {
        const label = props.ariaLabel ?? 'Test paragraph'
        const children = props.children ?? 'Paragraph text'
        render(
            <Paragraph ariaLabel={label} {...props}>
                {children}
            </Paragraph>,
        )
        return Test.Typography.byLabel(label)
    },
    text: (props: Partial<TextProps> = {}) => {
        const label = props.ariaLabel ?? 'Test text'
        const children = props.children ?? 'Inline text'
        render(
            <Text ariaLabel={label} {...props}>
                {children}
            </Text>,
        )
        return Test.Typography.byLabel(label)
    },
    caption: (props: Partial<CaptionProps> = {}) => {
        const label = props.ariaLabel ?? 'Test caption'
        const children = props.children ?? 'Caption text'
        render(
            <Caption ariaLabel={label} {...props}>
                {children}
            </Caption>,
        )
        return Test.Typography.byLabel(label)
    },
    codeText: (props: Partial<CodeTextProps> = {}) => {
        const label = props.ariaLabel ?? 'Test code'
        const children = props.children ?? 'const x = 1'
        render(
            <CodeText ariaLabel={label} {...props}>
                {children}
            </CodeText>,
        )
        return Test.Typography.byLabel(label)
    },
    blockQuote: (props: Partial<BlockQuoteProps> = {}) => {
        const label = props.ariaLabel ?? 'Test blockquote'
        const children = props.children ?? 'Quoted text'
        render(
            <BlockQuote ariaLabel={label} {...props}>
                {children}
            </BlockQuote>,
        )
        return Test.Typography.byLabel(label)
    },
    overline: (props: Partial<OverlineProps> = {}) => {
        const label = props.ariaLabel ?? 'Test overline'
        const children = props.children ?? 'LABEL'
        render(
            <Overline ariaLabel={label} {...props}>
                {children}
            </Overline>,
        )
        return Test.Typography.byLabel(label)
    },
    list: (props: Partial<ListProps> = {}) => {
        const label = props.ariaLabel ?? 'Test list'
        const items = props.items ?? ['Item 1', 'Item 2', 'Item 3']
        render(<List ariaLabel={label} items={items} {...props} />)
        return Test.Typography.byLabel(label)
    },
    inlineReference: (props: Partial<InlineReferenceProps> = {}) => {
        const reference = props.reference ?? {
            title: 'Test Title',
            author: 'Author',
            source: 'https://example.com',
        }
        const label = props.ariaLabel ?? 'Test inline-ref'
        render(
            <MemoryRouter>
                <InlineReference ariaLabel={label} reference={reference} {...props} />
            </MemoryRouter>,
        )
        return Test.Link(label)
    },
}
