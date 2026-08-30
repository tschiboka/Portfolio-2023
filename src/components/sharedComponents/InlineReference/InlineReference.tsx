import { Reference } from '../References/References'
import { InlineReference as UxInlineReference } from '@ux'
import './InlineReference.scss'

interface Props {
    reference: Reference
}

const InlineReference = ({ reference }: Props) => {
    return <UxInlineReference reference={reference} />
}

export default InlineReference
