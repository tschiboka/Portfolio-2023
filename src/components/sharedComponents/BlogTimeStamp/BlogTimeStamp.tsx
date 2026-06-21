import { DateTime } from '@common/utils/DateTime'
import './BlogTimeStamp.scss'

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
                <p className="BlogTimeStamp__text">
                    This article was created on <time dateTime={created}>{createdDisplay}</time> and
                    last updated on <time dateTime={updated}>{updatedDisplay}</time>.
                </p>
            </div>
        )

    return (
        <div className="BlogTimeStamp">
            <hr />
            <p className="BlogTimeStamp__text">
                This article was created on <time dateTime={created}>{createdDisplay}</time>.
            </p>
        </div>
    )
}

export default BlogTimeStamp
