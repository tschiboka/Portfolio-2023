import { InlineReference as UxInlineReference } from '@common-ux'
import { Reference } from '../References/References'
import './InlineReference.scss'

interface Props {
    reference: Reference
}

export const InlineReference = ({ reference }: Props) => {
    return <UxInlineReference reference={reference} />
}
