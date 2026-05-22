import { Region } from './Region'
import type { SectionProps } from './Region.types'

export const Section = ({ expandable = false, ...rest }: SectionProps) => (
    <Region variant="section" collapsible={expandable} {...rest} />
)
