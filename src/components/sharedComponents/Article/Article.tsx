import { ReactNode, useState } from 'react'

// Components
import { Screen } from '../Screen/Screen'
import LikeButton from '../../sharedComponents/LikeButton/LikeButton'
import References from '../References/References'
import { getReferenceList } from '../../../articles/references'
import BlogTimeStamp from '../../sharedComponents/BlogTimeStamp/BlogTimeStamp'
import Disclaimer from '../Disclaimer/Disclaimer'

// Other Assets
import { blogArticles } from '../../../articles/articles'

// Styles
import './Articles.scss'
import { useGetLikes } from '@common/queries'
import SuggestedArticles from '../SuggestedArticles/SuggestedArticles'
import { PageSideMenu } from '../PageSideMenu/PageSideMenu'

interface Props {
    pageName: string
    path: string
    title: string
    children: ReactNode
    hasContentNavigator?: boolean
}

const Article = ({ pageName, path, title, children, hasContentNavigator = true }: Props) => {
    const article = blogArticles.find((article) => article.to === path)
    const [articleLiked, setArticleLiked] = useState(false)
    const references = getReferenceList(path)

    const { data: likesData } = useGetLikes(path)
    const likes = likesData?.likes ?? 0

    return (
        <Screen
            title={'Tivadar Debnar | ' + title}
            path={path}
            variant="portfolio"
            pageName={pageName}
            sideMenu={<PageSideMenu />}
            hasContentNavigator={hasContentNavigator}
        >
            <main className="blog-component">
                <article>{children}</article>
                <LikeButton
                    path={path}
                    likes={likes}
                    articleLiked={articleLiked}
                    setArticleLiked={setArticleLiked}
                />
                <References references={references} />
                {article && article.created && (
                    <BlogTimeStamp created={article.created} updated={article.updated} />
                )}
                <Disclaimer />
                <SuggestedArticles articles={article?.suggestedArticles} />
            </main>
        </Screen>
    )
}

export default Article
