import { DateTime } from '@common-utils'
import './BlogTimeStamp.scss'
import { Paragraph } from '@common-ux/Typography/Paragraph'

interface Props {
    created: string
    updated?: string
}

const BlogTimeStamp = ({ created, updated }: Props) => {
    const createdDisplay = DateTime.Format.to('DisplayLongDate', created) ?? created
    const updatedDisplay = updated
        ? (DateTime.Format.to('DisplayLongDate', updated) ?? updated)
        : undefined

    if (updated)
        return (
            <div className="BlogTimeStamp">
                <hr />
                <Paragraph className="BlogTimeStamp__text">
                    This article was created on <time dateTime={created}>{createdDisplay}</time> and
                    last updated on <time dateTime={updated}>{updatedDisplay}</time>.
                </Paragraph>
            </div>
        )

    return (
        <div className="BlogTimeStamp">
            <hr />
            <Paragraph className="BlogTimeStamp__text">
                This article was created on <time dateTime={created}>{createdDisplay}</time>.
            </Paragraph>
        </div>
    )
}

export default BlogTimeStamp
