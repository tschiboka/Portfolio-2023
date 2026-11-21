/* eslint-disable standards/matching-spec -- TODO [0011] check the convention */
import { InlineReference as UxInlineReference } from '@common-ux'
import type { Reference } from '../References/References.types'
import './InlineReference.scss'

type InlineReferenceProps = {
    reference: Reference
}

export const InlineReference = ({ reference }: InlineReferenceProps) => (
    <UxInlineReference reference={reference} />
)
