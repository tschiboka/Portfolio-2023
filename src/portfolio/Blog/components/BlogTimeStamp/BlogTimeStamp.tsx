import { DateTime } from '@common-utils'
import { Paragraph } from '@common-ux/Typography/Paragraph'
import './BlogTimeStamp.scss'

type BlogTimeStampProps = {
    created: string
    updated?: string
}

export const BlogTimeStamp = ({ created, updated }: BlogTimeStampProps) => {
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
