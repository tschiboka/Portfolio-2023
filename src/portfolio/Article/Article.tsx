import { ReactNode, useState } from 'react'
import { Screen } from '@shared-components/Screen/Screen'
import LikeButton from './components/LikeButton/LikeButton'
import References from './components/References/References'
import { getReferenceList } from './references'
import BlogTimeStamp from '../Blog/components/BlogTimeStamp/BlogTimeStamp'
import Disclaimer from './components/Disclaimer/Disclaimer'
import { Main } from '@common-ux/Region/Main'
import { blogArticles } from './articles'
import SuggestedArticles from '../Blog/components/SuggestedArticles/SuggestedArticles'
import { PageSideMenu } from '@shared-components/PageSideMenu/PageSideMenu'
import { LikesQueries } from '@shared-queries'
import './Articles.styles.scss'

interface Props {
    pageName: string
    path: string
    title: string
    children: ReactNode
    hasContentNavigator?: boolean
}

export const Article = ({ pageName, path, title, children, hasContentNavigator = true }: Props) => {
    const article = blogArticles.find((article) => article.to === path)
    const [articleLiked, setArticleLiked] = useState(false)
    const references = getReferenceList(path)

    const { data: likesData } = LikesQueries.useGet(path)
    const likes = likesData?.likes ?? 0

    return (
        <Screen
            title={'tschiboka | ' + title}
            path={path}
            variant="portfolio"
            pageName={pageName}
            sideMenu={<PageSideMenu />}
            hasContentNavigator={hasContentNavigator}
        >
            <Main className="blog-component">
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
            </Main>
        </Screen>
    )
}
