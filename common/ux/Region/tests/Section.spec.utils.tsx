import { render } from '@testing-library/react'
import { Section } from '../Section'
import { Test } from '../../Test'
import type { SectionProps } from '../Region.types'

type Props = Partial<SectionProps>

const Set = {
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

export const SectionTestUtils = { Set }
