import { render } from '@testing-library/react'
import { Test } from '../../Test'
import { Section } from '../Section'
import type { SectionProps } from '../Region.types'

type Props = Partial<SectionProps>

export const Set = {
    section: (props: Props = {}) => {
        const label = props.ariaLabel ?? props.title ?? 'Test Section'
        render(
            <Section ariaLabel={label} {...props}>
                {props.children ?? <p>Section content</p>}
            </Section>,
        )
        return Test.Section(label)
    },
}
