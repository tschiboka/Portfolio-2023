import { LikesQueries } from '@shared-queries'
import { AiFillHeart } from 'react-icons/ai'
import { Paragraph } from '@common-ux'
import './LikeButton.scss'

interface Props {
    path: string
    likes: number
    articleLiked: boolean
    setArticleLiked: (liked: boolean) => void
}

const LikeButton = ({ path, likes, articleLiked, setArticleLiked }: Props) => {
    const { mutate: doPostLike } = LikesQueries.usePost()

    return (
        <div className="LikeButton">
            <hr />
            <Paragraph>Like What You Read? Show Me Your Support!</Paragraph>
            <div
                className="LikeButton__button-wrapper"
                onClick={(event) => {
                    event.preventDefault()
                    event.stopPropagation()
                    if (!articleLiked)
                        doPostLike({ path }, { onSuccess: () => setArticleLiked(true) })
                    return false
                }}
            >
                <AiFillHeart className={'LikeButton__icon ' + (articleLiked ? 'disabled' : '')} />
                <span>{(!articleLiked ? likes : likes + 1) || '-'}</span>
            </div>
        </div>
    )
}

export default LikeButton
