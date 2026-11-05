import { InlineReference as UxInlineReference } from '@common-ux'
import type { Reference } from '../References/References.types'
import './InlineReference.scss'

interface Props {
    reference: Reference
}

export const InlineReference = ({ reference }: Props) => <UxInlineReference reference={reference} />
