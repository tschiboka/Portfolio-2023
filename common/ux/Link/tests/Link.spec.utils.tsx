import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { Test } from '@common/ux/Test'
import { Link } from '../Link'
import type { LinkAsRoute, LinkAsAnchor } from '../Link.types'

export const Set = {
    route: (props: Partial<LinkAsRoute> = {}) => {
        const label = (props.children as string) ?? 'Route link'
        render(
            <MemoryRouter>
                <Link to={props.to ?? '/test'} {...props}>
                    {label}
                </Link>
            </MemoryRouter>,
        )
        return Test.Link(props.ariaLabel ?? label)
    },
    anchor: (props: Partial<Omit<LinkAsAnchor, 'href'>> & { href?: string } = {}) => {
        const label = (props.children as string) ?? 'Anchor link'
        render(
            <Link href={props.href ?? 'https://example.com'} {...props}>
                {label}
            </Link>,
        )
        return Test.Link(props.ariaLabel ?? label)
    },
}
